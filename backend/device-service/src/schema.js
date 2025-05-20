import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    devices: [Device]
  }

  type Device @key(fields: "id") {
    id: ID!
    name: String!
    accountId: ID!
  }

  extend type Account @key(fields: "id") {
    id: ID! @external
    devices: [Device]
  }

  type Mutation {
    createDevice(name: String!, accountId: ID!): Device
  }
`;
