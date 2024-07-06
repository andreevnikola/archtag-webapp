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
  };

  const handleSignOut = async () => {
    signOut();
    navigate({
      to: "/auth/signin",
    });
  };

  return (
    <Holder className="p-2">
      <div className="centered-container relative">
        <InaccountProfilePicture />
        <h2 className="text-4xl w-full text-center font-semibold z-20 mt-5">
          Твоят профил
        </h2>

        <div className="flex w-full sm:min-w-96 max-sm:flex-col flex-row gap-1.5">
          <ButtonWithLoader
            variant={"destructive"}
            className="w-full"
            isLoading={isDeletingAccount}
            onClick={() => handleDeleteAccount()}
          >
            Изтрий акаунта
          </ButtonWithLoader>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={handleSignOut}
          >
            Изход{" "}
          </Button>
        </div>
      </div>
    </Holder>
  );
}
