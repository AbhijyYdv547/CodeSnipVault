import DashboardLayout from "@/components/DashboardLayout";
import SnippetList from "@/components/snippets-list";

export default async function DashboardPage() {
    
    return (
        <DashboardLayout>
        <div className="flex flex-col gap-10 justify-center max-w-6xl mx-auto">
            <h1>Your Code Snippets</h1>
            <SnippetList/>
        </div>
        </DashboardLayout>
    )
}
