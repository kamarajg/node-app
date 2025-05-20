import { Account } from './models.js';

export const resolvers = {
  Account: {
    __resolveReference(ref) {
      return Account.findByPk(ref.id);
    }
  },
  Query: {
    accounts: () => Account.findAll()
  },
  Mutation: {
    createAccount: (_, { name, email }) => Account.create({ name, email })
  }
};
