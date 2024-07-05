import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import {
  ButtonCustomizationType,
  CustomForm,
  Field,
  FieldGroup,
} from "../lib/form/CustomForm";
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Request } from "@/lib/requestr";

interface IAccountDeletionModalForm {
  password: string;
}

const AccountDeletionModalFormFields: Array<Field | FieldGroup> = [
  {
    name: "password",
    type: "password",
    title: "Парола",
    placeholder: "********",
    validation: (value: string) => value.length > 6,
    errorMessage: "Моля въведете валидна парола!",
  },
];

export function AccountDeletionModal() {
  const accountDeletionReq = Request.builder<IAccountDeletionModalForm, any>()
    .url("/auth/delete-account")
    .method("POST")
    .useNotificatonErrorHandler()
    .authenticatedRequest()
    .useRequestr();

  const handleAccoutDeletion = (data: IAccountDeletionModalForm) => {
    accountDeletionReq.send({
      body: data,
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-semibold font-lg text-center ">
          Изтриване на акаунт
        </DialogTitle>
        <br />
        <CustomForm<IAccountDeletionModalForm>
          fields={AccountDeletionModalFormFields}
          submitButtonType={ButtonCustomizationType.CUSTOM_TEXT_AND_ICON}
          isLoading={accountDeletionReq.isLoading}
          submitButton={{
            text: "Изтрий акаунт",
            variant: "destructive",
            icon: faTrashArrowUp,
            customStyle: { width: "100%" },
          }}
          onSubmit={(data: IAccountDeletionModalForm) =>
            handleAccoutDeletion(data)
          }
        />
      </DialogHeader>
    </>
  );
}
