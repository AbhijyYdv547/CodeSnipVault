"use client";

import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";

import { Switch } from "@/components/ui/switch";
import { languages } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import axios from "@/lib/axios";

const formSchema = z.object({
  Title: z.string().min(1),
  Language: z.string(),
  Tags: z.array(z.string()).min(1, {
    error: "Please select at least one item",
  }),
  Code: z.string(),
  Public: z.boolean(),
});

interface Snippet {
  ID: string;
  Title: string;
  Code: string;
  Language: string;
  Tags: string[];
  Public: boolean;
  ShareId: string;
  CreatedAt: string;
  UpdatedAt: string;
  UserID: string;
}

interface SnippetCardProps {
  snippet: Snippet;
}

const UpdateSnippet = ({ snippet }: SnippetCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: snippet.Title,
      Language: snippet.Language,
      Tags: snippet.Tags,
      Code: snippet.Code,
      Public: snippet.Public,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("form submitted:", values);
      console.log("id:", snippet.ID);
      const res = await axios.put(`/v1/snippets/${snippet.ID}`, {
        Title: values.Title,
        Language: values.Language,
        Tags: values.Tags,
        Code: values.Code,
        Public: values.Public,
      });
      if (!res) {
        toast.error("Failed to update form. Please try again.");
        return;
      }
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to update the snippet. Please try again.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <BookOpen className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl">
          <DialogHeader>
            <DialogTitle>{snippet.Title}</DialogTitle>
            <DialogDescription>
              Make changes to your snippet here or . Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder={snippet.Title} type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the code snippet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value,
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("Language", language.value, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language that is used in the snippet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your code tags.</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Enter your tags"
                    />
                  </FormControl>
                  <FormDescription>Add tags.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <CodeMirror
                      className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto overflow-x-auto"
                      value={field.value}
                      theme={dracula}
                      placeholder="Write your code here..."
                      height="500px"
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormDescription>Your snippet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Public or Private</FormLabel>
                    <FormDescription>
                      Make the snippet private or public i.e sharable.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving Changes.."
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </div>
  );
};

export default UpdateSnippet;
