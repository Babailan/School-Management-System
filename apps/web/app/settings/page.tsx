// import { GetAccountByIdAction } from "@/actions/account/get-account";
import { GetAccountInformationAction } from "@/actions/account/get-account";
import { Box } from "@radix-ui/themes";

export default async function SettingsPage() {
  const session = await GetAccountInformationAction();
  return <Box></Box>;
}
