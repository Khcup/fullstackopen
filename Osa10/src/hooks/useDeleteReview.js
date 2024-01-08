import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_LOGGEDIN_USER } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    return await mutate({
      variables: {
        deleteReviewId,
      },
      refetchQueries: [
        {
          query: GET_LOGGEDIN_USER,
          variables: {
            includeReviews: true,
          },
        },
      ],
    });
  };

  return [deleteReview, result];
};

export default useDeleteReview;
