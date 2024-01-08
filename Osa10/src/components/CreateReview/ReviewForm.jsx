import { StyleSheet, View } from "react-native";
import FormikTextInput from "../FormikTextInput";

import Button from "../Button";
import theme from "../../theme";

const reviewFormStyles = StyleSheet.create({
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
  multiField: {
    backgroundColor: theme.colors.white,
    marginBottom: 16,
    paddingTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    textAlignVertical: "top",
    borderColor: theme.colors.placeholder,
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={reviewFormStyles.container}>
      <FormikTextInput
        name="repositoryOwnerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput
        name="review"
        placeholder="Review"
        multiline={true}
        style={reviewFormStyles.multiField}
      />

      <Button value="Create a review" onSubmit={onSubmit} />
    </View>
  );
};

export default ReviewForm;
