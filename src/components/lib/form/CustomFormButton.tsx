import { Button } from "@/components/ui/button";
import {
  ButtonCustomizationType,
  CustomButton,
  ICustomButton,
  ICustomTextAndIconSubmitButton,
} from "./CustomForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomFormButton({
  btn,
  btnType,
  isDisabled,
}: {
  btn: CustomButton;
  btnType: ButtonCustomizationType;
  isDisabled: boolean;
}) {
  if (btnType === ButtonCustomizationType.CUSTOM_BUTTON)
    return (btn as ICustomButton).element;
  if (btnType === ButtonCustomizationType.CUSTOM_TEXT_AND_ICON) {
    const { icon, text, variant, size } = btn as ICustomTextAndIconSubmitButton;
    return (
      <Button
        disabled={isDisabled}
        variant={variant}
        className={
          size === "sm" || !size
            ? "flex gap-5 px-4 pr-8"
            : size === "lg"
              ? "flex gap-12 pl-4 pr-16"
              : "flex w-full justify-between gap-3 px-4"
        }
      >
        <FontAwesomeIcon icon={icon} />
        <div className="flex justify-center w-full">{text}</div>
      </Button>
    );
  }
  if (btnType === ButtonCustomizationType.CUSTOM_TEXT) {
    const { text, variant } = btn as ICustomTextAndIconSubmitButton;
    return (
      <Button disabled={isDisabled} variant={variant} type="submit">
        {text}
      </Button>
    );
  }

  return <></>;
}
