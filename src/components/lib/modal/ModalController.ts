import { useCustomModalStore } from "@/stores/CustomModalStore";

export class ModalController {
  static instanciate() {
    const controller = new ModalController();

    if (useCustomModalStore.getState().isBlocked) return controller;

    useCustomModalStore.setState({
      canClose: true,
      content: null,
      onClose: () => {},
      isOpen: false,
      isBlocked: false,
    });

    return controller;
  }

  show() {
    useCustomModalStore.getState().open();
    return this;
  }

  hide() {
    if (useCustomModalStore.getState().isBlocked) return this;
    useCustomModalStore.getState().close();
    return this;
  }

  setContent(content: JSX.Element) {
    console.log("is blocker: " + useCustomModalStore.getState().isBlocked);
    if (useCustomModalStore.getState().isBlocked) return this;
    console.log(content);
    useCustomModalStore.getState().setContent(content);
    return this;
  }

  setCanClose(canClose: boolean) {
    if (useCustomModalStore.getState().isBlocked) return this;
    useCustomModalStore.getState().canClose = canClose;
    return this;
  }

  setClassName(className: string) {
    if (useCustomModalStore.getState().isBlocked) return this;
    useCustomModalStore.getState().className = className;
    return this;
  }

  onClose(callback: () => void) {
    if (useCustomModalStore.getState().isBlocked) return this;
    useCustomModalStore.getState().onClose = callback;
    return this;
  }

  useModal() {
    return {
      onClose: this.onClose,
      open: this.show,
    };
  }

  blockContent() {
    useCustomModalStore.getState().isBlocked = true;
    return this;
  }

  unblockContent() {
    useCustomModalStore.getState().isBlocked = false;
    return this;
  }
}
