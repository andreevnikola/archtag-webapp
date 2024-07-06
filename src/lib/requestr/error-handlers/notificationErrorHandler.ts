import { useMessageStore } from "@/stores/MessageStore";
import { ReqError } from "..";

export default function notificationErrorHandler(error: ReqError) {
  console.error(error);

  useMessageStore.getState().push({
    title: "Грешка",
    message:
      error.status === 401 && error.request?.isAuthenticated && !error.message
        ? "Не сте ауторизирани за тази операция"
        : error.message,
    type: "error",
  });
}
