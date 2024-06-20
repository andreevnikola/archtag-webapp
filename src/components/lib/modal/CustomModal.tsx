import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCustomModalStore } from "@/stores/CustomModalStore";
import { useEffect, useRef } from "react";

export function CustomModal() {
  const isOpen = useCustomModalStore((state) => state.isOpen);
  const content = useCustomModalStore((state) => state.content);

  const hasBeenOpened = useRef(false);

  const triggerer = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      hasBeenOpened.current = true;
      triggerer.current!.click();
    } else if (hasBeenOpened.current) {
      triggerer.current!.click();
    }
  }, [isOpen]);

  return (
    <Dialog>
      <DialogTrigger ref={triggerer} className="hidden"></DialogTrigger>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
