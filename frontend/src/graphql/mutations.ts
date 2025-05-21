import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!) {
    createAccount(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const CREATE_DEVICE = gql`
  mutation CreateDevice($name: String!, $accountId: ID!) {
    createDevice(name: $name, accountId: $accountId) {
      id
      name
    }
  }
`;
