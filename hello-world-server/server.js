const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const port = process.env.port || 9000;
const app = express();

app.use(bodyParser.json(), cors());

app.listen(port, () => console.log(`Server is up and running at ${port}`));

// adding graphQL schema
const typeDefinition = `
type Query {
     greeting: String
}`;

// adding resolver
const resolverObject = {
  Query: {
    greeting: () => "Hello GraphQL !!! "
  }
};

// bind the schema and resolver using  makeExecutableSchema
const { makeExecutableSchema } = require("graphql-tools");
const schema = makeExecutableSchema({
  typeDefs: typeDefinition,
  resolvers: resolverObject
});

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

// create routes for graphql and graphiql
app.use("/graphql", graphqlExpress({ schema })); // React can use this endpoint to query data
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // GraphiQL browser client will use this to test the API
