import { Sidebar } from "@/components/sidebar/sidebarComponent";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar pinned on the left */}
      <aside className="sticky h-[calc(100vh-3.5rem)] w-64">
        <Sidebar workspaceId={params.workspaceId} />
      </aside>

      {/* Main content area (scrollable) */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
// import UserHeader from "@/layouts/UserHeader";
// import { Sidebar } from "@/components/sidebar/sidebarComponent";

// export default function WorkspaceLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { workspaceId: string };
// }) {
//   return (
//     <div className="flex flex-col h-screen">
//       <UserHeader /> {/* Logged-in navbar */}

//       <div className="flex flex-1">
//         <Sidebar workspaceId={params.workspaceId} />
//         <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
