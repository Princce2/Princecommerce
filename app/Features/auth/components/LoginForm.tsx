import { Form } from "react-router";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import type { SubmissionResult } from "@conform-to/react";
import { loginSchema } from "~/features/auth/validation";

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

type LoginFormProps = {
  lastResult?: SubmissionResult;
  isSubmitting?: boolean;
};

export default function LoginForm({
  lastResult,
  isSubmitting = false,
}: LoginFormProps) {
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: loginSchema }),
  });

  const errorCount = Object.values(fields).filter(
    (field) => field.errors && field.errors.length > 0,
  ).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>

          <CardDescription>Log in to your account to continue.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form
            {...getFormProps(form)}
            method="post"
            className="flex flex-col gap-5"
          >
            <div aria-live="polite" className="sr-only">
              {errorCount > 0 &&
                `There ${errorCount === 1 ? "is" : "are"} ${
                  errorCount === 1 ? "1 error" : `${errorCount} errors`
                } in this form.`}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.email.id}>Email</Label>

              <Input
                {...getInputProps(fields.email, { type: "text" })}
                key={fields.email.key}
                placeholder="Enter your email"
              />

              {form.errors && (
                <p
                  id={fields.email.errorId}
                  className="text-sm text-destructive"
                >
                  {form.errors}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.password.id}>Password</Label>

              <Input
                {...getInputProps(fields.password, { type: "password" })}
                key={fields.password.key}
                placeholder="Enter your password"
              />

              {form.errors && (
                <p
                  id={fields.password.errorId}
                  className="text-sm text-destructive"
                >
                  {form.errors}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
