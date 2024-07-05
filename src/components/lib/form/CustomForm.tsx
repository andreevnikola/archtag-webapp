import { ButtonTypes } from "@/lib/config";
import { FormEvent, useState, useEffect } from "react";
import CustomFormButton from "./CustomFormButton";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";
//@ts-ignore
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
  customStyle?: any;
}

interface ICustomSubmitButton {
  size?: "sm" | "lg" | "full";
  variant?: ButtonTypes;
  customStyle?: any;
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
  onSubmit: (data: ReturnType) => void;
  title?: string;
  submitButtonType: ButtonCustomizationType;
  submitButton: CustomButton;
  error?: Error;
  links?: ILink[];
  belowButtonContent?: JSX.Element;
  fields: Array<Field | FieldGroup>;
  isLoading: boolean;
  initialData?: Partial<ReturnType>;
}

export function CustomForm<ReturnType>(props: CustomFormProps<ReturnType>) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState(new Map<string, string>());
  const [formData, setFormData] = useState<Partial<ReturnType>>({});

  useEffect(() => {
    if (props.initialData) {
      setFormData(props.initialData);
    }
  }, [props.initialData]);

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

  const handleChange = (name: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (name: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isSubmitted) setIsSubmitted(true);

    if (Object.keys(formData).length !== 0)
      props.onSubmit(formData as ReturnType);
  };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        if (errors.size < 1) handleSubmit(e);
        else {
          e.preventDefault();
          setIsSubmitted(true);
        }
      }}
      className="flex flex-col gap-4 items-center justify-center w-full p-2"
      encType="multipart/form-data"
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
                  //@ts-ignore
                  value={formData[subField.name] || ""}
                  onChange={handleChange}
                  onFileChange={handleFileChange}
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
            //@ts-ignore
            value={formData[(field as Field).name] || ""}
            onChange={handleChange}
            onFileChange={handleFileChange}
          />
        );
      })}

      <div className="-mt-2"></div>
      <CustomFormButton
        isDisabled={errors.size > 0 && isSubmitted}
        isLoading={props.isLoading}
        btnType={props.submitButtonType}
        btn={props.submitButton}
        customStyle={props.submitButton.customStyle || ""}
      />
      <div className="flex gap-0 max-sm:flex-col -mt-1 flex-row justify-center items-center">
        {props.links &&
          props.links.map((link) => (
            <Link to={link.href} className="-mt-2" key={link.href}>
              <Button variant={"link"} key={link.text}>
                {link.text}
              </Button>
            </Link>
          ))}
      </div>
    </form>
  );
}
