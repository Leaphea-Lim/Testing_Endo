import type { ActivityLog } from "@/types/dataSource"

interface ActivityLogsProps {
  logs: ActivityLog[]
}

export function ActivityLogs({ logs }: ActivityLogsProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "IMPORT":
        return "bg-teal-600"
      case "DELETE":
        return "bg-red-600"
      case "CREATE":
        return "bg-green-600"
      case "UPDATE":
        return "bg-orange-600"
      default:
        return "bg-slate-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Activity Logs</h2>
          <p className="text-slate-400">Track all changes and events in your data source</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600">
            <span>🕒</span>
            All Events
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600">
            <span>📅</span>
            Last 7 days ▼
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{log.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{log.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">👤 {log.user}</span>
                  <span className={`px-2 py-1 rounded text-xs text-white ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </div>
              </div>
              <span className="text-slate-400 text-sm">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
