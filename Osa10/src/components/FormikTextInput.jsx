import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginTop: -14,
    marginBottom: 16,
  },
  field: {
    backgroundColor: theme.colors.white,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    // borderColor: theme.colors.placeholder,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[
          styles.field,
          {
            borderColor: showError
              ? theme.colors.error
              : theme.colors.placeholder,
          },
        ]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
