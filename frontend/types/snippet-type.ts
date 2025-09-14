export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  public: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  share_id: string;
}

export interface SnippetCardProps {
  snippet: Snippet;
}
