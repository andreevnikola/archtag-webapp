import { Label } from "@/components/ui/label";
import { Field } from "./CustomForm";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function CustomInputField({
  field,
  value,
  onChange,
  isSubmitted,
  addError,
  removeError,
}: {
  field: Field;
  value: string;
  onChange: (name: string, value: string) => void;
  isSubmitted: boolean;
  addError: (instanceName: string) => void;
  removeError: (instanceName: string) => void;
}) {
  const [isValid, setIsValid] = useState(true);

  const isErrorForManditoryVisible =
    !value && isSubmitted && !field.nonManditory;

  useEffect(() => {
    const transformedValue = field.transform ? field.transform(value) : value;
    const isFieldWithCurrentInformationInvalid =
      (field.validation && !field.validation(transformedValue)) ||
      isErrorForManditoryVisible;
    if (isFieldWithCurrentInformationInvalid && isValid) {
      setIsValid(false);
      addError(field.name);
    }

    if (!isFieldWithCurrentInformationInvalid && !isValid) {
      removeError(field.name);
      setIsValid(true);
    }
  }, [value, isSubmitted]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label htmlFor={field.name}>{field.title}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        type={field.type}
        name={field.name}
        id={field.name}
        autoComplete={field.name}
        placeholder={field.placeholder}
      />
      {!isValid && isSubmitted && !isErrorForManditoryVisible && (
        <p className="text-destructive -mt-1.5">{field.errorMessage}</p>
      )}

      {isErrorForManditoryVisible && isSubmitted && (
        <p className="text-destructive -mt-1.5">Полето е задължително!</p>
      )}
    </div>
  );
}
