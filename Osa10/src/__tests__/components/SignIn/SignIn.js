/* eslint-disable jest/expect-expect */
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import Login from "../../../components/SignIn/Login";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <Login onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByPlaceholderText("username"), "admin");
      fireEvent.changeText(getByPlaceholderText("password"), "password");
      fireEvent.press(getByText("Sign In"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "admin",
          password: "password",
        });
      });
    });
  });
});
