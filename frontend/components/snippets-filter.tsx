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

export default function SnippetsFilter() {
  const { search, setSearch, setTags, language, setLanguage } =
    useSnippetStore();

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search snippets"
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Input
        placeholder="Tags (comma seperated)"
        className="w-full"
        onBlur={(e) => {
          setTags(e.target.value.split(",").map((tag) => tag.trim()));
        }}
      />
      <Select value={language} onValueChange={(value) => setLanguage(value)}>
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
    </div>
  );
}
