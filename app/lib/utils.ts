import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskEmail(email: string) {
  const EmailSchema = z.email();

  try {
    EmailSchema.parse(email);
    const [username, domain] = email.split("@");

    const getMask = (str: string) => {
      const lengthOfStr = str.length;

      if (lengthOfStr <= 1) {
        return str;
      }

      return str.charAt(0) + "***" + str.charAt(lengthOfStr - 1);
    };

    const maskedUsername = getMask(username);
    const maskedEmail = `${maskedUsername}@${domain}`;

    return maskedEmail.toLowerCase();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return null;
    }
  }
}

export function getUserInitials(firstName: string, lastName: string) {
  return firstName.charAt(0) + lastName.charAt(0);
}
