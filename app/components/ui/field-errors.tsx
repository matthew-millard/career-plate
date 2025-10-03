import { type FieldMetadata } from "@conform-to/react";

interface FieldErrorsProps {
  field: FieldMetadata;
}

interface FormErrorsProps {
  errors: string[] | undefined;
}

export function FieldErrors({ field }: FieldErrorsProps) {
  return field.errors ? (
    field.errors.map((error) => (
      <ErrorMessage key={field.key} errorMessage={error} />
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

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <p className="text-destructive mt-1 text-sm">{errorMessage}</p>;
}
