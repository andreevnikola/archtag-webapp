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
import { sign } from "crypto";
import { signOut } from "@/lib/utils/authenticationUtils";
import { useNavigate } from "@tanstack/react-router";
import { ModalController } from "../lib/modal/ModalController";

interface IAccountDeletionModalForm {
  password: string;
}

const AccountDeletionModalFormFields: Array<Field | FieldGroup> = [
  {
    name: "password",
    type: "password",
    title: "Парола",
    placeholder: "********",
    validation: (value: string) => value.length > 5,
    errorMessage: "Моля въведете валидна парола!",
  },
];

export function AccountDeletionModal() {
  const accountDeletionReq = Request.builder<IAccountDeletionModalForm, any>()
    .url("/user/delete-account")
    .method("POST")
    .useNotificatonErrorHandler()
    .authenticatedRequest()
    .useRequestr();

  const navigate = useNavigate();

  const handleAccoutDeletion = async (data: IAccountDeletionModalForm) => {
    const resp = await accountDeletionReq.send({
      body: data,
    });

    if (resp.error) return;

    alert("Акаунтът Ви беше изтрит успешно!");
    signOut();

    ModalController.instanciate().hide();

    navigate({
      to: "/auth/signin",
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-semibold font-lg text-center ">
          Изтриване на акаунт
        </DialogTitle>
        <br />
        <span className="text-left">
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
        </span>
      </DialogHeader>
    </>
  );
}
