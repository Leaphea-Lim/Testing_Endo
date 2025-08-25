import Link from "next/link"

export default function DashboardHome() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Workspaces</h1>
      
      {/* Fake workspace link for now */}
      <ul className="space-y-2">
        <li>
          <Link 
            href="/dashboard/demo"
            className="text-blue-400 hover:underline"
          >
            Demo Workspace
          </Link>
        </li>
      </ul>
      
      <p className="mt-6 text-slate-400 text-sm">
        Later, this will list real workspaces from your database or API.
      </p>
    </div>
  )
}
