import { ModalController } from "@/components/lib/modal/ModalController";
import { UnverifiedAccountModal } from "@/components/modals/UnverifiedAccountModal";
import {
  authenticate,
  isAuthenticated,
  isEmailValidated,
  isHavingRefreshToken,
  revalidateToken,
} from "@/lib/authenticationUtils";
import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayoutComponent,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      try {
        if (isHavingRefreshToken()) {
          revalidateToken();
          authenticate(
            useAuthenticationStore.getState().token,
            useAuthenticationStore.getState().refreshToken
          );
          console.log("revalidated");
          if (!isEmailValidated()) {
            ModalController.instanciate()
              .setContent(<UnverifiedAccountModal />)
              .setCanClose(false)
              .show();
          }
          return;
        }
      } catch (e) {
        console.log(e);
      }

      throw redirect({
        to: "/auth/signin",
        search: {
          from: window.location.pathname,
        },
      });
    }
  },
});

function AuthenticatedLayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
