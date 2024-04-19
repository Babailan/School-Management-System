import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default () => (
  <Tabs defaultValue="account" className="w-[400px]">
    <TabsList>
      <TabsTrigger value="token">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      <TabsTrigger value="account">Account</TabsTrigger>
    </TabsContent>
  </Tabs>
);
