"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSnippetStore } from "@/store/SnippetStore";



export default function SnippetsPagination() {
    const {page,setPage} = useSnippetStore();
    return (
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
    );
}