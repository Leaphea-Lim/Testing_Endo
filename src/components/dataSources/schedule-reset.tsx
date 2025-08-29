

export function ScheduleReset() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Reset Schedule</h2>
        <p className="text-slate-400">Manage and view your reset schedule for this data source.</p>
      </div>

      {/* Current Info */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
        <div className="flex items-center gap-2 text-slate-300">
          <span>🕒</span>
          <span>(number of row) rows</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span>🕒</span>
          <span>Last updated: Aug-18-2025</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span>🕒</span>
          <span>Data Source : (collection or Table)</span>
        </div>
      </div>

      {/* Next Reset */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span>🕒</span>
            <span>Next Reset: Aug-25-2025 -- 00</span>
          </div>
          <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">weekly</span>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Frequency</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
            <option>Frequency</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Day</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
            <option>Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Time</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
            <option>Select time</option>
            <option>00:00</option>
            <option>12:00</option>
            <option>18:00</option>
          </select>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-400">
          <span>⚠️</span>
          <span>Reset will permanently delete all current data from this source.</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <span>✏️</span>
          Save
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <span>🗑️</span>
          Delete
        </button>
      </div>
    </div>
  )
}
