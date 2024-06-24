import {
    ButtonCustomizationType,
    CustomForm,
    Field,
    FieldGroup,
  } from "@/components/lib/form/CustomForm";
  import { useRequestr } from "@/lib/hooks/requestr-hook";
  import { Request } from "@/lib/requestr";
  import { faLock } from "@fortawesome/free-solid-svg-icons";
  import { createFileRoute, useNavigate } from "@tanstack/react-router";
  import { useEffect, useState } from "react";
  
  export const Route = createFileRoute("/auth/_authenticate/reset-password")({
    component: ResetPasswordPage,
    validateSearch: (search: any) => {
      return {
        token: search.token,
      };
    },
  });
  
  interface IResetPasswordForm {
    newPassword: string;
  }
  
  const resetPasswordFormFields: Array<Field | FieldGroup> = [
    {
      name: "newPassword",
      type: "password",
      title: "Нова парола",
      placeholder: "Въведете нова парола",
      validation: (value: string) => value.length >= 8,
      errorMessage: "Паролата трябва да е поне 8 символа!",
    },
  ];
  
  interface ResetPasswordRequest {
    token: string;
    newPassword: string;
  }
  
  interface ResetPasswordResponse {
    success: boolean;
    message?: string;
  }
  
  function ResetPasswordPage() {
    const { token } = Route.useSearch<{ token: string }>();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
  
    const { send, res, isLoading, error } = Request.builder<
      ResetPasswordRequest,
      ResetPasswordResponse
    >()
      .useNotificatonErrorHandler()
      .method("POST")
      .url("/auth/reset-password")
      .useRequestr();
  
    const handleSubmit = async (data: IResetPasswordForm) => {
      const requestData: ResetPasswordRequest = {
        token: token, // use the token from the URL
        newPassword: data.newPassword,
      };
      send({ body: requestData });
    };
  
    useEffect(() => {
      if (res) {
        if (res.success) {
          setResponseMessage("Паролата е променена успешно.");
          // Optionally, redirect to the login page after a successful password reset
          setTimeout(() => {
            navigate({ to: "/auth/signin" });
          }, 3000);
        } else {
          setResponseMessage(res.message || "Възникна грешка, моля опитайте отново.");
        }
      }
    }, [res]);
  
    return (
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
          Смяна на паролата
        </h1>
  
        {responseMessage && (
          <div className="alert">
            {responseMessage}
          </div>
        )}
  
        <CustomForm<IResetPasswordForm>
          onSubmit={handleSubmit}
          fields={resetPasswordFormFields}
          submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
          isLoading={isLoading}
          submitButton={{
            icon: faLock,
            text: "Смени паролата",
            size: "full",
          }}
        />
      </div>
    );
  }