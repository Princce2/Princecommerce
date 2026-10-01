
import { useNavigation } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/login";
import { loginSchema } from "~/Features/auth/validation";
import LoginForm from "~/Features/auth/components/LoginForm";
import { getUserByEmail, verifyPassword } from "~/Features/auth/services/auth.server";
import { createUserSession } from "~/Features/auth/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const user = await getUserByEmail(submission.value.email);
  const passwordIsCorrect = 
    user && verifyPassword(submission.value.password, user.passwordHash);

    if (!user || !passwordIsCorrect) {
      return submission.reply({
        formErrors: ["Invalid email or password"],
      });
    }

  return createUserSession(user.id, "/dashboard");
}

export default function Login({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const lastResult =
    actionData && "status" in actionData ? actionData : undefined;
  const success =
    actionData && "success" in actionData ? actionData : undefined;

  return (
    <div>
      <LoginForm lastResult={lastResult} isSubmitting={isSubmitting} />
    </div>
  );
}
