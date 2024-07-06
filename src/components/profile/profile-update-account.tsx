import { Request, RequestBuilder } from "@/lib/requestr";
import {
  ButtonCustomizationType,
  CustomForm,
  Field,
  FieldGroup,
} from "../lib/form/CustomForm";
import { useUser } from "@/lib/hooks/useUser";
import { pushMessage } from "@/lib/utils/utils";

interface IProfileUpdateAccountForm {
  firstName: string;
  lastName: string;
}

export function ProfileUpdateAccountComponent() {
  const { email, firstname, lastname } = useUser();

  const ProfileUpdateAccount: Array<Field | FieldGroup> = [
    {
      name: "firstName",
      type: "text",
      title: "Първо име",
      validation: (value: string) => value.length > 2,
      errorMessage: "Първото име трябва да е поне 3 знака!",
      placeholder: "Иван",
      defaultValue: firstname,
    },
    {
      name: "lastName",
      type: "text",
      title: "Фамилно име",
      validation: (value: string) => value.length > 2,
      errorMessage: "Фамилното име трябва да е поне 3 знака!",
      placeholder: "Иванов",
      defaultValue: lastname,
    },
  ];

  const { isLoading, send, error } = Request.builder()
    .url("/user/update-account")
    .method("POST")
    .useNotificatonErrorHandler()
    .authenticatedRequest()
    .useRequestr();

  const handleAccountUpdate = async (data: IProfileUpdateAccountForm) => {
    const resp = await send({
      body: {
        firstname: data.firstName,
        lastname: data.lastName,
        email: email,
      },
    });

    if (resp.error) return;

    pushMessage({
      message: "Всички промени бяха успешно запазени.",
      type: "success",
      title: "Операцията беше успешна!",
    });
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg w-full">
      <div className="flex gap-3 w-full items-center">
        <p className="w-fit text-lg font-semibold min-w-fit">
          Настройки на акаунт
        </p>
        <div className="h-0.5 border-b border-primary-transparent-50 w-full"></div>
      </div>
      <CustomForm<IProfileUpdateAccountForm>
        fields={ProfileUpdateAccount}
        onSubmit={handleAccountUpdate}
        submitButton={{
          text: "Запази промени",
          variant: "default",
          customStyle: { width: "100%" },
        }}
        isLoading={isLoading}
        submitButtonType={ButtonCustomizationType.CUSTOM_TEXT}
      />{" "}
    </div>
  );
}
