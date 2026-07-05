import { useState, useEffect } from "react"
import { Clock, User, Phone, Stethoscope, CheckCircle2, Circle, AlertCircle, Loader2, Trash2 } from "lucide-react"

const TODAY = new Date().toISOString().split("T")[0]

const statusConfig = {
  done:     { label: "Done",     icon: CheckCircle2, bg: "bg-emerald-50", border: "border-emerald-100", badge: "bg-emerald-100 text-emerald-700", iconColor: "text-emerald-500", dot: "bg-emerald-400" },
  ongoing:  { label: "Ongoing",  icon: AlertCircle,  bg: "bg-amber-50",   border: "border-amber-100",   badge: "bg-amber-100 text-amber-700",     iconColor: "text-amber-500",   dot: "bg-amber-400"   },
  upcoming: { label: "Upcoming", icon: Circle,       bg: "bg-white",      border: "border-gray-100",    badge: "bg-gray-100 text-gray-500",       iconColor: "text-gray-300",    dot: "bg-gray-300"    },
}

const doctorColors = {
  "Dr. Anjali Mehta": "text-violet-600",
  "Dr. Rakesh Gupta": "text-blue-600",
  "Dr. Sneha Joshi":  "text-emerald-600",
  "Dr. Neha Kapoor":  "text-rose-600",
}

const avatarColors = [
  "from-indigo-400 to-violet-500",
  "from-rose-400 to-pink-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-blue-400 to-cyan-500",
  "from-fuchsia-400 to-purple-500",
]

const todayLabel = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

export const TodayAppointments = () => {
  const [allData, setAllData]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState("")
  const [deletingId, setDeletingId] = useState(null)

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
      setAllData(Array.isArray(result) ? result : result.appointments || [])
    } catch (err) {
      console.log("fetch appointments error:", err)
      setError(err.message || "Kuch masla ho gaya data load karte waqt.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // sirf aaj ki date wale records
  const todayRecords = allData.filter(r => r.date === TODAY)

  const done     = todayRecords.filter(r => r.status === "done").length
  const ongoing  = todayRecords.filter(r => r.status === "ongoing").length
  const upcoming = todayRecords.filter(r => r.status === "upcoming").length

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Kya aap is appointment ko delete karna chahte hain?")
    if (!confirmDelete) return

    setDeletingId(id)

    try {
      const token = localStorage.getItem("token")

      const res = await fetch(`${import.meta.env.VITE_SERVER}admin/delete/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || "Delete nahi ho paya")
      }

      // list se turant hata do (dubara fetch kiye bina)
      setAllData(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      console.log("delete error:", err)
      alert(err.message || "Delete karte waqt masla aaya")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="h-screen overflow-scroll bg-white font-sans p-4 md:p-8">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-1">Appointments</p>
        <h1 className="text-2xl font-bold text-gray-900">Today's Schedule</h1>
        <p className="text-sm text-gray-400 mt-1">{todayLabel}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-emerald-500">{done}</p>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">Done</p>
        </div>
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{ongoing}</p>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">Ongoing</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-indigo-500">{upcoming}</p>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">Upcoming</p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-24 text-gray-400">
          <Loader2 size={36} className="mx-auto mb-3 animate-spin text-indigo-400" />
          <p className="font-semibold text-gray-500">Appointments load ho rahe hain…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-24">
          <AlertCircle size={36} className="mx-auto mb-3 text-rose-400" />
          <p className="font-semibold text-rose-500">{error}</p>
        </div>
      )}

      {/* Timeline List */}
      {!loading && !error && (
        todayRecords.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Clock size={44} className="mx-auto mb-3 opacity-20" />
            <p className="font-semibold text-gray-500">No appointments today</p>
            <p className="text-sm mt-1">Enjoy your free day!</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white hidden sm:block" />

            <div className="flex flex-col gap-3">
              {todayRecords.map((record, idx) => {
                const s = statusConfig[record.status] || statusConfig.upcoming
                const StatusIcon = s.icon
                const docColor = doctorColors[record.doctor] || "text-gray-600"
                const avatarGrad = avatarColors[idx % avatarColors.length]
                const isDeleting = deletingId === record.id

                return (
                  <div key={record.id} className="flex gap-4 items-start">

                    <div className="relative z-10 hidden sm:flex flex-col items-center shrink-0 pt-4">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow ${s.dot}`} />
                    </div>

                    <div className={`flex-1 rounded-2xl border shadow-sm p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${s.bg} ${s.border}`}>
                      <div className="flex items-start gap-3">

                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarGrad} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                          {record.name?.charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <h2 className="text-[15px] font-bold text-gray-900">{record.name}</h2>
                            <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>
                              <StatusIcon size={10} />
                              {s.label}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 mb-2.5 line-clamp-1">{record.description}</p>

                          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Clock size={11} className="text-gray-300" />
                              <span className="font-semibold text-gray-700">{record.time}</span>
                            </span>
                            <span className={`flex items-center gap-1.5 text-xs font-semibold ${docColor}`}>
                              <Stethoscope size={11} />
                              {record.doctor}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Phone size={11} className="text-gray-300" />
                              {record.number}
                            </span>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(record.id)}
                          disabled={isDeleting}
                          className="shrink-0 p-2 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-50"
                          title="Delete appointment"
                        >
                          {isDeleting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      )}
    </div>
  )
}