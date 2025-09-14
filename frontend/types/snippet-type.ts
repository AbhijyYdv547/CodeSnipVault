export interface Snippet {
  ID: string;
  Title: string;
  Code: string;
  Language: string;
  Tags: string[];
  Public: boolean;
  ShareID: string;
  CreatedAt: string;
  UpdatedAt: string;
  UserID: string;
}

export interface SnippetCardProps {
  snippet: Snippet;
}
