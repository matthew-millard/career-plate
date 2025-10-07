import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";
import { useRef, useState } from "react";
import { z } from "zod";
import { validateRequest } from "~/.server/verification";
import { Button, InputOTPSlot } from "~/components/ui";
import { maskEmail } from "~/lib/utils";

export const TYPES = ["sign-up"] as const; // add more types of verification here
const VerficationTypeSchema = z.enum(TYPES);
export const TYPE_QUERY_PARAM = "type";
export const TARGET_QUERY_PARAM = "target";
export const CODE_QUERY_PARAM = "code";
export const REDIRECT_TO_QUERY_PARAM = "redirectTo";

export const VerifySchema = z.object({
  [CODE_QUERY_PARAM]: z.string().min(5).max(5),
  [TYPE_QUERY_PARAM]: VerficationTypeSchema,
  [TARGET_QUERY_PARAM]: z.string(),
  [REDIRECT_TO_QUERY_PARAM]: z.string().optional(),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;

  // If the user clicks the magic link
  if (!params.has(CODE_QUERY_PARAM)) {
    return null;
  }

  return validateRequest(request, params);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  return validateRequest(request, formData);
}

export default function VerifyRoute() {
  const [searchParams] = useSearchParams();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [value, setValue] = useState(() => {
    return {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    };
  });

  const [form, fields] = useForm({
    id: "verify-form",
    constraint: getZodConstraint(VerifySchema),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onSubmit",
    defaultValue: {
      [TARGET_QUERY_PARAM]: searchParams.get(TARGET_QUERY_PARAM) ?? "",
      [TYPE_QUERY_PARAM]: searchParams.get(TYPE_QUERY_PARAM) ?? "",
      [REDIRECT_TO_QUERY_PARAM]:
        searchParams.get(REDIRECT_TO_QUERY_PARAM) ?? "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: VerifySchema });
    },
  });

  const maskedEmail = maskEmail(searchParams.get(TARGET_QUERY_PARAM) ?? "");

  // Combine all input values into a single string
  const otpValue = Object.values(value).join("");
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="max-w-md rounded-2xl border bg-card p-12">
        <div>
          <h2 className="text-2xl/9 font-bold tracking-tight">
            {`Enter the 5 digit code that we sent to you at ${maskedEmail}`}
          </h2>
        </div>
        <Form {...getFormProps(form)} method="POST" className="space-y-3">
          <input
            {...getInputProps(fields[TARGET_QUERY_PARAM], { type: "hidden" })}
          />
          <input
            {...getInputProps(fields[TYPE_QUERY_PARAM], { type: "hidden" })}
          />
          <input
            {...getInputProps(fields[REDIRECT_TO_QUERY_PARAM], {
              type: "hidden",
            })}
          />
          <input
            value={otpValue}
            {...getInputProps(fields[CODE_QUERY_PARAM], {
              type: "hidden",
            })}
          />

          <div className="flex justify-between">
            <InputOTPSlot
              ref={(el) => (inputRefs.current[0] = el)}
              value={value[0]}
              setValue={setValue}
              index={0}
              inputRefs={inputRefs}
            />
            <InputOTPSlot
              ref={(el) => (inputRefs.current[1] = el)}
              value={value[1]}
              setValue={setValue}
              index={1}
              inputRefs={inputRefs}
            />
            <InputOTPSlot
              ref={(el) => (inputRefs.current[2] = el)}
              value={value[2]}
              setValue={setValue}
              index={2}
              inputRefs={inputRefs}
            />
            <InputOTPSlot
              ref={(el) => (inputRefs.current[3] = el)}
              value={value[3]}
              setValue={setValue}
              index={3}
              inputRefs={inputRefs}
            />
            <InputOTPSlot
              ref={(el) => (inputRefs.current[4] = el)}
              value={value[4]}
              setValue={setValue}
              index={4}
              inputRefs={inputRefs}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
