"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import EmailFormComponent from "./inputs/Email";
import PasswordFormComponent from "./inputs/Password";
import { yupFormAuth } from "@/helpers/yupFormAuth";
import SmallSpinner from "../loading/SmallSpinner";
import { userService } from "@/services/userService";
import { alertService } from "@/services/alertService";
import { useState, useContext } from "react";
import { UserAuthContext } from "../UserAuthContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loaderState, setLoaderState] = useState(false);
  const { signedIn, setSignedIn, baseUrl } = useContext(UserAuthContext);
  const router = useRouter();

  const validationSchema = Yup.object().shape(
    yupFormAuth.buildFormSchema({ email: true, password: true })
  );

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    setLoaderState(true);
    console.log(data.email, data.password);
    await userService
      .login(baseUrl, data.email, data.password)
      .then((result) => {
        alertService.success("Successfully signed in!");
        setSignedIn({
          loggedIn: true,
          email: data.email,
          firstname: null,
          lastname: null,
          role: null,
        });
        router.push("/account");
        localStorage.setItem("last-updated", new Date());
      })
      .catch((error) => {
        console.error(error);
        alertService.error(error);
        setLoaderState(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailFormComponent register={register} errors={errors} />
      <PasswordFormComponent register={register} errors={errors} />
      <button
        type="submit"
        className="btn btn-primary mt-2 w-100"
        disabled={loaderState}
      >
        {loaderState ? <SmallSpinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
