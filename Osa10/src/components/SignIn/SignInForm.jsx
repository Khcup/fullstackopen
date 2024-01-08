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
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput
        name="password"
        placeholder="password"
        secureTextEntry={true}
      />
      <Button value="Sign In" onSubmit={onSubmit} />
    </View>
  );
};

export default SignInForm;
