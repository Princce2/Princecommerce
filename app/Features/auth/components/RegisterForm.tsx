import { Form } from "react-router";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import type { SubmissionResult } from "@conform-to/react";
import { registerSchema } from "~/Features/auth/validation";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { 
  Card,
  CardContent,
  CardDescription, 
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type RegisterFormProps = {
  lastResult: SubmissionResult | null;
  isSubmitting: boolean;
};

export default function RegisterForm({
  lastResult,
  isSubmitting = false,
}: RegisterFormProps) {
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: registerSchema }),
  });

  const errorCount = Object.values(fields).filter(
    (field) => field.errors && field.errors.length > 0,
  ).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 px-4 ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription className="text-center font-bold text-lg">
            CREATE AN ACCOUNT
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form
            {...getFormProps(form)}
            method="post"
            className="flex flex-col gap-5"
          >
            <h1 className="flex justify-center">Register</h1>

            <div aria-live="polite" className="sr-only">
              {errorCount > 0 &&
                `There ${errorCount === 1 ? "is" : "are"} ${errorCount} error${
                  errorCount === 1 ? "" : "s"
                } in this form.`}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                {...getInputProps(fields.name, { type: "text" })}
                key={fields.name.key}
                className="border border-gray-300 px-4 rounded"
              />
              {fields.name.errors && (
                <p id={fields.name.errorId}>{fields.name.errors}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                {...getInputProps(fields.email, { type: "text" })}
                key={fields.email.key}
                className="border border-gray-300 px-4 rounded"
              />
              {fields.email.errors && (
                <p id={fields.email.errorId}>{fields.email.errors}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.password.id}>Password:</Label>
              <Input
                {...getInputProps(fields.password, { type: "password" })}
                key={fields.password.key}
                className="border border-gray-300 px-4 rounded"
              />
              {fields.password.errors && (
                <p
                  id={fields.password.errorId}
                  className="mt-1 text-sm text-red-600"
                >
                  {fields.password.errors}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.confirmPassword.id}>
                Confirm Password:
              </Label>
              <Input
                {...getInputProps(fields.confirmPassword, { type: "password" })}
                key={fields.confirmPassword.key}
                className="border border-gray-300 px-4 rounded"
              />
              {fields.confirmPassword.errors && (
                <p
                  id={fields.confirmPassword.errorId}
                  className="mt-1 text-sm text-red-600"
                >
                  {fields.confirmPassword.errors}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Register"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
