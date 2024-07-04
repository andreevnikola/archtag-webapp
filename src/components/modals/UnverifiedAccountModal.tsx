import { useState, useEffect } from "react";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { useUser } from "@/lib/hooks/useUser";
import { signOut } from "@/lib/utils/authenticationUtils";
import { useNavigate } from "@tanstack/react-router";
import { useCustomModalStore } from "@/stores/CustomModalStore";
import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { Request } from "@/lib/requestr";

const resendVerificationRequest = (token: string) =>
  Request.builder<{}, { success: boolean; message?: string }>()
    .useNotificatonErrorHandler()
    .method("GET")
    .url("/auth/resend-verification")
    .headers({
      Authorization: `Bearer ${token}`,
    })
    .build();

export function UnverifiedAccountModal() {
  const user = useUser();
  const navigate = useNavigate();
  const hideModal = useCustomModalStore((state) => state.close);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0); // Countdown state
  const token = useAuthenticationStore((state) => state.token); // Retrieve the token from the store

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/auth/signin" });
    hideModal();
  };

  const handleResendVerification = async () => {
    setIsLoading(true); // Start loading
    const { error } = await resendVerificationRequest(token).send();
    setIsLoading(false); // End loading

    if (!error) {
      setResponseMessage("");
      setIsButtonDisabled(true);
      setCountdown(3); // Start countdown from 3 seconds
    } else {
      setResponseMessage(
        "Error resending verification email: " + error.message
      );
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  }, [countdown, isButtonDisabled]);

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
      {responseMessage && <div className="alert">{responseMessage}</div>}
      <div className="flex gap-2 flex-row max-sm:flex-col mt-2">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleResendVerification}
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading
            ? "Loading..."
            : isButtonDisabled
              ? `Препрати верификация (${countdown})`
              : "Препрати верификация"}
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
