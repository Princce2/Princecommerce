import type { Route } from "./+types/logout";
import { logout } from "~/features/auth/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  return logout(request);
}

export async function loader({ request }: Route.LoaderArgs) {
  return logout(request);
}
