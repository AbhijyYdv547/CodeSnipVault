import SnippetCard from "@/components/snippet-card";
import SnippetsFilter from "@/components/snippets-filter";
import SnippetsPagination from "@/components/snippets-pagination";
import DashboardLayout from "@/components/DashboardLayout";

export default async function DashboardPage() {
    
    return (
        <DashboardLayout>
        <div className="flex flex-col gap-10 justify-center max-w-6xl mx-auto">
            <h1>Your Code Snippets</h1>
            <SnippetsFilter  />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet} />
                ))}

            </div>
            <SnippetsPagination  />
        </div>
        </DashboardLayout>
    )
}
