"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function SnippetsPagination() {



    return (
        <Pagination>
            <PaginationContent>
                    <>
                        <PaginationItem>
                            <Button
                                variant="outline"
                                
                            >
                                <ChevronLeft className="size-4" /> Previous
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant="outline"
                            >
                            </Button>
                        </PaginationItem>
                    </>

                <PaginationItem>
                    <Button
                        variant="outline"
                        disabled
                    >

                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                    >
                        <ChevronRight className="size-4" /> Next
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}