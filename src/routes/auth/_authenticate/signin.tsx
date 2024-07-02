import {
  ButtonCustomizationType,
  CustomForm,
  Field,
  FieldGroup,
} from "@/components/lib/form/CustomForm";
import { authenticate } from "@/lib/authenticationUtils";
import { Request } from "@/lib/requestr";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/_authenticate/signin")({
  component: SignInPage,
  validateSearch: (
    search: any
  ): {
    from?: string;
  } => {
    return {
      from: search && search.from && search.from !== "" ? search.from : "/",
    };
  },
});

interface ISignInForm {
  email: string;
  password: string;
}

const signInFormFields: Array<Field | FieldGroup> = [
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
  {
    name: "password",
    type: "password",
    title: "Парола",
    placeholder: "*********",
    validation: (value: string) => value.length > 5 && value.length < 21,
    errorMessage: "Паролата трябва да е между 6 и 20 символа!",
  },
];

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  refreshToken: string;
}

function SignInPage() {
  const { from } = Route.useSearch();

  const navigate = useNavigate();

  const { send, res, isLoading, error } = Request.builder<
    SignInRequest,
    SignInResponse
  >()
    .useNotificatonErrorHandler()
    .method("POST")
    .url("/auth/signin")
    .useRequestr();

  const handleSubmit = async (data: ISignInForm) => {
    send({ body: data });
  };

  useEffect(() => {
    if (res && !error) {
      (async () => {
        await authenticate(res.token, res.refreshToken);
        console.log("shall redirect to: ", from || "/");
        navigate({
          to: from || "/",
        });
      })();
    }
  }, [res]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Впиши се
      </h1>

      <CustomForm<ISignInForm>
        onSubmit={handleSubmit}
        fields={signInFormFields}
        submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
        isLoading={isLoading}
        submitButton={{
          icon: faUser,
          text: "Впиши се",
          size: "full",
        }}
        links={[
          {
            text: "Нямаш акаунт? Регистрирай се!",
            href: "/auth/register",
          },
          {
            text: "Забравена парола?",
            href: "/auth/forgotten-password",
          },
        ]}
      />
    </div>
  );
}
