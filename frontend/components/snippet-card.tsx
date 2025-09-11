"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Share2Icon, Trash2 } from "lucide-react";
import { SnippetBadge } from "./snippet-badge";
import { Dialog } from "@/components/ui/dialog";
import UpdateSnippet from "./update-snippet";
import axios from "@/lib/axios";
import { toast } from "sonner";

interface Snippet {
  ID: string;
  Title: string;
  Code: string;
  Language: string;
  Tags: string[];
  CreatedAt: string;
  UpdatedAt: string;
  UserID: string;
}

interface SnippetCardProps {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  async function handleDelete() {
    try {
      const res = await axios.delete(`/v1/snippets/${snippet.ID}`);
      if (!res) {
        toast.error("Couldn't delete snippet. Please try again.");
        return;
      }
      toast.success("Snippet deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete snippet. Please try again.");
    }
  }

  return (
    <Card key={snippet.ID} className="flex flex-col justify-between">
      <CardHeader>
        <div>
          <CardTitle>{snippet.Title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription>{snippet.Code.slice(0, 80)}...</CardDescription>
        <SnippetBadge snippet={snippet} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <UpdateSnippet snippet={snippet} />
        </Dialog>
        <Button className="cursor-pointer">
          <Share2Icon className="size-4" />
        </Button>
        <Button
          className="cursor-pointer bg-red-300"
          onClick={() => handleDelete()}
        >
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
