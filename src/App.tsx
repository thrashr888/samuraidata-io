import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

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

  useEffect(() => {
    const sub = client.models.Dataset.observeQuery({
      filter: {},
      selectionSet: ["id", "name", "description", "createdBy.*", "organization.*", "createdAt"],
    }).subscribe({
      next: (data) => setDatasets([...data.items]),
    });
    return () => sub.unsubscribe();
  }, []);

  async function createDataset() {
    const dataset = await client.models.Dataset.create({
      name: window.prompt("Dataset content") || "test",
      createdAt: new Date().toISOString(),
      createdById: user?.userId,
    });
    console.log("created dataset", dataset);
    if (dataset.errors) {
      console.error("created dataset", dataset.errors?.[0].message);
    }
  }

  async function deleteDataset(dataset: Schema["Dataset"]["type"]) {
    const deleted = await client.models.Dataset.delete({ id: dataset.id });
    console.log("deleted dataset", deleted);
    if (deleted.errors) {
      console.error("deleted dataset", deleted.errors?.[0].message);
    }
  }

  console.log('createdBy',datasets[0]?.createdBy);

  return (
    <main>
      <h1>Samurai Data</h1>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createDataset}>+ new</button>
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
          <li key={organization.id}>
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
