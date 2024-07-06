import { useMessageStore } from "@/stores/MessageStore";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export function Messages() {
  const messages = useMessageStore((state) => state.messages);

  //  useEffect(() => {
  //    setInterval(() => {
  //      pushMessage({
  //        title: Math.random().toString(),
  //        message:
  //          "It is a really important notification or at least I think so. Just hopes.",
  //        type: "message",
  //      });
  //    }, 3000);
  //  }, []);

  return (
    <motion.div className="fixed right-0 bottom-0 p-2 flex flex-col gap-1.5 z-[1000000]">
      <AnimatePresence>
        {messages.map((msg, i) => (
          <motion.span
            initial={{ left: 100, opacity: 0, scale: 0.95, scaleX: 0.85 }}
            animate={{ left: 0, opacity: 1, scale: 1, scaleX: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "linear" }}
            className="relative"
            key={i}
          >
            <Alert
              variant={"default"}
              className={
                msg.type === "error"
                  ? "border-destructive bg-destructive-transparent-50 z-[1000000]"
                  : msg.type === "success"
                    ? "border-success bg-success-transparent-50 z-[1000000]"
                    : "border-primary bg-muted-transparent-50 z-[1000000]"
              }
            >
              <FontAwesomeIcon
                className="w-4 h-4"
                icon={
                  msg.type === "error"
                    ? faTriangleExclamation
                    : msg.type === "success"
                      ? faCircleCheck
                      : faBell
                }
              />
              <AlertTitle>{msg.title}</AlertTitle>
              <AlertDescription>{msg.message}</AlertDescription>
            </Alert>
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
