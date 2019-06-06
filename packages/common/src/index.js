const yup = require("yup");

const createBookSchema = yup.object().shape({
  title: yup
    .string()
    .min(5)
    .max(30)
    .required(),
  pages: yup
    .number()
    .required()
    .positive()
    .integer(),
  author: yup.string().nullable()
});

module.exports = {
  createBookSchema
};
