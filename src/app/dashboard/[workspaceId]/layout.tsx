import { Sidebar } from "@/components/sidebar/sidebarComponent";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Sidebar pinned on the left */}
      <aside className="sticky top-14 w-64">
        <Sidebar workspaceId={params.workspaceId} />
      </aside>

      {/* Main content scrolls */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
