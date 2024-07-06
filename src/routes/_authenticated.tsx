import { ModalController } from "@/components/lib/modal/ModalController";
import { UnverifiedAccountModal } from "@/components/modals/UnverifiedAccountModal";
import {
  authenticate,
  isAuthenticated,
  isEmailValidated,
  isHavingRefreshToken,
  revalidateToken,
} from "@/lib/utils/authenticationUtils";
import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayoutComponent,
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      try {
        if (isHavingRefreshToken()) {
          await revalidateToken();
          await authenticate(
            useAuthenticationStore.getState().token,
            useAuthenticationStore.getState().refreshToken
          );

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
    } else if (!isEmailValidated()) {
      ModalController.instanciate()
        .setContent(<UnverifiedAccountModal />)
        .setCanClose(false)
        .show();
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
