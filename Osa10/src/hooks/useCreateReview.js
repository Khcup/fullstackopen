import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { GET_LOGGEDIN_USER } from "../graphql/queries";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    repositoryOwnerName,
    repositoryName,
    rating,
    review,
  }) => {
    return await mutate({
      variables: {
        repositoryOwnerName,
        repositoryName,
        rating,
        review,
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

  return [createReview, result];
};
