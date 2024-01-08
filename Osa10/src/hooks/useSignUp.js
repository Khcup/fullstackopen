import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";

export const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    return data;
  };

  return [signUp, result];
};
