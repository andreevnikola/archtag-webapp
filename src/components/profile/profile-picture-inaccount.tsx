import { useUser } from "@/lib/hooks/useUser";
import { Request } from "@/lib/requestr";
import { revalidateToken } from "@/lib/utils/authenticationUtils";
import { pushMessage } from "@/lib/utils/utils";
import { faCamera, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRef } from "react";

export function InaccountProfilePicture() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { profilePictureUrl, email } = useUser();

  const { send, isLoading, error } = Request.builder()
    .url("/user/upload-profile-picture")
    .method("POST")
    .useNotificatonErrorHandler()
    .authenticatedRequest()
    .useRequestr();

  const handleProfilePictureChange = async () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("email", email);

    const { error } = await send({
      body: formData,
    });

    if (error) return;

    pushMessage({
      title: "Профилната снимка беше успешно променена!",
      type: "success",
    });

    revalidateToken();
  };

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
          {!isLoading && (
            <>
              <FontAwesomeIcon
                icon={faCamera}
                className="text-white transition-all opacity-0 group-hover:opacity-100"
                size="3x"
              />
              <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">
                Смени снимка
              </p>
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-white transition-all opacity-100"
                size="3x"
                spin
              />
              <p className="text-white text-xs font-semibold opacity-100 transition-all">
                Качва се...
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleProfilePictureUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
