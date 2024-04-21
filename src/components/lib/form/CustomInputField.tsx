import { Label } from "@/components/ui/label";
import { Field } from "./CustomForm";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function CustomInputField({
  field,
  isSubmitted,
  addError,
  removeError,
}: {
  field: Field;
  isSubmitted: boolean;
  addError: (instanceName: string) => void;
  removeError: (instanceName: string) => void;
}) {
  const [value, setValue] = useState(field.defaultValue || "");
  const [isValid, setIsValid] = useState(true);

  const isErrorForManditoryVisible =
    !value && isSubmitted && !field.nonManditory;

  useEffect(() => {
    const transformedValue = field.transform ? field.transform(value) : value;
    if (
      ((field.validation && !field.validation(transformedValue)) ||
        isErrorForManditoryVisible) &&
      isSubmitted
    ) {
      if (isValid) {
        setIsValid(false);
        addError(field.name);
      }
    } else if (!isValid) {
      removeError(field.name);
      setIsValid(true);
    }
  }, [value, isSubmitted]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label htmlFor={field.name}>{field.title}</Label>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={field.type}
        name={field.name}
        id={field.name}
        autoComplete={field.name}
        placeholder={field.placeholder}
      />
      {!isValid && !isErrorForManditoryVisible && (
        <p className="text-destructive -mt-1.5">{field.errorMessage}</p>
      )}

      {isErrorForManditoryVisible && (
        <p className="text-destructive -mt-1.5">Полето е задължително!</p>
      )}
    </div>
  );
}
