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
import { SnippetCardProps } from "@/types/snippet-type";

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const handleCopy = () => {
    if (snippet.Public == true) {
      const text = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/snippets/share/${snippet.ShareId}`;
      navigator.clipboard.writeText(text);
      toast.success("Share Link Copied");
    } else {
      toast.error("Not sharable snippet");
    }
  };

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
        {snippet.Public ? (
          <Button className="cursor-pointer" onClick={() => handleCopy()}>
            <Share2Icon className="size-4" />
          </Button>
        ) : null}

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
