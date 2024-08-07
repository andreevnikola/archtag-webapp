import { useAuthenticationStore } from "@/stores/AuthenticationStore";
import { Request } from "../requestr";
import { User } from "@/types/user";
import { useUserStore } from "@/stores/UserStore";
import { redirect } from "@tanstack/react-router";
import { getProfilePictureUrl } from "./profileUtils";
import { PublicUser } from "../public-user";

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
    firstname: "",
    lastname: "",
    email: "",
    uuid: "",
    role: "user",
    profilePictureUrl: "", // Reset profile picture URL
    verified: false,
    perPublicUser: null,
  });
}

export function isEmailValidated() {
  return useUserStore.getState().verified;
}

export function isHavingRefreshToken() {
  return useAuthenticationStore.getState().refreshToken !== "";
}

export async function updateUserData() {
  const req = Request.builder<unknown, User>()
    .method("GET")
    .url("/auth/get-user-data/" + useAuthenticationStore.getState().token)
    .build();

  const { res, error } = await req.send();

  if (error) {
    return;
  }

  if (!res) {
    return;
  }

  const perPublicUser = PublicUser.builder()
    .setEmail(res.email)
    .setFirstName(res.firstname)
    .setLastName(res.lastname)
    .setProfilePictureFileName(res.profilePictureFilename)
    .build();

  useUserStore.getState().setUser({
    profilePictureUrl: getProfilePictureUrl(perPublicUser),
    ...res,
    perPublicUser: perPublicUser,
  });
  console.log("User data updated: ", res);
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
  await updateUserData();
}
