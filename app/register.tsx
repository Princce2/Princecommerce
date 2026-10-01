import { redirect, useNavigation } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/register";
import { registerSchema } from "~/Features/auth/validation";
import { createUser, getUserByEmail } from "~/Features/auth/services/auth.server";
import RegisterForm from "~/Features/auth/components/RegisterForm";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: registerSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const existing = await getUserByEmail(submission.value.email);
  
  if (existing) {
    return submission.reply({
      fieldErrors: {email: ["An account with this email already exists"]},
    });
  }

  await createUser(submission.value);

  return redirect("/login");
}

export default function Register({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const lastResult = actionData && "status" in actionData ? actionData : undefined;

  
  return (
    <div>
      <RegisterForm lastResult={lastResult ?? null} isSubmitting={isSubmitting} />
    </div>
  );
}
