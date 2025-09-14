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
import { Snippet } from "@/types/snippet-type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ShareCard = () => {
  const [snippetData, setSnippetData] = useState<Snippet>();

  async function getSharedSnippet() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("shareId")) {
        const shareId = searchParams.get("shareId");
        const res = await axios(`/snippets/share/${shareId}`);
        if (!res) {
          toast.error("Some error happened");
        } else {
          setSnippetData(res.data);
        }
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
        <CardTitle>{snippetData?.title}</CardTitle>
        <CardDescription>{snippetData?.language}</CardDescription>
        <CardAction>{snippetData?.tags}</CardAction>
      </CardHeader>
      <CardContent>
        <p>{snippetData?.code}</p>
      </CardContent>
      <CardFooter>
        <p>Shared from CodeSnippetVault</p>
      </CardFooter>
    </Card>
  );
};

export default ShareCard;
