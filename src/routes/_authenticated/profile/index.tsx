import { ButtonWithLoader } from "@/components/ButtonWithLoader";
import { InaccountProfilePicture } from "@/components/profile/profile-picture-inaccount";
import { Button } from "@/components/ui/button";
import { Holder } from "@/components/ui/holder";
import { signOut } from "@/lib/utils/authenticationUtils";
import { useUser } from "@/lib/hooks/useUser";
import { Request } from "@/lib/requestr";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ModalController } from "@/components/lib/modal/ModalController";
import { AccountDeletionModal } from "@/components/modals/AccountDeletionModal";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const {} = useUser();
  const navigate = useNavigate();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);

    ModalController.instanciate()
      .setContent(<AccountDeletionModal />)
      .setCanClose(true)
      .onClose(() => {
        console.log("closed");
        setIsDeletingAccount(false);
      })
      .show();

    return;

    const req = Request.builder()
      .url("/user/delete-account")
      .authenticatedRequest()
      .method("POST")
      .useNotificatonErrorHandler()
      .authenticatedRequest()
      .build();

    const { error } = await req.send();

    if (!error) {
      signOut();
      navigate({
        to: "/",
      });
    } else {
      setIsDeletingAccount(false);
    }
  };

  return (
    <Holder>
      <div className="centered-container">
        <h2 className="text-4xl w-full text-center font-semibold">
          Твоят профил
        </h2>

        <InaccountProfilePicture />

        <div className="flex flex-col gap-1.5">
          <Button className="min-w-96">Запази промените</Button>
          <ButtonWithLoader
            variant={"destructive"}
            className="min-w-96"
            isLoading={isDeletingAccount}
            onClick={() => handleDeleteAccount()}
          >
            Изтрий акаунта
          </ButtonWithLoader>
        </div>
      </div>
    </Holder>
  );
}
