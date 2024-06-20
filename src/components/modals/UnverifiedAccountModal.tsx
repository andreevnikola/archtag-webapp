import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";

export function UnverifiedAccountModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label className="sr-only">Link</Label>
          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
