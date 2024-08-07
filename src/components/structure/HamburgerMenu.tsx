import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  faBarsProgress,
  faBuilding,
  faGear,
  faHandshake,
  faInfoCircle,
  faSort,
  faTags,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getPromotionalWebsiteUrl } from "@/lib/utils/utils";
import { useThemeRelatedAssetUrl } from "@/lib/hooks/useThemeRelatedAsset";

export function HamburgerMenu() {
  const getThemeRelatedAssetUrl = useThemeRelatedAssetUrl();

  return (
    <Drawer>
      <DrawerTrigger className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-primary-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-bold flex w-full justify-center">
            <Link to="/dashboard" className="flex gap-2 items-center">
              <img
                src={getThemeRelatedAssetUrl("brand/logo.png")}
                className="h-7 w-7"
              />
              <p className="text-2xl font-bold text-primary">ArchTag</p>
            </Link>
          </DrawerTitle>
          <DrawerDescription>Навигационно меню</DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col gap-2 p-4">
          <li>
            <Collapsible>
              <CollapsibleTrigger className="p-2 relative rounded-md transition w-full active:bg-accent-transparent-50 hover:bg-accent-transparent-30 flex items-center gap-1.5 font-semibold">
                <FontAwesomeIcon icon={faInfoCircle} className="h-4" />
                Информация
                <div className="absolute right-2">
                  <FontAwesomeIcon icon={faSort} className="h-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="flex flex-col gap-2 pl-4 py-2 border-l-2 border-secondary-transparent-50">
                  <li>
                    <a
                      href={getPromotionalWebsiteUrl("/us")}
                      className="p-2 rounded-md transition active:bg-accent-transparent-50 hover:bg-accent-transparent-30 flex items-center gap-2 font-semibold"
                    >
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="h-3 mt-0.5"
                      />
                      За нас
                    </a>
                  </li>
                  <hr className="border-border" />
                  <li>
                    <a
                      href={getPromotionalWebsiteUrl("/pricing")}
                      className="p-2 rounded-md transition active:bg-accent-transparent-50 hover:bg-accent-transparent-30 flex items-center gap-2 font-semibold"
                    >
                      <FontAwesomeIcon icon={faTags} className="h-3 mt-0.5" />
                      Ценоразпис
                    </a>
                  </li>
                  <hr className="border-border" />
                  <li>
                    <a
                      href={getPromotionalWebsiteUrl("/partners")}
                      className="p-2 rounded-md transition active:bg-accent-transparent-50 hover:bg-accent-transparent-30 flex items-center gap-2 font-semibold"
                    >
                      <FontAwesomeIcon
                        icon={faHandshake}
                        className="h-3 mt-0.5"
                      />
                      Партньори
                    </a>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>

          <hr className="border-border" />
          <li>
            <Link
              to="/dashboard"
              className="p-2 rounded-md transition active:bg-accent-transparent-50 hover:bg-accent-transparent-30 flex items-center gap-1.5 font-semibold"
            >
              <FontAwesomeIcon icon={faBarsProgress} className="h-4" />
              Табло за мениджмънт
            </Link>
          </li>
          <hr className="border-border" />
          <li>
            <Link className="p-2 rounded-md transition active:bg-accent-transparent-50 hover:bg-accent-transparent-30 flex items-center gap-1.5 font-semibold">
              <FontAwesomeIcon icon={faGear} className="h-4" />
              Настройки на компанията
            </Link>
          </li>
        </ul>
        <DrawerFooter>
          <DrawerClose className="bg-red-500/10 rounded p-1 flex items-center w-full justify-center text-lg font-semibold">
            <FontAwesomeIcon icon={faXmark} className="h-4 mt-0.5 mr-2" />
            Затвори
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
