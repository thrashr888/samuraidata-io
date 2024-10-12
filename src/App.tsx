import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [datasets, setDatasets] = useState<Array<Schema["Dataset"]["type"]>>(
    []
  );

  useEffect(() => {
    client.models.Dataset.observeQuery().subscribe({
      next: (data) => setDatasets([...data.items]),
    });
  }, []);

  async function createDataset() {
    client.models.Dataset.create({
      id: "123",
      name: window.prompt("Dataset content") || "test",
      createdBy: (await client.models.User.get({ id: "123" })).data!,
    });
  }

  return (
    <main>
      <h1>Samurai Data</h1>
      <button onClick={createDataset}>+ new</button>
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>{dataset.name}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new dataset.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
