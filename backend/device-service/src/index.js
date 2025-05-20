import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { sequelize } from './models.js';

const app = express();

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

await server.start();

app.use('/graphql', express.json(), expressMiddleware(server));

await sequelize.sync();

app.listen({ port: 4002 }, () => {
  console.log(`🚀 Device service ready at http://localhost:4002/graphql`);
});
