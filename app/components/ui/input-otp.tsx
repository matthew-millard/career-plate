import { SetStateAction, forwardRef } from "react";

interface InputOTPSlotProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: React.Dispatch<
    SetStateAction<{
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
    }>
  >;
  index: number;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const InputOTPSlot = forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ setValue, index, value, className, inputRefs, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;

      // Update the value
      setValue((prev) => ({ ...prev, [index]: inputValue }));

      // Move to next input if value is entered and not the last input
      if (inputValue && index < 4) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle backspace - move to previous input if current is empty
      if (e.key === "Backspace" && !value && index > 0) {
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        className={`aria-[invalid]:ring-destructive h-12 w-12 rounded-md border bg-transparent text-center font-mono text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        maxLength={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);

InputOTPSlot.displayName = "InputOTPSlot";
