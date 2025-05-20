import gql from 'graphql-tag';

export const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    accounts: [Account]
  }

  type Mutation {
    createAccount(name: String!, email: String!): Account
  }
`;
