import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  updateUserAttribute,
  type UpdateUserAttributeOutput
} from 'aws-amplify/auth';
import { updateUserAttributes, type UpdateUserAttributesOutput } from "aws-amplify/auth";


async function handleUpdateUserAttribute(attributeKey: string, value: string) {
  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey,
        value
      }
    });
    handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case 'CONFIRM_ATTRIBUTE_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
      );
      // Collect the confirmation code from the user and pass to confirmUserAttribute.
      break;
    case 'DONE':
      console.log(`attribute was successfully updated.`);
      break;
  }
}

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  console.log('user', user);

  const [datasets, setDatasets] = useState<Array<Schema["Dataset"]["type"]>>(
    []
  );
  const [organizations, setOrganizations] = useState<Array<Schema["Organization"]["type"]>>(
    []
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sub = client.models.Dataset.observeQuery({
      filter: {},
      selectionSet: ["id", "name", "description", "createdBy.*", "organization.*", "createdAt"],
    }).subscribe({
      next: (data) => setDatasets([...data.items]),
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = client.models.Organization.observeQuery({
      filter: {},
      selectionSet: ["id", "name", "createdAt"],
    }).subscribe({
      next: (data) => setOrganizations([...data.items]),
    });
    return () => sub.unsubscribe();
  }, []);

  async function updateUserOrganization(organization: Schema["Organization"]["type"]) {
    // handleUpdateUserAttribute('organizationId', organization.id);

    await updateUserAttributes({
      userAttributes: {
        organizationId: organization.id,
      },
    });
  }

  async function createDataset() {
    const dataset = await client.models.Dataset.create({
      name: window.prompt("Dataset content") || "test",
      createdAt: new Date().toISOString(),
      createdById: user?.userId,
    });
    console.log("created dataset", dataset);
    if (dataset.errors) {
      setError(dataset.errors?.[0].message);
    }
  }

  async function createOrganization() {
    const organization = await client.models.Organization.create({
      name: window.prompt("Organization name") || "test",
      email: window.prompt("Organization email") || "test@test.com",
      createdAt: new Date().toISOString(),
    });
    console.log("created organization", organization);
  }

  async function deleteDataset(dataset: Schema["Dataset"]["type"]) {
    const deleted = await client.models.Dataset.delete({ id: dataset.id });
    console.log("deleted dataset", deleted);
    if (deleted.errors) {
      console.error("deleted dataset", deleted.errors?.[0].message);
    }
  }

  console.log('createdBy',datasets[0]?.createdBy);
  console.log('organizations', organizations[0]);

  return (
    <main>
      <h1>Samurai Data</h1>

      <div>{error}</div>

      <h2>{user?.signInDetails?.loginId}'s todos in {user?.organization?.name}</h2>

      <button onClick={createDataset}>+ new</button>
      <button onClick={createOrganization}>+ new organization</button>

      <h2>Datasets</h2>
      <ul>
        {datasets.map((dataset) => (
          <li onClick={() => deleteDataset(dataset)} key={dataset.id}>
            {dataset.name}
            <br />
            <b>{dataset.description}</b>
            <br />
            {new Date(dataset.createdAt).toLocaleString('en-US', {
              dateStyle: 'short',
              timeStyle: 'short'
            })}
            <br />
            {dataset.createdBy?.username}
            {dataset.createdBy?.signInDetails?.loginId}
          </li>
        ))}
      </ul>

      <h2>Organizations</h2>
      <ul>
        {organizations.map((organization) => (
          <li key={organization.id} onClick={() => updateUserOrganization(organization)} className="cursor-pointer">
            {organization.name}
            <br />
            {new Date(organization.createdAt).toLocaleString('en-US', {
              dateStyle: 'short',
              timeStyle: 'short'
            })}
          </li>
        ))}
      </ul>
      <div>
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
