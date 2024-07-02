import {
  ButtonCustomizationType,
  CustomForm,
  Field,
  FieldGroup,
} from "@/components/lib/form/CustomForm";
import { Request } from "@/lib/requestr";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/auth/_authenticate/forgotten-password")({
  component: ForgottenPasswordPage,
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

interface IForgottenPassForm {
  email: string;
}

const forgottenPassFormFields: Array<Field | FieldGroup> = [
  {
    name: "email",
    type: "text",
    title: "Имейл",
    placeholder: "georgiivanov@work.com",
    validation: (value: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) && value.length < 50,
    errorMessage: "Моля въведете валиден имейл!",
  },
];

interface ForgottenPassRequest {
  email: string;
}

interface ForgottenPassResponse {
  success: boolean;
  message?: string;
}

function ForgottenPasswordPage() {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const { send, res, isLoading, error } = Request.builder<
    ForgottenPassRequest,
    ForgottenPassResponse
  >()
    .useNotificatonErrorHandler()
    .method("POST")
    .url("/auth/forgot-password")
    .useRequestr();

  const handleSubmit = async (data: IForgottenPassForm) => {
    console.log("Sending request with data: ", data);
    send({ body: data });
  };

  useEffect(() => {
    if (res) {
      console.log("Response received: ", res);
      if (res.success) {
        setResponseMessage("Ще изпратим имейл с инструкции за смяна на паролата.");
      } else {
        setResponseMessage("");
      }
    } else if (error) {
      console.error("Error: ", error);
      setResponseMessage("Възникна грешка, моля опитайте отново.");
    }
  }, [res, error]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        Забравена парола
      </h1>

      {responseMessage && (
        <div className="alert text-green-400">
          {responseMessage}
        </div>
      )}

      <CustomForm<IForgottenPassForm>
        onSubmit={handleSubmit}
        fields={forgottenPassFormFields}
        submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
        isLoading={isLoading}
        submitButton={{
          icon: faUser,
          text: "Изпрати",
          size: "full",
        }}
        links={[
          {
            text: "Вход",
            href: "/auth/signin",
          },
        ]}
      />
    </div>
  );
}

export default ForgottenPasswordPage;
