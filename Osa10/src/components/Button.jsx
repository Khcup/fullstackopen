import { StyleSheet, Pressable } from "react-native";

import Text from "./Text";
import theme from "../theme";

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  dangerButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
  },
});

const Button = ({ value, onSubmit, danger }) => {
  return (
    <Pressable
      style={danger ? buttonStyles.dangerButton : buttonStyles.button}
      onPress={onSubmit}
    >
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {value}
      </Text>
    </Pressable>
  );
};

export default Button;
