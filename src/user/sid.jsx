import { useState, useEffect } from "react";
import { Settings, LogOut, AtSign } from "lucide-react";
import { Signout } from "../buttons";
import { useNavigate } from "react-router";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4">
      <p className="text-xs text-gray-400 mb-1">Current time</p>
      <p className="text-3xl font-medium tracking-tight text-gray-800">
        {time.toLocaleTimeString("en-IN")}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      </p>
    </div>
  );
}

function MiniCalendar() {
  const today = new Date();
  const [cur, setCur] = useState(new Date());
  const [sel, setSel] = useState(new Date());
  const y = cur.getFullYear(), m = cur.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev = new Date(y, m, 0).getDate();
  const sameDay = (a, b) => a && b && a.getDate()===b.getDate() && a.getMonth()===b.getMonth() && a.getFullYear()===b.getFullYear();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ date: new Date(y, m - 1, daysInPrev - i), outside: true });
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ date: new Date(y, m, i), outside: false });
  const rem = 42 - cells.length;
  for (let i = 1; i <= rem; i++)
    cells.push({ date: new Date(y, m + 1, i), outside: true });

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCur(new Date(y, m - 1, 1))} className="text-gray-400 hover:text-gray-600 px-1">‹</button>
        <span className="text-sm font-medium text-gray-700">{MONTHS[m]} {y}</span>
        <button onClick={() => setCur(new Date(y, m + 1, 1))} className="text-gray-400 hover:text-gray-600 px-1">›</button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] text-gray-400 py-1">{d}</div>)}
        {cells.map(({ date, outside }, i) => {
          const isToday = sameDay(date, today);
          const isSel = sameDay(date, sel);
          return (
            <div key={i}
              onClick={() => setSel(date)}
              className={`aspect-square flex items-center justify-center text-[11px] rounded-full cursor-pointer
                ${outside ? "text-gray-300" : "text-gray-600"}
                ${isToday && !isSel ? "bg-cyan-100 text-cyan-700 font-medium" : ""}
                ${isSel ? "bg-cyan-600 text-white font-medium" : "hover:bg-gray-100"}
              `}>
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Side = () => {



  let navigate = useNavigate()

  const [get_profile , set_profile] = useState({})
  let token = localStorage.getItem("token")
// logout fun

const logout=()=>{
    console.log("Logout clicked");

  localStorage.removeItem("token")
  navigate("/")
  
}

// profile 

const profile=async()=>{

  try {
    let profile_fetch = await fetch(`${import.meta.env.VITE_SERVER}user/profile`,{
    headers:{
      "Content-Type":"application/json",
      "authorization":`Bearer ${token}`
    },
    method:"GET",
    
  })

  let data = await profile_fetch.json()
  console.log("profile Data " ,data)
  set_profile(data)
  } catch (error) {
        console.log(error)

    return error
  }

  



}



// useEffect for first fechting data 

useEffect(()=>{
profile()
},[])

  return (
    <div className="w-full h-full   bg-white flex flex-col gap-3 py-2 px-2">

      {/* Profile Card */}
      <div className="bg-white border border-gray-300 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-sm font-medium text-cyan-700 flex-shrink-0">
            MM
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">{get_profile.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <AtSign className="size-3 text-gray-400" />
              <p className="text-xs text-gray-400 truncate">{get_profile.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex  gap-2">
          <button  className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-500 border  border-gray-200 rounded-xl py-2 hover:bg-gray-50 transition-colors">
            <Settings className="size-3" /> Settings
          </button>
          <button onClick={()=>logout()} className="" >
                      <Signout  className="flex-1 flex items-center justify-center gap-1.5 text-xs text-red-500 border border-red-100 rounded-xl py-2 hover:bg-red-50 transition-colors" />

          </button>
        </div>
      </div>

      {/* Clock */}
      <Clock />

      {/* Calendar */}
      <MiniCalendar />
    </div>
  );
};