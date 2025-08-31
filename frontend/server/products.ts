"use server";

import { Snippet } from "@/components/shared/types"
import { unstable_cache } from "next/cache";

interface GetProductParams{
    search ?: string,
    perPage ?: number
}

export const getSnippets = unstable_cache( async (params: GetProductParams) : Promise<Snippet> => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products?title=${params.search}&offset=0&limit=${params.perPage}`);
    const data = await res.json();
    return data;
},["snippets"], {
    tags: ["snippets"],
});
