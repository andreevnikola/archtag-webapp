import { useCustomModalStore } from "@/stores/CustomModalStore";

export class ModalController {
  static instanciate() {
    const controller = new ModalController();

    useCustomModalStore.setState({
      canClose: true,
      content: null,
      onClose: () => {},
      isOpen: false,
    });

    return controller;
  }

  show() {
    useCustomModalStore.getState().open();
    return this;
  }

  hide() {
    useCustomModalStore.getState().close();
    return this;
  }

  setContent(content: JSX.Element) {
    useCustomModalStore.getState().setContent(content);
    return this;
  }

  setCanClose(canClose: boolean) {
    useCustomModalStore.getState().canClose = canClose;
    return this;
  }

  setClassName(className: string) {
    useCustomModalStore.getState().className = className;
    return this;
  }

  onClose(callback: () => void) {
    useCustomModalStore.getState().onClose = callback;
    return this;
  }

  useModal() {
    return {
      onClose: this.onClose,
      open: this.show,
    };
  }
}
