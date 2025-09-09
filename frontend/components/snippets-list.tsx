"use client";
import { fetchSnippets } from "@/lib/api";
import { useEffect, useState } from "react";
import SnippetCard from "./snippet-card";
import { useSnippetStore } from "@/store/SnippetStore";
import SnippetsFilter from "./snippets-filter";
import SnippetsPagination from "./snippets-pagination";

export default function SnippetList() {
  const [snippets, setSnippets] = useState([]);

  const { search, tags, language, page, loading, setLoading } =
    useSnippetStore();

  useEffect(() => {
    setLoading(true);
    fetchSnippets({ page, search, tags, language })
      .then((res) => {
        console.log(res.data.data);
        setSnippets(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, search, tags, language, setLoading]);

  return (
    <div className="flex gap-5 flex-col">
      <SnippetsFilter />
      {loading ? (
        <p>Loading...</p>
      ) : !snippets || snippets.length === 0 ? (
        <p>No snippets available.</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {snippets.map((snippet, index) => (
              <SnippetCard key={index} snippet={snippet} />
            ))}
          </div>
          <SnippetsPagination />
        </div>
      )}
    </div>
  );
}
