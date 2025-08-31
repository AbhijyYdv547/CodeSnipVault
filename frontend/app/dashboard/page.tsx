import SnippetCard from "@/components/snippet-card";
import SnippetsFilter from "@/components/snippets-filter";
import { getSnippets } from "@/server/products"
import { loadSearchParams } from '@/components/search-params'
import type { SearchParams } from 'nuqs/server'
import { revalidateTag } from "next/cache";
import SnippetsPagination from "@/components/snippets-pagination";
// import DashboardLayout from "@/components/DashboardLayout";

type PageProps = {
    searchParams: Promise<SearchParams>
}




export default async function DashoboardPage({ searchParams }: PageProps) {
    const { search, perPage, offset } = await loadSearchParams(searchParams)

    const transformedOffset = (offset - 1) * perPage;

    const snippets = await getSnippets({ search, perPage, offset: transformedOffset });

    async function refetchSnippets() {
        "use server"

        revalidateTag("snippets")
    }

    return (
        <div className="flex flex-col gap-10 justify-center max-w-6xl mx-auto py-10">
            <h1>Awesome Products</h1>

            <SnippetsFilter refetchSnippets={refetchSnippets} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet} />
                ))}

            </div>
            <SnippetsPagination refetchSnippets={refetchSnippets} />
        </div>

    )
}
