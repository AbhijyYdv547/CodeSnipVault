"use client";

import { useSnippetStore } from "@/store/SnippetStore";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function SnippetsFilter() {

    const {search,setSearch,setTags,language,setLanguage} = useSnippetStore();

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
                    setTags(e.target.value.split(',').map((tag) => tag.trim()))
                }}
            />
            <Select
                value={language}
                onValueChange={(value) => setLanguage(value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="JS/TS">Javascript/Typescript</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="CPP">C++</SelectItem>
                    <SelectItem value="GO">Golang</SelectItem>
                    <SelectItem value="PY">Python</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                </SelectContent>
            </Select>

        </div>
    );
}