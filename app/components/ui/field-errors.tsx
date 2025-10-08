import { type FieldMetadata } from "@conform-to/react";

interface FieldErrorsProps {
  field: FieldMetadata;
  className?: string;
}

interface FormErrorsProps {
  errors: string[] | undefined;
  className?: string;
}

interface ErrorMessageProps {
  errorMessage: string;
  className?: string;
}

export function FieldErrors({ field, className }: FieldErrorsProps) {
  return field.errors ? (
    field.errors.map((error) => (
      <ErrorMessage
        key={field.key}
        errorMessage={error}
        className={className}
      />
    ))
  ) : (
    <p>&nbsp;</p>
  );
}

export function FormErrors({ errors }: FormErrorsProps) {
  return errors?.length ? (
    errors.map((error) => <ErrorMessage key={error} errorMessage={error} />)
  ) : (
    <p>&nbsp;</p>
  );
}

function ErrorMessage({ errorMessage, className }: ErrorMessageProps) {
  return (
    <p className={`text-destructive mt-1 text-sm ${className}`}>
      {errorMessage}
    </p>
  );
}
