import { useQuery } from "@apollo/client";
import { GET_LOGGEDIN_USER } from "../graphql/queries";

const useAuthUser = (includeReviews) => {
  return useQuery(GET_LOGGEDIN_USER, {
    variables: {
      includeReviews: includeReviews,
    },
  });
};

export default useAuthUser;
