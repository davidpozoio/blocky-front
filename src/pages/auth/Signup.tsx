import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";
import { signup } from "../../services/authService";
import useAutomaticLogin from "../../hooks/useAutomaticLogin";
import { ErrorAuthResponse, LoginDto } from "../../models/authModel";
import { useState } from "react";
import { ErrorMessage } from "../../models/formModel";
import ERROR_CODES from "../../consts/errorCode";
import useHttpError from "../../hooks/useHttpError";
import { useQueryClient } from "react-query";
import BlockLink from "../../components/BlockLink";
import { useAppStore } from "../../store/store";

const Signup = () => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const { errorMessage, setError } = useHttpError();
  const queryClient = useQueryClient();
  const setBlockLinks = useAppStore((state) => state.setBlockLinks);

  const { mutate, isLoading } = useAutomaticLogin<LoginDto>({
    fetchFn: (data) => signup(data),
    redirectWhenSuccess: ROUTES.NOTES.ME,
    onError: (error) => {
      const response = error as {
        code: string;
        response: { data: ErrorAuthResponse; status: number };
      };
      setError(response);
      const codeError = response.response.data.code;
      if (codeError === ERROR_CODES.E2002.CODE) {
        setErrors((prev) => [
          ...prev,
          {
            inputName: "username",
            message: "the username has already been taken",
          },
        ]);
      }
    },
    onSettled: () => {
      setBlockLinks(false);
      queryClient.clear();
    },
  });

  return (
    <>
      <h2>Sign up</h2>
      <Form
        fields={{ username: "", password: "", confirmPassword: "" }}
        onSubmit={(data) => {
          setBlockLinks(true);
          mutate({ username: data["username"], password: data["password"] });
        }}
        errors={errors}
      >
        <Input
          label="Username:"
          placeholder="put an username"
          name="username"
          errors={{
            required: { value: true, message: "username is required*" },
          }}
        />

        <Input
          label="Password: "
          name="password"
          placeholder="********"
          type="password"
          errors={{
            required: { value: true, message: "password is required*" },
            minLength: {
              value: 8,
              message: "password must have min 8 digits*",
            },
          }}
        />

        <Input
          label="Confirm password:"
          placeholder="******"
          name="confirmPassword"
          type="password"
          errors={{
            required: { value: true, message: "password is required*" },
          }}
          confirmPassword={true}
        />
        <span>{errorMessage}</span>
        <button type="submit" disabled={isLoading}>
          Sign up!
        </button>
        <BlockLink to={ROUTES.AUTH.LOGIN}>Log in</BlockLink>
      </Form>
    </>
  );
};
export default Signup;
