import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Organization: a.model({
    organizationId: a.id().required(),
    name: a.string().required(),
    email: a.email(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime(),
    members: a.hasMany('User', 'organizationId'),
    datasets: a.hasMany('Dataset', 'organizationId'),
  }),

  User: a.model({
    userId: a.id().required(),
    organizationId: a.id(),
    organization: a.belongsTo('Organization', 'organizationId'),
    username: a.string().required(),
    email: a.email().required(),
    passwordHash: a.string().required(),
    lastLoginAt: a.datetime(),
    role: a.string(),
    createdAt: a.datetime().required(),
    datasets: a.hasMany('Dataset', 'createdById'),
    annotations: a.hasMany('Annotation', 'createdById')
  }),

  Dataset: a.model({
    id: a.id().required(),
    organizationId: a.id(),
    organization: a.belongsTo('Organization', 'organizationId'),
    createdById: a.id().required(),
    createdBy: a.belongsTo('User', 'createdById'),
    name: a.string().required(),
    description: a.string(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime(),
    version: a.string(),
    tags: a.string().array(),
    license: a.string(),
    status: a.string(),
    huggingfaceRepo: a.url(),
    huggingfaceDatasetName: a.string(),
    filesize: a.integer(),
    format: a.string(),
    modalities: a.string().array(),
    entries: a.hasMany('DataEntry', 'datasetId')
  }).authorization(allow => [allow.owner()]),

  DataEntry: a.model({
    entryId: a.id().required(),
    datasetId: a.id().required(),
    dataset: a.belongsTo('Dataset', 'datasetId'),
    content: a.string().required(),
    // annotations: a.json(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime(),
    deletedAt: a.datetime(),
    version: a.string(),
    tags: a.string().array(),
    annotations: a.hasMany('Annotation', 'entryId')
  }).authorization(allow => [allow.owner()]),

  Annotation: a.model({
    annotationId: a.id().required(),
    entryId: a.id().required(),
    entry: a.belongsTo('DataEntry', 'entryId'),
    type: a.string().required(),
    value: a.string(),
    createdById: a.id().required(),
    createdBy: a.belongsTo('User', 'createdById'),
    createdAt: a.datetime().required()
  }).authorization(allow => [allow.owner()])
}).authorization((allow) => allow.publicApiKey());

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
