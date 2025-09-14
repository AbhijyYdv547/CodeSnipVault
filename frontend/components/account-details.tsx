import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const AccoundDetails = () => {
  return (
    <div className="flex items-center justify-evenly md:flex-row flex-col gap-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>User name</CardTitle>
          <CardDescription>Account user</CardDescription>
          <CardAction>Upload</CardAction>
        </CardHeader>
        <CardContent>
          <div className="relative w-[200px] h-[200px]">
            <Image
              src="/bg-img.jpg"
              alt="photo"
              className="rounded-full object-cover"
              fill
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Username</Label>
                  <Input id="tabs-demo-username" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-email">Email</Label>
                  <Input id="tabs-demo-email" defaultValue="@peduarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-password">New password</Label>
                  <Input id="tabs-demo-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccoundDetails;
