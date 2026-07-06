import { useEffect, useState } from "react";
import { Chat } from "./chat";
import { Side } from "./sid";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

const SIDEBAR_WIDTH = 288; // px (w-72)

export const Home = () => {
  const [get_token, set_token] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token === null) {
      navigate("/");
    }

    set_token(token);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative md:static">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-2 p-0 md:p-1">
        {/* Desktop: normal column */}
        <div className="hidden md:block md:col-span-1 w-full h-full">
          <Side />
        </div>

        <div className="w-full h-full md:col-span-4">
          <Chat />
        </div>
      </div>

      {/* ---- Mobile-only icon button - drawer kholne ke liye ---- */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-2 left-2 z-30 md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white shadow border border-gray-200"
      >
        <Menu size={18} className="text-gray-700" />
      </button>

      {/* ---- Mobile-only drawer ---- */}
      {/* Backdrop - drawer khula ho to dikhta hai, tap karke band ho jaata hai */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className="fixed top-0 left-0 h-full md:hidden bg-white shadow-2xl z-50 transition-transform duration-200 ease-out"
        style={{
          width: SIDEBAR_WIDTH,
          transform: `translateX(${drawerOpen ? 0 : -SIDEBAR_WIDTH}px)`,
        }}
      >
        {/* close icon drawer ke andar */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <X size={18} className="text-gray-500" />
        </button>

        <Side />
      </div>
    </div>
  );
};