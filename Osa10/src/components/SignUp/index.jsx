import { useNavigate } from "react-router-native";
import ValidateSignUpForm from "./ValidateSignUpForm";
import { useSignUp } from "../../hooks/useSignUp";

const SignIn = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ValidateSignUpForm onSubmit={onSubmit} />;
};

export default SignIn;
