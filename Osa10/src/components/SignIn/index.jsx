import { useNavigate } from "react-router-native";
import Login from "./Login";
import { useSignIn } from "../../hooks/useSignIn";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <Login onSubmit={onSubmit} />;
};

export default SignIn;
