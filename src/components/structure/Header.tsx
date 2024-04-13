import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn, getPromotionalWebsiteUrl } from "@/lib/utils";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsProgress,
  faGear,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { UserProfileButton } from "./UserProfileButton";
import { HamburgerMenu } from "./HamburgerMenu";
import { ModeToggle } from "../theme-picker/mode-toggle";
import { useThemeRelatedAssetUrl } from "@/lib/hooks/useThemeRelatedAsset";

export function Header() {
  const getThemeRelatedAssetUrl = useThemeRelatedAssetUrl();

  return (
    <>
      <NavigationMenu>
        <div className="w-full flex flex-grow justify-center p-0">
          <NavigationMenuList className="flex max-[650px]:hidden gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex flex-row gap-1.5 items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="h-3" />{" "}
                Информация
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted-transparent-30 to-muted-transparent-50 p-6 no-underline outline-none focus:shadow-md"
                        href={import.meta.env.VITE_PROMOTIONAL_WEBSITE_URL}
                      >
                        <img
                          src={getThemeRelatedAssetUrl("brand/logo.png")}
                          className="h-6 w-6"
                        />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          ArchTag
                        </div>
                        <p className="text-sm leading-tight text-primary-transparent-50">
                          Модернизираме и реновираме строителния бранш.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <a href={getPromotionalWebsiteUrl("/us")}>
                    <ListItem title="За нас">
                      Кои сме ние? Какво предлагаме? Защо да избереш нас?
                    </ListItem>
                  </a>
                  <a href={getPromotionalWebsiteUrl("/pricing")}>
                    <ListItem title="Ценоразпис">
                      Разгледай различните ни планове и избери правилния за теб!
                    </ListItem>
                  </a>
                  <a href={getPromotionalWebsiteUrl("/partners")}>
                    <ListItem title="Партньори">
                      Разгледай партниращите ни компании и се увери в
                      стандартите ни!
                    </ListItem>
                  </a>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <div className={navigationMenuTriggerStyle()}>
                  <FontAwesomeIcon
                    icon={faBarsProgress}
                    className="h-3 mr-1.5"
                  />{" "}
                  Табло за мениджмънт
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/company">
                <div className={navigationMenuTriggerStyle()}>
                  <FontAwesomeIcon icon={faGear} className="h-3 mr-1.5" />{" "}
                  Настройки
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="hidden gap-3 max-[650px]:flex justify-start min-w-full -ml-3">
            <HamburgerMenu />

            <div className="flex justify-center w-full">
              <Link to="/" className="flex gap-2 items-center">
                <img
                  src={getThemeRelatedAssetUrl("brand/logo.png")}
                  className="h-7 w-7"
                />
                <p className="text-2xl font-bold text-primary">ArchTag</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NavigationMenuList>
            <ModeToggle />
          </NavigationMenuList>
          <NavigationMenuList>
            <UserProfileButton />
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <div className="h-20" />
    </>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-transparent-30 focus:text-primary-foreground focus:bg-primary-transparent-50",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
