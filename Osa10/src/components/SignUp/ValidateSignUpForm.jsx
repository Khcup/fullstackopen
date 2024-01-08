import { Formik } from "formik";

import * as yup from "yup";

import SignUpForm from "./SignUpForm";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username must be at least 1 charqacter long.")
    .max(30, "Username must be maximum 30 characters long."),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 charqacter long.")
    .max(50, "Password must be maximum 50 characters long."),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation doesn't match the password."
    )
    .required("Password confirmation is required"),
});

const ValidateSignUpForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ValidateSignUpForm;
