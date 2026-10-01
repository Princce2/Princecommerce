import type { z } from "zod";
import type { registerSchema } from "./validation";
import type { loginSchema } from "./validation";

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;