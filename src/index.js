require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutations')
const directives = require('./Auth/Permissions')
const jwt = require('express-jwt')
const fetch = require('node-fetch')

const resolvers = {
  Query,
  Mutation,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  directives,
  resolverValidationOptions: {
    requireResolversForResolveType: false 
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/notification/dev',
      debug: true,
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))