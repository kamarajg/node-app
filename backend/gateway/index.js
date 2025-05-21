import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'account', url: 'http://account-service:4001/graphql' },
    { name: 'device', url: 'http://device-service:4002/graphql' },
  ],
  __exposeQueryPlanExperimental: false,
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`APIs ${url}`);
});
