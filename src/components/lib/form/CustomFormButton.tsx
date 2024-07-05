import { Button } from "@/components/ui/button";
import {
  ButtonCustomizationType,
  CustomButton,
  ICustomButton,
  ICustomTextAndIconSubmitButton,
} from "./CustomForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function CustomFormButton({
  btn,
  btnType,
  isDisabled,
  isLoading,
  customStyle,
}: {
  btn: CustomButton;
  btnType: ButtonCustomizationType;
  isDisabled: boolean;
  isLoading: boolean;
  customStyle?: any;
}) {
  if (btnType === ButtonCustomizationType.CUSTOM_BUTTON)
    return (btn as ICustomButton).element;
  if (btnType === ButtonCustomizationType.CUSTOM_TEXT_AND_ICON) {
    const { icon, text, variant, size } = btn as ICustomTextAndIconSubmitButton;
    return (
      <Button
        disabled={isDisabled || isLoading}
        variant={variant}
        style={customStyle}
        className={
          size === "sm" || !size
            ? "flex gap-5 px-4 pr-8"
            : size === "lg"
              ? "flex gap-12 pl-4 pr-16"
              : "flex w-full justify-between gap-3 px-4 "
        }
      >
        <FontAwesomeIcon icon={icon} />
        <div className="flex justify-center w-full items-center">
          {isLoading && (
            <ReloadIcon className="mr-2 h-3.5 w-3.5 animate-spin" />
          )}
          {text}
        </div>
      </Button>
    );
  }
  if (btnType === ButtonCustomizationType.CUSTOM_TEXT) {
    const { text, variant } = btn as ICustomTextAndIconSubmitButton;
    return (
      <Button
        disabled={isDisabled || isLoading}
        variant={variant}
        type="submit"
        style={customStyle}
      >
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {text}
      </Button>
    );
  }

  return <></>;
}
