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
import { ProfileResetPassword } from "@/components/profile/profile-reset-password";
import { ProfileUpdateAccountComponent } from "@/components/profile/profile-update-account";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const { email } = useUser();
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
    <Holder className="p-2 pt-32">
      <div className="centered-container relative -z-0">
        <InaccountProfilePicture />
        <h2 className="text-4xl w-full text-center font-semibold mt-5">
          Твоят профил
        </h2>

        <div className="flex flex-col gap-0 -mb-6">
          <div className="flex justify-between -mb-1.5 gap-1">
            <p className="flex italic">имейл:</p>
            <p className="flex font-semibold max-w-full overflow-auto">
              {email}
            </p>
          </div>
          <p className="text-xs text-success-transparent-80 text-right">
            Елeктронната поща е потвърдена
          </p>
        </div>

        <div className="flex flex-col max-md:flex-col gap-3">
          <ProfileUpdateAccountComponent />
          <ProfileResetPassword />
        </div>
        <div className="flex w-full sm:min-w-96 max-sm:flex-col flex-row gap-1.5 z-0 -mt-5">
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
