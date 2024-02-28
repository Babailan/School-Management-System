import { withAuth } from "next-auth/middleware";
import { PagesOptions } from "./config/AuthOptions";

export default withAuth({
  pages: PagesOptions,
  callbacks: {
    authorized: ({ token }) => {
      if (token) return true;
      return false;
    },
  },
});

export const config = { matcher: ["/"] };
