import { useUser } from "@/lib/hooks/useUser";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export function InaccountProfilePicture() {
  const { profilePictureUrl } = useUser();

  return (
    <div className="w-full -z-10 flex py-2 flex-col justify-center items-center absolute left-0 top-0 -translate-y-1/2">
      <div className="w-fit aspect-square max-w-52">
        <Avatar className="p-0 m-0">
          <AvatarImage
            src={profilePictureUrl}
            className="rounded-full aspect-square w-full gradient-mask-t-[rgba(0,0,0,0)_0,rgba(0,0,0,0.9)_50%,rgba(0,0,0,1)_100%]"
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
