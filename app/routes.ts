import {
  type RouteConfig,
  type RouteConfigEntry,
  index,
  prefix,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("about", "about.tsx"),
  route("register", "register.tsx"),
  route("login", "login.tsx"),
  route("logout", "logout.tsx"),

  // shared info page for all footer links
  route("info/*", "routes/info.tsx"),

  ...prefix("concerts", [
    layout("concerts/layout.tsx", [
      index("concerts/home.tsx"),
      route("trending", "concerts/trending.tsx"),
      route(":city", "concerts/city.tsx"),
    ]),
  ]),

  ...prefix("dashboard", [
    layout("dashboard/layout.tsx", [
      index("dashboard/home.tsx"),
      route("settings", "dashboard/settings.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
