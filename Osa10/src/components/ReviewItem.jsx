import { StyleSheet, View, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

import Text from "./Text";
import Button from "./Button";
import useDeleteReview from "../hooks/useDeleteReview";

import theme from "../theme";

const reviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    padding: 16,
  },
  subContainer: {
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignSelf: "flex-start",
    marginLeft: 16,
    flex: 1,
  },
  button: {
    flex: 1,
    marginTop: 16,
  },
  separator: {
    marginRight: 16,
  },
});

const ReviewItem = ({ review }) => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();
  if (!review) {
    return null;
  }

  const date = format(new Date(review.createdAt), "dd.MM.yyyy");

  const handleSubmit = () => {
    return navigate(`/repository/${review.repository.id}`);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cencel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteReview(id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.subContainer}>
        <View style={reviewStyles.rating}>
          <Text fontSize="subheading" fontWeight="bold" color="primary">
            {review.rating}
          </Text>
        </View>
        <View style={reviewStyles.text}>
          <Text fontSize="subheading" fontWeight="bold">
            {review.user ? review.user.username : review.repository.fullName}
          </Text>
          <Text
            color="textSecondary"
            style={{ paddingTop: 3, paddingBottom: 3 }}
          >
            {date}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={reviewStyles.subContainer}>
        {!review.user && (
          <>
            <View style={reviewStyles.button}>
              <Button value="View repository" onSubmit={handleSubmit} />
            </View>
            <View style={reviewStyles.separator}></View>
            <View style={reviewStyles.button}>
              <Button
                value="Delete review"
                onSubmit={() => handleDelete(review.id)}
                danger
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
