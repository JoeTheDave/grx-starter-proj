const database = require('../data/database');

const resolvers = {
  Query: {
    async me(_, args, context) {
      if (!context.authenticated) {
        return null;
      }
      const user = await database.getUserById(context.user.id);
      return user;
    },
    async allUsers(_, args, context) {
      if (!context.authenticated) {
        return [];
      }
      const users = await database.getAllUsers();
      return users;
    },
    async customers(_, args, context) {
      if (!context.authenticated) {
        return [];
      }
      const customers = await database.getAllCustomers();
      return customers;
    },
  },
};

module.exports = resolvers;
