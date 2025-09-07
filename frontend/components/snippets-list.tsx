"use client";
import { fetchSnippets } from "@/lib/api";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SnippetCard from "./snippet-card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function SnippetList() {
    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [language, setLanguage] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        fetchSnippets({ page, search, tags, language })
            .then((data) => setSnippets(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [page, search, tags, language])


    return (
        <div>
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

            {loading ? (
                <p>Loading...</p>
            ) : (
                    (!snippets || snippets.length === 0) ? (
                        <p>No snippets available.</p>
                    ):(
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {snippets.map((snippet, index) => (
                                    <SnippetCard key={index} snippet={snippet} />
                                ))}
                            </div>
                    )

            )}

            <Pagination>
                <PaginationContent>
                    {page > 1 && (
                        <>
                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(page - 1)}
                                >
                                    <ChevronLeft className="size-4" /> Previous
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(page - 1)}
                                >
                                    {page - 1}
                                </Button>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem>
                        <Button
                            variant="outline"
                            disabled
                        >
                            {page}
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            onClick={() => setPage(page + 1)}
                        >
                            <ChevronRight className="size-4" /> Next
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}