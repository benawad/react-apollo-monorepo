const { ApolloServer, gql } = require("apollo-server");
const { createBookSchema } = require("@bob/common");

const typeDefs = gql`
  input CreateBookInput {
    title: String
    pages: Int
    author: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    createBook(book: CreateBookInput): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: () => "hey"
  },
  Mutation: {
    createBook: async (_, { book }) => {
      try {
        await createBookSchema.validate(book);
      } catch (err) {
        console.log(err);
        return false;
      }

      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
