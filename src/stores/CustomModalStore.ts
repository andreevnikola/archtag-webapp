import create from "zustand";

export interface CustomModalProps {
  canClose?: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  open: () => void;
  close: () => void;
  setContent: (content: React.ReactNode) => void;
  className: string;
  isBlocked?: boolean;
}

export interface CustomModal extends CustomModalProps {
  isOpen: boolean;
}

export const useCustomModalStore = create<CustomModal>((set) => ({
  isOpen: false,
  content: null,
  canClose: false,
  isBlocked: false,
  className: "",
  onClose: () => {},
  setContent: (content: React.ReactNode) => set({ content }),
  open: () => set({ isOpen: true }),
  close: () => set({ canClose: true, isOpen: false }),
}));
