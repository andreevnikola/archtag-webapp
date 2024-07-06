import create from "zustand";

type MessageType = "error" | "success" | "message";

export interface Message {
  title: string;
  message?: string;
  type: MessageType;
}

type MessageStore = {
  messages: Message[];
  push: (msg: Message) => void;
  preparedPop: () => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  push: (msg) => {
    set((state) => {
      state.preparedPop();
      return { messages: [...state.messages, msg] };
    });
  },
  preparedPop: () => {
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.slice(1, state.messages.length),
      }));
    }, 10000);
  },
}));
