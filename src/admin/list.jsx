import { useState, useMemo, useEffect } from "react"
import { Search, User, Phone, Calendar, Stethoscope, FileText, Filter, X, ChevronDown, Loader2, AlertCircle } from "lucide-react"

const DOCTORS = ["All Doctors", "Dr. Anjali Mehta", "Dr. Rakesh Gupta", "Dr. Sneha Joshi", "Dr. Neha Kapoor"]

const doctorColors = {
  "Dr. Anjali Mehta":  { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  "Dr. Rakesh Gupta":  { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500" },
  "Dr. Sneha Joshi":   { bg: "bg-emerald-100", text: "text-emerald-700",dot: "bg-emerald-500" },
  "Dr. Neha Kapoor":   { bg: "bg-rose-100",    text: "text-rose-700",   dot: "bg-rose-500" },
}

export const List = () => {
  const [data, setData]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState("")

  const [search, setSearch]         = useState("")
  const [doctorFilter, setDoctor]   = useState("All Doctors")
  const [dateFrom, setDateFrom]     = useState("")
  const [dateTo, setDateTo]         = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Backend se data fetch karo
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError("")

      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${import.meta.env.VITE_SERVER}admin/read/appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.detail || "Records fetch nahi ho paye")
        }

        const result = await res.json()
        console.log("appointments", result)

        // agar backend seedha array deta hai to yehi kaafi hai,
        // agar {appointments: [...]} jaisa deta hai to result.appointments use karo
        setData(Array.isArray(result) ? result : result.appointments || [])
      } catch (err) {
        console.log("fetch appointments error:", err)
        setError(err.message || "Kuch masla ho gaya data load karte waqt.")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const filtered = useMemo(() => {
    return data.filter(r => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        r.name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.doctor?.toLowerCase().includes(q) ||
        r.number?.includes(q)
      const matchDoctor = doctorFilter === "All Doctors" || r.doctor === doctorFilter
      const matchFrom   = !dateFrom || r.date >= dateFrom
      const matchTo     = !dateTo   || r.date <= dateTo
      return matchSearch && matchDoctor && matchFrom && matchTo
    })
  }, [data, search, doctorFilter, dateFrom, dateTo])

  const clearFilters = () => {
    setSearch(""); setDoctor("All Doctors"); setDateFrom(""); setDateTo("")
  }

  const hasActiveFilter = search || doctorFilter !== "All Doctors" || dateFrom || dateTo

  return (
    <div className="h-full overflow-scroll bg-white font-sans p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-6 bg-white">
        <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-1">AI Database</p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
          <span className="text-sm font-medium text-gray-400 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
            {filtered.length} of {data.length} records
          </span>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex gap-3 items-center flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, doctor, description…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
            />
          </div>

          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(p => !p)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition
              ${showFilters ? "bg-indigo-500 text-white border-indigo-500" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300"}`}
          >
            <Filter size={15} />
            Filters
            <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {hasActiveFilter && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 font-semibold px-3 py-2.5 rounded-xl hover:bg-rose-50 border border-rose-100 transition">
              <X size={13} /> Clear all
            </button>
          )}
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[180px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Doctor</label>
              <select
                value={doctorFilter}
                onChange={e => setDoctor(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              >
                {DOCTORS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[160px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Date From</label>
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition" />
            </div>

            <div className="flex-1 min-w-[160px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Date To</label>
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition" />
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilter && (
        <div className="flex flex-wrap gap-2 mb-4">
          {search && (
            <span className="flex items-center gap-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full border border-indigo-100">
              Search: "{search}" <X size={11} className="cursor-pointer" onClick={() => setSearch("")} />
            </span>
          )}
          {doctorFilter !== "All Doctors" && (
            <span className="flex items-center gap-1.5 text-xs font-medium bg-violet-50 text-violet-600 px-3 py-1.5 rounded-full border border-violet-100">
              {doctorFilter} <X size={11} className="cursor-pointer" onClick={() => setDoctor("All Doctors")} />
            </span>
          )}
          {dateFrom && (
            <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100">
              From: {dateFrom} <X size={11} className="cursor-pointer" onClick={() => setDateFrom("")} />
            </span>
          )}
          {dateTo && (
            <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100">
              To: {dateTo} <X size={11} className="cursor-pointer" onClick={() => setDateTo("")} />
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 text-gray-400">
          <Loader2 size={32} className="mx-auto mb-3 animate-spin text-indigo-400" />
          <p className="font-semibold text-gray-500">Records load ho rahe hain…</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20">
          <AlertCircle size={36} className="mx-auto mb-3 text-rose-400" />
          <p className="font-semibold text-rose-500">{error}</p>
        </div>
      )}

      {/* List */}
      {!loading && !error && (
        filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-gray-500">No records found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map(record => {
              const dc = doctorColors[record.doctor] || { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" }
              return (
              <div key={record.id}
  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5"
>
  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-base shrink-0">
      {record.name?.charAt(0)}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h2 className="text-[15px] font-bold text-gray-900">{record.name}</h2>
        <span className="text-[10px] font-bold text-gray-300 bg-gray-100 px-2 py-0.5 rounded-full">
          ID #{record.id}
        </span>
      </div>

      <p className="text-sm text-gray-500 leading-snug mb-3 line-clamp-2">
        <FileText size={12} className="inline mr-1 text-gray-300" />
        {record.description}
      </p>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Stethoscope size={12} className="text-gray-300" />
          <span className={`font-semibold ${dc.text}`}>{record.doctor}</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Phone size={12} className="text-gray-300" />
          {record.number}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={12} className="text-gray-300" />
          Appointment: <span className="font-medium text-gray-600">{record.date}</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <User size={12} className="text-gray-300" />
          Created: {record.create_at}
        </span>
      </div>
    </div>

    <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${dc.bg} ${dc.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dc.dot}`} />
      {record.doctor?.split(" ").slice(-1)[0]}
    </div>
  </div>
</div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}