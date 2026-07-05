import { useState, useRef } from "react"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"

export const Upload_document = () => {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const handleFile = (f) => {
    setErrorMsg("")

    // sirf PDF allow karo
    if (f.type !== "application/pdf") {
      setErrorMsg("only pdf allow")
      return
    }

    setFile(f)
    setUploaded(false)
    uploadToServer(f)
  }

  const uploadToServer = async (f) => {
    setUploading(true)
    setErrorMsg("")

    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()
      formData.append("file_data", f) // backend param ka naam "file_data" hai, isliye yehi key use karo

      const res = await fetch(`${import.meta.env.VITE_SERVER}admin/upload`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          // Content-Type manually mat lagao - FormData khud sahi boundary set karta hai
        },
        body: formData,
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || "Upload fail ho gaya")
      }

      const data = await res.json()
      console.log("upload success:", data)

      setUploaded(true)
    } catch (error) {
      console.log("upload error:", error)
      setErrorMsg(error.message || "Kuch masla ho gaya upload karte waqt.")
      setFile(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setUploaded(false)
    setErrorMsg("")
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans p-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

        {/* Header */}
        <div className="mb-7">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
            Document Upload
          </p>
          <h1 className="text-[22px] font-bold text-gray-900 leading-snug">
            Upload your file
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            PDF only — up to 25 MB
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2.5 rounded-xl">
            <AlertCircle size={16} className="shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Drop Zone */}
        {!file && (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl px-6 py-12 text-center cursor-pointer transition-all duration-200
              ${dragOver
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
              }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-200
              ${dragOver ? "bg-indigo-100" : "bg-gray-100"}`}>
              <Upload size={24} className={dragOver ? "text-indigo-500" : "text-gray-400"} />
            </div>
            <p className="text-[15px] font-semibold text-gray-700 mb-1">
              Drop your file here
            </p>
            <p className="text-sm text-gray-400">
              or <span className="text-indigo-500 font-semibold">browse to upload</span>
            </p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,application/pdf"
              onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]) }}
            />
          </div>
        )}

        {/* File Card */}
        {file && (
          <div className={`border rounded-2xl px-4 py-4 flex items-center gap-3.5 transition-all duration-300
            ${uploaded
              ? "border-green-200 bg-green-50"
              : "border-gray-200 bg-gray-50"
            }`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
              ${uploaded ? "bg-green-100" : "bg-gray-100"}`}>
              <FileText size={20} className={uploaded ? "text-green-600" : "text-gray-400"} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate mb-0.5">
                {file.name}
              </p>
              <p className="text-xs text-gray-400">
                {formatSize(file.size)} · {uploaded ? "Ready" : uploading ? "Processing…" : "Waiting"}
              </p>
            </div>
            {uploaded
              ? <CheckCircle size={20} className="text-green-600 shrink-0" />
              : (
                <button
                  onClick={handleRemove}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              )
            }
          </div>
        )}

        {/* Progress Bar */}
        {file && uploading && (
          <div className="mt-3">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                style={{ animation: "progress 1.2s ease forwards" }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={!uploaded}
          onClick={()=>{
            setFile(null)
          setUploaded(false)}}
          className={`mt-6 w-full py-3.5 rounded-xl text-[15px] font-semibold tracking-tight transition-all duration-200
            ${uploaded
              ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white cursor-pointer hover:opacity-90 active:scale-[0.98]"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
        >
          {uploaded ? "upload new pdf" : uploading ? "Processing…" : "Select a file to continue"}
        </button>

        {/* Supported Formats */}
        <p className="text-xs text-gray-300 text-center mt-4">
          Supported: PDF only
        </p>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 10% }
          to { width: 85% }
        }
      `}</style>
    </div>
  )
}