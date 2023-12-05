"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import EmailFormComponent from "./inputs/Email";
import PasswordFormComponent from "./inputs/Password";
import ConfirmPasswordFormComponent from "./inputs/ConfirmPassword";
import FirstNameEmailComponent from "./inputs/FirstName";
import LastNameEmailComponent from "./inputs/LastName";
import Checkbox from "./inputs/Checkbox";
import { yupFormAuth } from "../../helpers/yupFormAuth";
import SmallSpinner from "../loading/SmallSpinner";
import { useState, useContext, useEffect } from "react";
import { UserAuthContext } from "../UserAuthContext";
import { userService } from "../../services/userService";
import { alertService } from "../../services/alertService";
import { useRouter } from "next/navigation";

const UpdateUserForm = ({ info }) => {
  const schema = yupFormAuth.buildFormSchema({
    email: true,
    //   password: true,
    //   confirmPassword: true,
    firstname: true,
    lastname: true,
  });
  const { signedIn, setSignedIn, baseUrl } = useContext(UserAuthContext);
  const [loaderState, setLoaderState] = useState(false);
  const [showPasswordEditFields, setShowPasswordEditFields] = useState(false);
  const [schemaState, setSchemaState] = useState(schema);

  const router = useRouter();
  const validationSchema = Yup.object().shape(schemaState);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, reset, formState, setValue } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log(data)
    await userService
      .update(
        baseUrl,
        data.email,
        data.firstname,
        data.lastname,
        data.password,
        data.confirmPassword
      )
      .then((result) => {
        console.log(result);
        setSignedIn({
          loggedIn: true,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          role: null,
        });
        router.push("/account");
        alertService.success("Successfully updated user information!", true);
      })
      .catch((error) => {
        reset({
          firstname: info.firstname,
          lastname: info.lastname,
          email: info.email
        })
        setLoaderState(false);
        alertService.error("Unable to update. Check all input fields are valid and try again.");
      });
  };

  const handleDisplayPasswordFields = () => {
    setShowPasswordEditFields(!showPasswordEditFields);
    setSchemaState(
      yupFormAuth.buildFormSchema({
        password: !showPasswordEditFields,
        confirmPassword: !showPasswordEditFields,
        ...schema,
      })
    );
  };

  useEffect(() => {
    if (info) {
      setValue("firstname", info.firstname);
      setValue("lastname", info.lastname);
      setValue("email", info.email);
    }
  }, [info]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailFormComponent register={register} errors={errors} />
      <FirstNameEmailComponent register={register} errors={errors} />
      <LastNameEmailComponent register={register} errors={errors} />
      {showPasswordEditFields ? (
        <>
          <PasswordFormComponent register={register} errors={errors} />
          <ConfirmPasswordFormComponent register={register} errors={errors} />
        </>
      ) : (
        ""
      )}
      <Checkbox
        name="updatePwd"
        register={register}
        checkboxMsg="Would you like to update your password?"
        onChange={handleDisplayPasswordFields}
      />
      <button
        type="submit"
        className="btn btn-primary mt-2 w-100"
        disabled={loaderState}
      >
        {loaderState ? <SmallSpinner /> : "Update"}
      </button>
    </form>
  );
};

export default UpdateUserForm;
