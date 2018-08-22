const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = fs.readFileSync('src/serverSrc/typedefs.graphql', 'utf8');

module.exports = makeExecutableSchema({ typeDefs, resolvers });
