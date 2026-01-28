export default function DashboardLoading() {
  return (
    <section className="max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-gray-300 rounded" />
        <div className="h-4 w-72 bg-gray-200 rounded" />
      </div>

      {/* Stats skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4"
          >
            <div className="h-14 w-14 bg-gray-300 rounded-lg" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-6 w-16 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent jobs skeleton */}
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="h-6 w-40 bg-gray-300 rounded" />
        </div>

        <ul className="divide-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="p-6 flex justify-between items-center">
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-10 bg-gray-300 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
