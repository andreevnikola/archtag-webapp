import { Request, RequestBuilder } from "@/lib/requestr";
import {
  ButtonCustomizationType,
  CustomForm,
  Field,
  FieldGroup,
} from "../lib/form/CustomForm";
import { useUser } from "@/lib/hooks/useUser";

interface IProfileResetPasswordForm {
  oldPassword: string;
  newPassword: string;
}

const ProfileResetPasswordFields: Array<Field | FieldGroup> = [
  {
    name: "oldPassword",
    type: "password",
    title: "Стара парола",
    placeholder: "********",
    validation: (value: string) => value.length > 5,
    errorMessage: "Моля въведете валидна стара парола!",
  },
  {
    name: "newPassword",
    type: "password",
    title: "Нова парола",
    placeholder: "********",
    validation: (value: string) => value.length > 5,
    errorMessage: "Моля въведете валидна нова парола!",
  },
];

export function ProfileResetPassword() {
  const { email } = useUser();

  const { isLoading, send, error } = Request.builder()
    .url("/user/update-account")
    .method("POST")
    .useNotificatonErrorHandler()
    .authenticatedRequest()
    .useRequestr();

  const handleAccoutDeletion = async (data: IProfileResetPasswordForm) => {
    const resp = await send({
      body: {
        password: data.newPassword,
        currentPassword: data.oldPassword,
        email: email,
      },
    });

    if (resp.error) return;

    alert("Паролата Ви беше променена успешно!");
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg w-full">
      <div className="flex gap-3 w-full items-center">
        <p className="w-fit text-lg font-semibold min-w-fit">
          Промени паролата си
        </p>
        <div className="h-0.5 border-b border-primary-transparent-50 w-full"></div>
      </div>
      <CustomForm<IProfileResetPasswordForm>
        fields={ProfileResetPasswordFields}
        onSubmit={handleAccoutDeletion}
        submitButton={{
          text: "Промени паролата",
          variant: "default",
          customStyle: { width: "100%" },
        }}
        isLoading={isLoading}
        submitButtonType={ButtonCustomizationType.CUSTOM_TEXT}
      />
    </div>
  );
}
