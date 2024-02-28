import type { PagesOptions } from "next-auth";

const PagesOptions: Partial<PagesOptions> = {
  signIn: "/login",
  signOut: "/login",
};
export { PagesOptions };
