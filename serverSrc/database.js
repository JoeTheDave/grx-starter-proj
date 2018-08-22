import uuid from 'uuid/v1';
import bcrypt from 'bcrypt';
import { flatten } from 'lodash';

const users = [];

const stripPasswords = (data) => {
  const users = flatten([data]).map((user) => {
    delete user.password;
    return user;
  });
  return users.length > 1 ? users : users[0];
};

const createUser = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: uuid(),
    email,
    password: hash,
  };
  users.push(user);
  return Promise.resolve(stripPasswords(user));
};

const getUserById = async (id) => users.find((user) => user.id === id);

const getUserByEmail = async (email) =>
  users.find((user) => user.email === email);

const getAllUsers = async () => users;

const validateUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
};

const customers = [
  {
    id: 1,
    firstName: 'Neall',
    lastName: 'Danneil',
    email: 'ndanneil0@gmpg.org',
    phone: '395-195-8350',
  },
  {
    id: 2,
    firstName: 'Tobi',
    lastName: 'Atley',
    email: 'tatley1@pcworld.com',
    phone: '957-258-5906',
  },
  {
    id: 3,
    firstName: 'Sherill',
    lastName: 'Bohan',
    email: 'sbohan2@mac.com',
    phone: '176-172-8431',
  },
  {
    id: 4,
    firstName: 'Zabrina',
    lastName: 'Luker',
    email: 'zluker3@w3.org',
    phone: '985-224-3827',
  },
  {
    id: 5,
    firstName: 'Jerri',
    lastName: 'Curr',
    email: 'jcurr4@usnews.com',
    phone: '910-388-9754',
  },
  {
    id: 6,
    firstName: 'Jilleen',
    lastName: 'De Domenici',
    email: 'jdedomenici5@furl.net',
    phone: '296-145-4416',
  },
  {
    id: 7,
    firstName: 'Fons',
    lastName: 'Harmer',
    email: 'fharmer6@scribd.com',
    phone: '300-226-0180',
  },
  {
    id: 8,
    firstName: 'Robin',
    lastName: 'Langland',
    email: 'rlangland7@godaddy.com',
    phone: '188-628-9180',
  },
  {
    id: 9,
    firstName: 'Ola',
    lastName: 'Agus',
    email: 'oagus8@salon.com',
    phone: '669-596-3850',
  },
  {
    id: 10,
    firstName: 'Janka',
    lastName: 'Pietron',
    email: 'jpietron9@tuttocitta.it',
    phone: '568-875-6796',
  },
];

const getAllCustomers = async () => customers;

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  validateUser,
  getAllCustomers,
};
