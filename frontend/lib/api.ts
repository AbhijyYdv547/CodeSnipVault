import axios from "@/lib/axios";

interface fetchSnippetsProps {
  page?: number;
  search?: string;
  tags?: string[];
  language?: string;
}

export async function fetchSnippets({
  page = 1,
  search = "",
  tags = [],
  language = "",
}: fetchSnippetsProps) {
  const query = new URLSearchParams();

  query.append("page", page.toString());
  if (search) query.append("search", search);
  if (tags.length > 0) query.append("tags", tags.join(","));
  if (language) query.append("language", language);

  const res = await axios.get(`/v1/snippets/?${query.toString()}`);
  console.log(res);
  if (!res) {
    throw new Error("Failed to fetch snippets");
  }
  return res;
}
