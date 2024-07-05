import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavigationMenuItem } from "../ui/navigation-menu";
import {
  faMoneyBills,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "@/lib/utils/authenticationUtils";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "@/lib/hooks/useUser";

export const UserProfileButton = () => {
  const navigate = useNavigate();
  const { profilePictureUrl } = useUser();

  return (
    <NavigationMenuItem className="-mr-3 flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={profilePictureUrl} className="rounded-full" />
            <AvatarFallback>
              <img
                src="/both/profile-picture-loading.png"
                className="rounded-full"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 -right-7 absolute">
          <DropdownMenuLabel>Моят Профил</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate({ to: "/profile" })}
            className="flex gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="h-3" /> Настройки
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-1.5 cursor-pointer">
            <FontAwesomeIcon icon={faMoneyBills} className="h-3" /> Абонаменти
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
              navigate({
                to: "/auth/signin",
              });
            }}
            className="flex gap-2 cursor-pointer text-red-500"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="h-3" /> Отпиши
            се
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </NavigationMenuItem>
  );
};
