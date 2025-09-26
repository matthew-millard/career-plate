import { type FieldMetadata } from "@conform-to/react";

interface FieldErrorProps {
  field: FieldMetadata;
}

export function FieldErrors({ field }: FieldErrorProps) {
  return field.errors ? (
    field.errors.map((error) => (
      <ErrorMessage key={field.key} errorMessage={error} />
    ))
  ) : (
    <p>&nbsp;</p>
  );
}

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <p className="text-destructive mt-1 text-sm">{errorMessage}</p>;
}
