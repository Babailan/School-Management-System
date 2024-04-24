import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook } from "lucide-react";
import SettingsAccountProfileTab from "./AccountTab";
import SettingsPasswordTab from "./SettingsPasswordTab";
import { getAuth } from "@/middleware";

export default async function SettingsPage() {
  const session = await getAuth();

  return (
    <div>
      <h1 className="font-bold text-2xl mb-2">Account Settings</h1>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account Profile</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="py-2">
          <h2 className="font-bold text-xl mb-2">Account Profile</h2>
          <SettingsAccountProfileTab data={session} />
        </TabsContent>
        <TabsContent value="password" className="py-2">
          <h2 className="font-bold text-xl mb-2">Change password</h2>
          <SettingsPasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
