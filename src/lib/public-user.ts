import { getProfilePictureUrl } from "./utils/profileUtils";

export class PublicUser {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string = "";
  profilePictureFileName: string | null | undefined;

  private setProfilePictureUrl() {
    this.profilePictureUrl = getProfilePictureUrl(this);
  }

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    profilePictureFileName?: string | null | undefined
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePictureFileName = profilePictureFileName;
    this.setProfilePictureUrl();
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get initials() {
    return `${this.firstName[0]}${this.lastName[0]}`;
  }

  public static builder() {
    return new PublicUserBuilder();
  }
}

class PublicUserBuilder {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  profilePictureUrl: string = "";
  profilePictureFileName: string | null | undefined = null;

  setFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setProfilePictureUrl(profilePictureUrl: string) {
    this.profilePictureUrl = profilePictureUrl;
    return this;
  }

  setProfilePictureFileName(profilePictureFileName: string | undefined | null) {
    if (!profilePictureFileName) return this;
    profilePictureFileName = profilePictureFileName;
    return this;
  }

  build() {
    return new PublicUser(
      this.firstName,
      this.lastName,
      this.email,
      this.profilePictureFileName
    );
  }
}
