import { ReqError } from "..";

export default function consoleErrorHandler(error: ReqError) {
  console.error(error);
}
