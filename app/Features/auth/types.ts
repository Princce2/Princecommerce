import type { z } from "zod";
import type { registerSchema } from "~/features/auth/validation";
import type { loginSchema } from "~/features/auth/validation";

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;