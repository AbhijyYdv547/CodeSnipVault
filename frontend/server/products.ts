"use server";

import { Product } from "@/components/shared/types"

interface GetProductParams{
    search: string,
    perPage?: number
}

export async function getProducts({search,perPage}:GetProductParams): Promise<Product[]>{
    const res = await fetch(`https://api.escuelajs.co/api/v1/products?title=${search}&offset=0&limit=${perPage}`);
    const data = await res.json();
    return data;

}