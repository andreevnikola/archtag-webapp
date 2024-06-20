import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { useUser } from "@/lib/hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "@/lib/authenticationUtils";
import { useNavigate } from "@tanstack/react-router";
import { useCustomModalStore } from "@/stores/CustomModalStore";

export function UnverifiedAccountModal() {
  const user = useUser();
  const navigate = useNavigate();
  const hideModal = useCustomModalStore((state) => state.close);

  const handleSignOut = () => {
    signOut();
    navigate({
      to: "/auth/signin",
    });
    hideModal();
  };

  return (
    <>
      <DialogHeader>
        <FontAwesomeIcon icon={faEnvelope} size="6x" className="mb-2" />
        <DialogTitle className="font-semibold text-center text-xl">
          Акаунта Ви не е активиран
        </DialogTitle>
        <DialogDescription className="text-primary-transparent-80 text-justify">
          За да активирате акаунта си, моля отворетре линка който сте получили
          на посоченият от вас имейл адрес ({user.email}).
        </DialogDescription>
      </DialogHeader>
      <div className="flex gap-2 flex-row max-sm:flex-col mt-2">
        <Button variant={"outline"} className="w-full">
          Препрати верификация
        </Button>
        <Button
          onClick={() => handleSignOut()}
          variant={"destructive"}
          className="w-full"
        >
          Отпиши се
        </Button>
      </div>
    </>
  );
}
