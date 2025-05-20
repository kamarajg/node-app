import { Device } from './models.js';

export const resolvers = {
  Device: {
    __resolveReference(ref) {
      return Device.findByPk(ref.id);
    }
  },

  Query: {
    devices: () => Device.findAll()
  },

  Account: {
    devices: (account) => Device.findAll({ where: { accountId: account.id } })
  },

  Mutation: {
    createDevice: (_, { name, accountId }) =>
      Device.create({ name, accountId })
  }
};
