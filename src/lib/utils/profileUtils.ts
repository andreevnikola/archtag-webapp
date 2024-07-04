import { useUserStore } from "@/stores/UserStore";
import { isAuthenticated } from "./authenticationUtils";
import { PublicUser } from "../public-user";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { staticUrl } from "../config";

export function getUser() {
  return { isAuthenticated: isAuthenticated(), ...useUserStore.getState() };
}

function getDefaultProfilePictureUrl(user: PublicUser) {
  const avatar = createAvatar(initials, {
    seed: user.fullName,
  });

  return avatar.toDataUri();
}

function getProfilePictureUrlFromFileName(fileName: string) {
  return `${staticUrl}/${fileName}`;
}

export function getProfilePictureUrl(user: PublicUser) {
  if (user.profilePictureFileName) {
    return getProfilePictureUrlFromFileName(user.profilePictureFileName);
  }

  return getDefaultProfilePictureUrl(user);
}
