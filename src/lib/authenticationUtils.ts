import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { Request, RequestBuilder } from "./requestr";
import { User } from "@/types/user";
import { useUserStore } from "@/stores/UserStore";
import { redirect } from "@tanstack/react-router";
import { ModalController } from "@/components/lib/modal/ModalController";

export function isAuthenticated() {
  return (
    useUserStore.getState().uuid !== "" && !useUserStore.getState().isBanned
  );
}

export function signOut() {
  useAuthenticationStore.getState().setToken("");
  useAuthenticationStore.getState().setRefreshToken("");
  useUserStore.getState().setUser({
    isBanned: false,
    firstName: "",
    lastName: "",
    email: "",
    uuid: "",
    role: "user",
    isEmailValidated: false,
  });
}

export function isEmailValidated() {
  return useUserStore.getState().isEmailValidated;
}

export function isHavingRefreshToken() {
  return useAuthenticationStore.getState().refreshToken !== "";
}

export async function updateUserData() {
  // make a request to the server to get the user data

  const req = Request.builder<unknown, User>()
    .method("GET")
    .url("/auth/get-user-data/" + useAuthenticationStore.getState().token)
    .build();

  const { res, error } = await req.send();

  if (error) {
    return;
  }

  useUserStore.getState().setUser(res!);
}

export async function authenticate(token: string, refreshToken: string) {
  useAuthenticationStore.getState().setToken(token);
  useAuthenticationStore.getState().setRefreshToken(refreshToken);

  await updateUserData();
}

export function updateToken(token: string) {
  useAuthenticationStore.getState().setToken(token);
}

export async function revalidateToken() {
  const req = Request.builder<{ refreshToken: string }, { token: string }>()
    .method("POST")
    .url("/auth/revalidate")
    .build();

  req.setBody({ refreshToken: useAuthenticationStore.getState().refreshToken });

  const { res, error } = await req.send();

  if (error) {
    redirect({
      to: "/auth/signin",
    });
    return;
  }

  updateToken(res!.token);
}
