import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faInbox,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { supportEmail, supportPhoneNumber } from "@/lib/config";

export function ServerErrorModal() {
  return (
    <>
      <DialogHeader>
        <div className="flex w-full">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-destructive"
            size="2x"
          />
          <DialogTitle className="font-semibold text-2xl text-center w-full">
            Възникна грешка
          </DialogTitle>
        </div>
        <br />
        <p className="text-justify w-full">
          Не успяхме да процедираме заявката Ви. В момента уебсайта е неактивен,
          oпитайте пак по-късно!
        </p>
        <br />
        <div className="border border-primary-transparent-30 w-full rounded-lg p-4 pl-4 bg-primary-foreground">
          <p className="italic text-justify mb-3 text-primary-transparent-80 pl-2 border-l border-primary-transparent-30">
            * За да може проблема да бъде отстранен по-бързо, моля свържете се с
            нас предоставяйки ни с необходимата информация за отстраняването му.
          </p>
          <div className="w-full flex flex-row justify-between">
            <div className="flex gap-2">
              <FontAwesomeIcon
                icon={faPhoneVolume}
                size="sm"
                className="-bottom-1.5 relative"
              />
              <p className="w-fit">{supportPhoneNumber}</p>
            </div>

            <div className="flex gap-2">
              <FontAwesomeIcon
                icon={faInbox}
                className="-bottom-1.5 relative"
                size="sm"
              />
              <p className="w-fit">{supportEmail}</p>
            </div>
          </div>
        </div>
      </DialogHeader>
    </>
  );
}
