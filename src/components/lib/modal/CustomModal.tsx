import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCustomModalStore } from "@/stores/CustomModalStore";
import { useEffect, useRef } from "react";

export function CustomModal() {
  const isOpen = useCustomModalStore((state) => state.isOpen);
  const onClose = useCustomModalStore((state) => state.onClose);
  const content = useCustomModalStore((state) => state.content);
  const canClose = useCustomModalStore((state) => state.canClose);
  const close = useCustomModalStore((state) => state.close);
  const className = useCustomModalStore((state) => state.className);

  const hasBeenOpened = useRef(false);

  const triggerer = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    console.log("useEffect");
    if (isOpen) {
      hasBeenOpened.current = true;
      triggerer.current!.click();
    } else {
      if (hasBeenOpened.current) {
        console.log("closing");
        triggerer.current!.click();
      }
    }
  }, [isOpen]);

  const manageOnFakeStateOfIsOpenedChange = (isFakeOpened: boolean) => {
    if (!isFakeOpened && canClose) {
      if (onClose) onClose();
      close();
    }
    if (!isFakeOpened && !canClose) triggerer.current!.click();
  };

  return (
    <Dialog onOpenChange={manageOnFakeStateOfIsOpenedChange}>
      <DialogTrigger ref={triggerer} className="hidden"></DialogTrigger>
      <DialogContent className={className}>{content}</DialogContent>
    </Dialog>
  );
}
