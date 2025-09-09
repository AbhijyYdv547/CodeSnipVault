"use client";

import { useSnippetStore } from "@/store/SnippetStore";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SnippetsFilter() {
  const { setSearch, setTags, setLanguage, setPage } = useSnippetStore();

  const [localSearch, setLocalSearch] = useState("");
  const [localTags, setLocalTags] = useState("");
  const [localLanguage, setLocalLanguage] = useState("");

  const handleSearch = () => {
    setPage(1);
    setSearch(localSearch.trim());
    setTags(
      localTags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0),
    );
    setLanguage(localLanguage);
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search snippets"
        className="w-full"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />

      <Input
        placeholder="Tags (comma separated)"
        className="w-full md:w-auto"
        value={localTags}
        onChange={(e) => setLocalTags(e.target.value)}
      />

      <Select
        value={localLanguage}
        onValueChange={(value) => setLocalLanguage(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language, index) => (
            <SelectItem value={language.value} key={index}>
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
