import { headers } from "next/headers";

// check  if electron by header user-agent
export const isElectron = () => {
  const user_agent = headers().get("user-agent");
  return (
    user_agent?.includes("Electron") ||
    user_agent?.includes("electron") ||
    false
  );
};
