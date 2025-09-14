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
import { useSnippetStore } from "@/store/SnippetStore";

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const { removeSnippets } = useSnippetStore();
  const handleCopy = () => {
    const text = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/share/?share_id=${snippet.share_id}`;
    navigator.clipboard.writeText(text);
    toast.success("Share Link Copied");
  };

  async function handleDelete() {
    try {
      await axios.delete(`/v1/snippets/${snippet.id}`);
      toast.success("Snippet deleted successfully!");
      removeSnippets(snippet.id);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete snippet. Please try again.");
    }
  }

  return (
    <Card key={snippet.id} className="flex flex-col justify-between">
      <CardHeader>
        <div>
          <CardTitle>{snippet.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription>{snippet.code.slice(0, 80)}...</CardDescription>
        <SnippetBadge snippet={snippet} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <UpdateSnippet snippet={snippet} />
        </Dialog>
        {snippet.public == true ? (
          <Button className="cursor-pointer" onClick={() => handleCopy()}>
            <Share2Icon className="size-4" />
          </Button>
        ) : null}

        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={() => handleDelete()}
        >
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
