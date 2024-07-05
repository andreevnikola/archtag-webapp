import { useUser } from "@/lib/hooks/useUser";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export function InaccountProfilePicture() {
  const { profilePictureUrl } = useUser();

  return (
    <div className="w-full flex py-2 flex-col justify-center items-center">
      <div className="w-full aspect-square max-w-xs">
        <Avatar className="p-0 m-0">
          <AvatarImage
            src={profilePictureUrl}
            className="rounded-full aspect-square"
          />
          <AvatarFallback>
            <img
              src="/both/profile-picture-loading.png"
              className="rounded-full"
            />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}