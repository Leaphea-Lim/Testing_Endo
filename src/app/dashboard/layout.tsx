import UserHeader from "@/layouts/UserHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <UserHeader /> 
      <main className="flex-1  bg-slate-950">{children}</main>
    </div>
  );
}
