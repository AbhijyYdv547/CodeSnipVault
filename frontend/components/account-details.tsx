"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProfileProps {
  username: string;
  email: string;
}

const formSchema = z.object({
  username: z.string().min(1),
  email: z.string(),
});

const AccountDetails = () => {
  const [profile, setProfile] = useState<ProfileProps>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put("/v1/user/update", {
        email: values.email,
        username: values.username,
      });
      toast("Profile updated successfully");
    } catch (err) {
      toast("Profile Data change failed. Please try again.");
    }
  }

  async function getProfileData() {
    const res = await axios.get("/v1/user/profile");
    setProfile(res.data);
    form.reset({
      username: res.data.username,
      email: res.data.email,
    });
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="flex items-center justify-evenly gap-4">
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
                  Make changes to your account here.
                </CardDescription>
              </CardHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="max-w-3xl px-5 flex flex-col gap-5"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={profile?.username}
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={profile?.email}
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-[50%]">
                    Change Information
                  </Button>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountDetails;
