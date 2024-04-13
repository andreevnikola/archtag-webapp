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

export const UserProfileButton = () => {
  return (
    <NavigationMenuItem className="-mr-3 flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 -right-7 absolute">
          <DropdownMenuLabel>Моят Профил</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faUser} className="h-3" /> Настройки
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-1.5 cursor-pointer">
            <FontAwesomeIcon icon={faMoneyBills} className="h-3" /> Абонаменти
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer text-red-500">
            <FontAwesomeIcon icon={faRightFromBracket} className="h-3" /> Отпиши
            се
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </NavigationMenuItem>
  );
};
