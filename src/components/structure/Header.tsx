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

import logo from "@/assets/logo.png";
import { UserProfileButton } from "./UserProfileButton";
import { HamburgerMenu } from "./HamburgerMenu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <NavigationMenu>
        <div className="w-full flex flex-grow justify-center p-0">
          <NavigationMenuList className="flex max-[630px]:hidden">
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
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={import.meta.env.VITE_PROMOTIONAL_WEBSITE_URL}
                      >
                        <img src={logo} className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          ArchTag
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Модернизираме и реновираме строителния бранш.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href={getPromotionalWebsiteUrl("/us")}
                    title="За нас"
                  >
                    Кои сме ние? Какво предлагаме? Защо да избереш нас?
                  </ListItem>
                  <ListItem
                    href={getPromotionalWebsiteUrl("/pricing")}
                    title="Ценоразпис"
                  >
                    Разгледай различните ни планове и избери правилния за теб!
                  </ListItem>
                  <ListItem
                    href={getPromotionalWebsiteUrl("/partners")}
                    title="Партньори"
                  >
                    Разгледай партниращите ни компании и се увери в стандартите
                    ни!
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <FontAwesomeIcon
                    icon={faBarsProgress}
                    className="h-3 mr-1.5"
                  />{" "}
                  Табло за мениджмънт
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/company">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <FontAwesomeIcon icon={faGear} className="h-3 mr-1.5" />{" "}
                  Настройки
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="hidden gap-3 max-[630px]:flex justify-start min-w-full -ml-3">
            <div className="relative" onClick={() => setIsMobileMenuOpen(true)}>
              <HamburgerMenu />
            </div>

            <div className="flex justify-center w-full">
              <Link to="/dashboard" className="flex gap-2 items-center">
                <img src={logo} className="h-7 w-7" />
                <p className="text-2xl font-bold text-primary">ArchTag</p>
              </Link>
            </div>
          </div>
        </div>
        <NavigationMenuList>
          <UserProfileButton />
        </NavigationMenuList>
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
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
