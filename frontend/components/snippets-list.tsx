"use client";
import { useEffect } from "react";
import SnippetCard from "./snippet-card";
import { useSnippetStore } from "@/store/SnippetStore";
import SnippetsFilter from "./snippets-filter";
import SnippetsPagination from "./snippets-pagination";

export default function SnippetList() {
  const { loading, snippets, fetchSnippets } = useSnippetStore();

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

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
