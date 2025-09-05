"use client";

import { useQueryState } from "nuqs";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ProductsFilterProps{
    refetchSnippets: () => Promise<void>
}

export default function SnippetsFilter({refetchSnippets}:ProductsFilterProps) {
    const [search, setSearch] = useQueryState("search", {
        defaultValue:"",
    })
    const [language, setLanguage] = useQueryState(
        "language",
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setTimeout(()=>{
            refetchSnippets()
        },200)
    }

    const handleLanguageChange = (value: string) => {
        setLanguage(value)
        setTimeout(()=>{
            refetchSnippets()
        },200)
    }

    return (
        <div>
            <div>
            <Input 
                placeholder="Search" 
                className="w-full" 
                value={search}
                onChange={(e)=>handleSearch(e.target.value)}
            />
            </div>
            <div>
            <Select
                value={language!.toString()}
                onValueChange={(value)=> handleLanguageChange(value)}
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
        </div>
    );
}