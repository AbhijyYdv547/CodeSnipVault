import { Badge } from "@/components/ui/badge";
import { SnippetCardProps } from "@/types/snippet-type";

export function SnippetBadge({ snippet }: SnippetCardProps) {
  const arr = snippet.tags;
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
