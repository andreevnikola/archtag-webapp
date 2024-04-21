import { ButtonTypes } from "@/lib/config";
import { FormEvent, useState } from "react";
import CustomFormButton from "./CustomFormButton";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";
import { ErrorComponent, Link } from "@tanstack/react-router";
import CustomInputField from "./CustomInputField";

export enum ButtonCustomizationType {
  CUSTOM_TEXT = "CUSTOM_TEXT",
  CUSTOM_TEXT_AND_ICON = "CUSTOM_TEXT_AND_ICON",
  CUSTOM_BUTTON = "CUSTOM_BUTTON",
}

export interface ICustomTextSubmitButton extends ICustomSubmitButton {
  text: string;
}

export interface ICustomTextAndIconSubmitButton extends ICustomSubmitButton {
  icon: IconDefinition;
  text: string;
}

export interface ICustomButton {
  element: JSX.Element;
}

interface ICustomSubmitButton {
  size?: "sm" | "lg" | "full";
  variant?: ButtonTypes;
  className?: string;
}

export type CustomButton =
  | ICustomTextSubmitButton
  | ICustomButton
  | ICustomTextAndIconSubmitButton;

interface Error {
  message: string;
}

export interface Field {
  name: string;
  type: string;
  title: string;
  placeholder?: string;
  nonManditory?: boolean;
  validation?: (value: any) => boolean;
  errorMessage?: string;
  defaultValue?: any;
  transform?: (value: any) => any;
}

interface ILink {
  text: string;
  href: string;
}

export interface FieldGroup {
  name: string;
  fields: Field[];
}

interface CustomFormProps<ReturnType> {
  onSubmit: (data: ReturnType | null) => void;
  title?: string;
  submitButtonType: ButtonCustomizationType;
  submitButton: CustomButton;
  error?: Error;
  links?: ILink[];
  belowButtonContent?: JSX.Element;
  fields: Array<Field | FieldGroup>;
}

export function CustomForm<ReturnType>(props: CustomFormProps<ReturnType>) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState(new Map<string, string>());

  const addError = (instanceName: string) =>
    setErrors((map) => {
      const newMap = new Map(map);
      newMap.set(instanceName, "error");
      return newMap;
    });
  const removeError = (instanceName: string) =>
    setErrors((map) => {
      const newMap = new Map(map);
      newMap.delete(instanceName);
      return newMap;
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isSubmitted) setIsSubmitted(true);

    const formData = new FormData(e.target as HTMLFormElement);
    let data: any = {};
    props.fields.forEach((field) => {
      if (field.hasOwnProperty("fields")) {
        (field as FieldGroup).fields.forEach((subField) => {
          const value = formData.get(subField.name);
          if (value) {
            data[subField.name] = subField.transform
              ? subField.transform(value)
              : value;
          }
        });
      } else {
        field = field as Field;
        const value = formData.get(field.name);
        if (value) {
          data[field.name] = field.transform ? field.transform(value) : value;
        }
      }
    });
    props.onSubmit(Object.keys(data).length === 0 ? null : data);
  };

  return (
    <form
      onSubmit={(e: FormEvent) => handleSubmit(e)}
      className="flex flex-col gap-4 items-center justify-center w-full p-2"
    >
      {props.title && (
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
          {props.title}
        </h1>
      )}
      {props.error && (
        <p className="text-destructive p-3 rounded border border-border backdrop-brightness-75 dark:backdrop-brightness-125">
          {props.error.message}
        </p>
      )}

      {props.fields.map((field) => {
        if (field.hasOwnProperty("fields")) {
          return (
            <div className="flex gap-2 w-full" key={field.name}>
              {(field as FieldGroup).fields.map((subField) => (
                <CustomInputField
                  isSubmitted={isSubmitted}
                  key={subField.name}
                  field={subField}
                  addError={addError}
                  removeError={removeError}
                />
              ))}
            </div>
          );
        }
        return (
          <CustomInputField
            field={field as Field}
            key={field.name}
            isSubmitted={isSubmitted}
            addError={addError}
            removeError={removeError}
          />
        );
      })}

      <div className="-mt-2"></div>
      <CustomFormButton
        isDisabled={errors.size > 0}
        btnType={props.submitButtonType}
        btn={props.submitButton}
      />
      <div className="flex -mt-4 gap-1">
        {props.links &&
          props.links.map((link) => (
            <Link to={link.href} key={link.href}>
              <Button variant={"link"} key={link.text}>
                {link.text}
              </Button>
            </Link>
          ))}
      </div>
    </form>
  );
}
