import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import {
  faArrowRotateRight,
  faCircleNotch,
  faRotateRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export function ButtonWithLoader({
  children,
  isLoading,
  ...props
}: {
  children: React.ReactNode;
  isLoading: boolean;
  [key: string]: any;
}) {
  return (
    <Button
      {...props}
      disabled={
        props.disabled === null || props.disabled === undefined
          ? isLoading
          : props.disabled
      }
    >
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
      {!isLoading && children}
    </Button>
  );
}
