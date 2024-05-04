import {
  ButtonCustomizationType,
  CustomForm,
  Field,
  FieldGroup,
} from "@/components/lib/form/CustomForm";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Request } from "@/lib/requestr";
import { useEffect } from "react";
import { authenticate } from "@/lib/authenticationUtils";

export const Route = createFileRoute("/auth/_authenticate/register")({
  component: SignInPage,
});

interface IRegisterForm {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

const registerFormFields: Array<Field | FieldGroup> = [
  {
    name: "names",
    fields: [
      {
        name: "firstName",
        type: "text",
        title: "Име",
        placeholder: "Георги",
        validation: (value: string) => value.length > 2 && value.length < 20,
        errorMessage: "Моля въведете валидно име!",
      },
      {
        name: "lastName",
        type: "text",
        title: "Фамилия",
        placeholder: "Иванов",
        validation: (value: string) => value.length > 3 && value.length < 20,
        errorMessage: "Моля въведете валидна фамилия!",
      },
    ],
  },
  {
    name: "password",
    type: "password",
    title: "Парола",
    placeholder: "*********",
    validation: (value: string) => value.length > 5 && value.length < 21,
    errorMessage: "Паролата трябва да е между 6 и 20 символа!",
  },
  {
    name: "email",
    type: "text",
    title: "Имейл",
    placeholder: "georgiivanov@work.com",
    validation: (value: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) && value.length < 50,
    errorMessage: "Моля въведете валиден имейл!",
  },
];

function SignInPage() {
  const handleSubmit = (data: IRegisterForm) => {
    send({
      body: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        password: data.password,
      },
    });
  };

  const navigate = useNavigate();

  const { send, res, isLoading, error } = Request.builder<
    {
      email: string;
      firstname: string;
      lastname: string;
      password: string;
    },
    any
  >()
    .useNotificatonErrorHandler()
    .method("POST")
    .url("/auth/register")
    .useRequestr();

  useEffect(() => {
    if (res && !error) {
      (async () => {
        await authenticate(res.token, res.refreshToken);
        navigate({
          to: "/",
        });
      })();
    }
  }, [res]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Регистрация
      </h1>

      <CustomForm<IRegisterForm>
        onSubmit={handleSubmit}
        fields={registerFormFields}
        submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
        submitButton={{
          icon: faUserPlus,
          text: "Регистрирай се",
          size: "full",
        }}
        links={[
          {
            text: "Имаш акаунт? Впиши се!",
            href: "/auth/signin",
          },
        ]}
        isLoading={isLoading}
      />
    </div>
  );
}
