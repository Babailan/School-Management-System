import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook } from "lucide-react";
import SettingsAccountProfileTab from "./AccountTab";
import SettingsPasswordTab from "./SettingsPasswordTab";
import { getAuth } from "@/middleware";

export default async function SettingsPage() {
  const session = await getAuth();

  return (
    <div className="p-10 ">
      <h1 className="font-bold text-2xl">Account Settings</h1>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="connection">Third Party Connection</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="py-2">
          <h2 className="font-bold text-xl mb-2">Account Profile</h2>
          <SettingsAccountProfileTab data={session} />
        </TabsContent>
        <TabsContent value="password" className="py-2">
          <h2 className="font-bold text-xl mb-2">Change password</h2>
          <SettingsPasswordTab />
        </TabsContent>
        <TabsContent value="connection" className="py-2">
          <h2 className="font-bold text-xl mb-2">Connection</h2>
          <Button className="gap-2" size="sm">
            <Facebook className="h-4 w-4" />
            Connect to Facebook
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
