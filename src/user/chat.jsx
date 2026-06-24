import { useRef, useEffect } from "react";
import { Buttons } from "../buttons";
export const Chat = () => {
  const taRef = useRef(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;

    const handleInput = () => {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        // apna send function yahan
      }
    };

    ta.addEventListener("input", handleInput);
    ta.addEventListener("keydown", handleKeyDown);

    return () => {
      ta.removeEventListener("input", handleInput);
      ta.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-full flex-col flex justify-between bg-white">

      {/* header */}
      <header className="w-full px-3 h-8 bg-white">

        <h1 className="text-slate-900 text-lg font-bold gap-7 ">
    appoint<span className="text-cyan-300">ly</span>
</h1>
      </header>


      {/* answer */}
      <div className="w-full h-full">


{/* logo */}

<div className="w-full  flex flex-col gap-1 justify-center items-center h-full">

    <div className="  animate-bounce ">
<img className="w-30 h-30" src="images/img11.png" alt="" />
    </div>

    <div className="w-20 shadow bg-gray-200 rounded-[50%] h-1"></div>

        <img className="w-[30%] h-[40%] " src="images/img12.png" alt="" />
  

    <div>

    </div>

</div>

      </div>

      {/* query input */}
      
      <div className="px-40 py-2">
        <div className="flex flex-col items-end gap-2 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-1 focus-within:ring-blue-100 focus-within:border-blue-200 transition-all">




          <textarea
            ref={taRef}
            rows={1}
            placeholder="Message..."
            className=" w-full text-sm resize-none border-none outline-none bg-transparent leading-relaxed overflow-y-auto"
            style={{ minHeight: "24px", maxHeight: "200px" }}
          />

          <Buttons />

        </div>
      </div>

    </div>
  );
};