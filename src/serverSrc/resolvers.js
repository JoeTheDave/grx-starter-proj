const database = require('./database');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config(); // TODO: Can this just be imported once in index.js

const resolvers = {
  Query: {
    async me(_, args, { userToken }) {
      if (!userToken) {
        throw new Error('Not authenticated!');
      }
      const user = await database.getUserById(userToken.id);
      return user;
    },
    async allUsers(_, args, { userToken }) {
      if (!userToken) {
        throw new Error('Not authenticated!');
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

  Mutation: {
    async signup(_, { email, password }) {
      if (!email || !password) {
        throw new Error('Invalid Registration');
      }
      const user = await database.createUser({ email, password });
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION },
      );
    },

    async login(_, { email, password }) {
      const user = await database.validateUser(email, password);
      if (!user) {
        throw new Error('Invalid Login');
      }
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION },
      );
    },
  },
};

module.exports = resolvers;
