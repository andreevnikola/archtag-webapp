import { Label } from "@/components/ui/label";
import { Field } from "./CustomForm";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function CustomInputField({
  field,
  value,
  onChange,
  onFileChange,
  isSubmitted,
  addError,
  removeError,
  defaultValue,
}: {
  field: Field;
  value: any;
  onChange: (name: string, value: any) => void;
  onFileChange: (name: string, files: FileList | null) => void;
  isSubmitted: boolean;
  addError: (instanceName: string) => void;
  removeError: (instanceName: string) => void;
  defaultValue?: any;
}) {
  const [inputValue, setInputValue] = useState(defaultValue || value || "");
  const [isValid, setIsValid] = useState(true);

  const isErrorForManditoryVisible =
    !inputValue && isSubmitted && !field.nonManditory;

  useEffect(() => {
    const transformedValue = field.transform ? field.transform(inputValue) : inputValue;
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
  }, [inputValue, isSubmitted]);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== inputValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (field.type === "file") {
      onFileChange(name, files);
    } else {
      const newValue = field.transform ? field.transform(value) : value;
      setInputValue(newValue);
      onChange(name, newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label htmlFor={field.name}>{field.title}</Label>
      <Input
        value={inputValue}
        onChange={handleChange}
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
