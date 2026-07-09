import { useRef, useEffect, useState } from "react";
import { Buttons } from "../buttons";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CircleStop } from 'lucide-react';
import img11 from '../../images/img11.png'
import img12 from '../../images/img12.png'

// markdown ko table + text dono ke liye style karne wale components
const markdownComponents = {
  table: ({ node, ...props }) => (
    <table className="border-collapse border border-gray-300 w-full my-2 text-sm" {...props} />
  ),
  thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
  th: ({ node, ...props }) => (
    <th className="border border-gray-300 px-2 py-1 text-left font-semibold" {...props} />
  ),
  td: ({ node, ...props }) => <td className="border border-gray-300 px-2 py-1" {...props} />,
  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
};

export const Chat = () => {
  const taRef = useRef(null);

  const [get_que, set_que] = useState("");
  const [get_ans, set_ans] = useState({});
  const [get_history, set_history] = useState([]);
  const [get_final_answer, set_final_answer] = useState("");
  const [get_question, set_question] = useState("");
  const [displayed_answer, set_displayed_answer] = useState(""); // streaming effect ke liye
  const [loading, set_loading] = useState(false);
const [token , set__token ] = useState("")
const bottomRef = useRef(null);



let navigate = useNavigate()
  const question_submit = async () => {
    if (!get_que.trim() || loading) return;

    set_loading(true);



    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER}user/chat`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          qna: get_que,
        }),
      });

      let data = await res.json();
      console.log("Answer", data);

      set_ans(data);
      set_final_answer(data.final_answer);
      set_history(data.history);
      set_question(data.qna);
      set_que(""); // input box khali karo

      set_loading(false);

      // ab fake streaming effect chalao final_answer ke liye
      revealAnswer(data.final_answer);
    } catch (error) {
      console.log(error);
      set_loading(false);
      return error;
    }
  };

  // fake streaming effect - line by line reveal (table ke liye better hai)
  const revealAnswer = (fullText) => {
    if (!fullText) return;

    const lines = fullText.split("\n");
    let currentText = "";
    let index = 0;

    const interval = setInterval(() => {
      currentText += (index === 0 ? "" : "\n") + lines[index];
      set_displayed_answer(currentText);
      index++;

      if (index >= lines.length) {
        clearInterval(interval);
      }
    }, 100);
  };

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
        question_submit();
      }
    };

    ta.addEventListener("input", handleInput);
    ta.addEventListener("keydown", handleKeyDown);

    return () => {
      ta.removeEventListener("input", handleInput);
      ta.removeEventListener("keydown", handleKeyDown);
    };
  }, [get_que]);
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [get_history, get_question, displayed_answer]);

useEffect(()=>{
 let token =  localStorage.getItem("token")
 if(!token){
navigate("/")
 }
 set__token(token)
},[])
  return (
    <div className="w-full relative h-screen  grid-cols-1 grid grid-rows-10 justify-between  bg-white">
      {/* header */}
      <header className=" px-3 h-8 row-span-1 bg-white">
        <h1 className="text-slate-900 text-lg font-bold gap-7">
          appoint<span className="text-cyan-300">ly</span>
        </h1>
      </header>

      {/* answer */}
      <div className="w-full h-full row-span-8 pb-5 bg-white flex-1">
        {get_ans.ans || get_final_answer ? (
          <div className="w-full h-full overflow-x-hidden  bg-white overflow-y-scroll md:px-6 px-3 py-3 md:py-6">
            {/* Previous History */}
           {get_history?.map((item, index) => (
  <Message key={index} role={item.role} content={item.content} />
))}
            {/* Latest User Question */}
            {get_question && (
              <div className="flex justify-end mb-5">
                <div className="flex flex-row-reverse gap-3 items-start max-w-[75%]">
                  <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center flex-none">
                    <User size={18} />
                  </div>

                  <div className="bg-cyan-500 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow">
                    {get_question}
                  </div>
                </div>
              </div>
            )}

            {/* Latest AI Answer - streaming effect ke saath */}
            {displayed_answer && (
              <div className="flex  mb-5">
                <div className="flex overflow-x-scroll gap-3 ">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center flex-none">
                    <Bot size={18} />
                  </div>

                  <div className="bg-gray-100  px-4 py-3 rounded-2xl rounded-bl-sm shadow text-gray-800 prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {displayed_answer}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start mb-5">
                <div className="flex gap-3 items-start max-w-[75%]">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center flex-none">
                    <Bot size={18} />
                  </div>
                  <div className="bg-white border px-4 py-3 rounded-2xl rounded-bl-sm shadow text-gray-400 text-sm">
                    thinking ....
                  </div>
                </div>
              </div>
            )}
            {/* bottom scroll */}
            <div ref={bottomRef} />
          </div>
        ) : (
          <div className="w-full bg-white flex flex-col gap-1 justify-center items-center h-full">
            <div className="animate-bounce">
              <img className="md:w-30 md:h-30 h-15 w-15 " src={img11} alt="" />
            </div>

            <div className="w-20 shadow bg-gray-200 rounded-[50%] h-1"></div>

            <img className="md:w-[30%] md:h-[40%] h-20 w-[70%]"  src="images/img12.png" alt="" />
          </div>
        )}
      </div>

      {/* query input */}
      <div className="md:px-40 absolute w-full bottom-3 shadow py-1 px-10  md:py-2">
        <div className="flex flex-col bg-white items-end gap-2 shadow-sm  rounded-2xl px-4 py-3 focus-within:ring-1 focus-within:ring-blue-100 focus-within:border-blue-200 transition-all">
          <textarea
            ref={taRef}
            rows={1}
            value={get_que}
            placeholder="Message..."
            onChange={(e) => set_que(e.target.value)}
            className="w-full text-sm resize-none border-none outline-none bg-transparent leading-relaxed overflow-y-auto"
            style={{ minHeight: "24px", maxHeight: "200px" }}
          />
{
  loading ? <div className="  justify-center items-center flex hover:scale-105 duration-100  bg-gray-50 text-sm hover:bg-gray-200 duration-100 hover:cursor-pointer  text-black px-5 shadow py-2 rounded-xl">
<CircleStop className="text-gray-700 size-5"/>
  </div> :          <Buttons onclick={() => question_submit()} />

}
        </div>
      </div>
    </div>
  );
};

import { memo } from "react";
import { useNavigate } from "react-router";

const Message = memo(function Message({ role, content }) {
  const isUser = role.trim() === "user";
  return (
    <div className={`flex overflow-x-auto mb-5 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex md:gap-3 gap-2 items-start md:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}>
        <div className={`md:w-10 md:h-10 h-7 w-7 rounded-full flex items-center justify-center flex-none ${
          isUser ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-700"
        }`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className={`md:px-4 px-2 py-2 md:py-3 w-full rounded-2xl shadow prose prose-sm md:max-w-none ${
          isUser ? "bg-cyan-500 text-gray-100 rounded-br-sm" : "bg-gray-100  text-gray-800 rounded-bl-sm"
        }`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
});