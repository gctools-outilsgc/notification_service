require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
  Query,
  Mutation,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false 
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/notifications/dev',
      debug: true,
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))