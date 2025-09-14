"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PublicShare {
  Title: string;
  Language: string;
  Tags: string[];
  Code: string;
}

const ShareCard = () => {
  const [snippetData, setSnippetData] = useState<PublicShare>();

  async function getSharedSnippet() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("share_id")) {
        const share_id = searchParams.get("share_id");
        const res = await axios(`/v1/snippets/share/${share_id}`);
        setSnippetData(res.data);
      }
    } catch (e) {
      toast.error("Some error happened");
      console.log(e);
    }
  }

  useEffect(() => {
    getSharedSnippet();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{snippetData?.Title}</CardTitle>
        <CardDescription>{snippetData?.Language}</CardDescription>
        <CardAction>
          {snippetData?.Tags?.map((tag) => (
            <span key={tag} className="mr-2 px-2 py-1 bg-muted rounded">
              #{tag}
            </span>
          ))}
        </CardAction>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap bg-muted p-4 rounded text-sm overflow-auto">
          <code>{snippetData?.Code}</code>
        </pre>
      </CardContent>
      <CardFooter>
        <p>Shared from CodeSnippetVault</p>
      </CardFooter>
    </Card>
  );
};

export default ShareCard;
