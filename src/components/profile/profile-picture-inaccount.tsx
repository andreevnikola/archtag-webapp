import { useUser } from "@/lib/hooks/useUser";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export function InaccountProfilePicture() {
  const { profilePictureUrl } = useUser();

  const handleProfilePictureChange = () => {};

  return (
    <div className="w-full -z-10 flex py-2 flex-col justify-center items-center absolute left-0 top-0 -translate-y-1/2">
      <div className="w-fit aspect-square max-w-52 rounded-full relative ">
        <Avatar className="p-0 m-0 ">
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
        <div
          onClick={() => handleProfilePictureChange()}
          className="absolute group top-0 left-0 w-full flex justify-center gap-1 flex-col items-center cursor-pointer transition-all hover:backdrop-blur-sm hover:bg-black/35 rounded-full h-full"
        >
          <FontAwesomeIcon
            icon={faCamera}
            className="text-white transition-all opacity-0 group-hover:opacity-100"
            size="3x"
          />
          <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">
            Смени снимка
          </p>
        </div>
      </div>
    </div>
  );
}
