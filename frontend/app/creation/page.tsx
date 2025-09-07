import DashboardLayout from "@/components/DashboardLayout";
import SnippetCreation from "@/components/snippet-creation";

export default function CreationPage() {
  return (
    <DashboardLayout>
      <div>
        <SnippetCreation />
      </div>
    </DashboardLayout>
  );
}
