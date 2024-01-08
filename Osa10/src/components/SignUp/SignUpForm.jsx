import { StyleSheet, View } from "react-native";
import FormikTextInput from "../FormikTextInput";

import Button from "../Button";
import theme from "../../theme";

const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: "flex",
    felxDirection: "column",
    padding: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={loginStyles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Button value="Sign Up" onSubmit={onSubmit} />
    </View>
  );
};

export default SignInForm;
