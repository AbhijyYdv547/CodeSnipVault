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
import { Share2Icon } from "lucide-react";
import { SnippetBadge } from "./snippet-badge";
import { Dialog } from "@/components/ui/dialog";
import UpdateSnippet from "./update-snippet";

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
        <Button className="cursor-pointer">
          <Share2Icon className="size-4" />
        </Button>
        <Dialog>
          <UpdateSnippet snippet={snippet} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
