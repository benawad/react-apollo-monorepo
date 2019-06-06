import React from "react";
import { Field, Form, Formik } from "formik";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { createBookSchema } from "@bob/common";
import { Input } from "./Input";

function App() {
  return (
    <Mutation
      mutation={gql`
        mutation CreateBook($book: CreateBookInput!) {
          createBook(book: $book)
        }
      `}
    >
      {createBook => (
        <Formik
          validationSchema={createBookSchema}
          initialValues={{ title: "", pages: 2, author: "" }}
          onSubmit={values => {
            createBook({
              variables: {
                book: values
              }
            });
          }}
        >
          {() => (
            <Form>
              <Field name="title" component={Input} />
              <Field name="pages" component={Input} />
              <Field name="author" component={Input} />
              <button type="submit">submit</button>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  );
}

export default App;
