import { useMessageStore } from "@/stores/MessageStore";
import { ReqError } from "..";

export default function notificationErrorHandler(error: ReqError) {
  console.error(error);

  useMessageStore.getState().push({
    title: "Грешка",
    message: error.message,
    type: "error",
  });
}
