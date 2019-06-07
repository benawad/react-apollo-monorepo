const { ApolloServer, gql } = require("apollo-server");
const { createBookSchema } = require("@bob/common");

const typeDefs = gql`
  type FieldError {
    name: String
    message: String
  }

  input CreateBookInput {
    title: String
    pages: Int
    author: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    createBook(book: CreateBookInput): [FieldError]
  }
`;

const resolvers = {
  Query: {
    hello: () => "hey"
  },
  Mutation: {
    createBook: async (_, { book }) => {
      try {
        await createBookSchema.validate(book, { abortEarly: false });
      } catch (err) {
        console.log(err);
        const errors = [];
        err.inner.forEach(e => {
          errors.push({
            name: e.path,
            message: e.message
          });
        });
        return errors;
      }

      return [];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
