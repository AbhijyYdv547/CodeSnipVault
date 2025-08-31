"use client";

import { parseAsInteger, useQueryState } from "nuqs";
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
    const [perPage, setPerPage] = useQueryState(
        "perPage",
        parseAsInteger.withDefault(0),
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setTimeout(()=>{
            refetchSnippets()
        },300)
    }

    const handlePerPageChange = (value: number) => {
        setPerPage(value)
        setTimeout(()=>{
            refetchSnippets()
        },300)
    }

    return (
        <div className="flex justify-between">
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
                value={perPage.toString()}
                onValueChange={(value)=> handlePerPageChange(Number(value))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Per Page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
    );
}