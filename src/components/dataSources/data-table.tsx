import type { SampleProduct } from "@/types/dataSource"

interface DataTableProps {
  products: SampleProduct[]
}

export function DataTable({ products }: DataTableProps) {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center">
            <span className="text-xs text-slate-400">📋</span>
          </div>
          <span className="text-sm text-slate-300">(name collection)</span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600">
            <span>🕒</span>
            Reset
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
            <span>⬇️</span>
            Import File
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-3 w-8">
                <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
              </th>
              <th className="text-left p-3 text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  id <span className="px-1.5 py-0.5 bg-teal-600 text-xs rounded">int</span>
                </div>
              </th>
              <th className="text-left p-3 text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  name <span className="px-1.5 py-0.5 bg-blue-600 text-xs rounded">text</span>
                </div>
              </th>
              <th className="text-left p-3 text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  price <span className="px-1.5 py-0.5 bg-orange-600 text-xs rounded">number</span>
                </div>
              </th>
              <th className="text-left p-3 text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  created_date <span className="px-1.5 py-0.5 bg-purple-600 text-xs rounded">date</span>
                </div>
              </th>
              <th className="w-8 p-3">
                <button className="text-slate-400 hover:text-white">+</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-750">
                <td className="p-3">
                  <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
                </td>
                <td className="p-3 text-white">{product.id}</td>
                <td className="p-3 text-white">{product.name}</td>
                <td className="p-3 text-white">{product.price}</td>
                <td className="p-3 text-white">{product.created_date}</td>
                <td className="p-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
          <span>1 of 1</span>
          <button className="p-1 hover:text-white">▶</button>
        </div>
        <div className="flex items-center gap-4">
          <span>records {products.length}</span>
          <button className="flex items-center gap-1 hover:text-white">
            <span>🔄</span>
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
