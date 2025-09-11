import { Badge } from "@/components/ui/badge";

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

export function SnippetBadge({ snippet }: SnippetCardProps) {
  const arr = snippet.Tags;
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {arr.map((tag, index) => (
        <div key={index} className="flex flex-wrap">
          <Badge>{tag}</Badge>
        </div>
      ))}
    </div>
  );
}
