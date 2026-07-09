import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CrossIcon, X } from "lucide-react";
import { useNavigate } from "react-router";



export const Auth = ({offauth}) => {
  const [mode, setMode] = useState("login"); // "login" | "register"




 
  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-6 bg-transparent">
    
    

      <div className="w-full max-w-md bg-transparent">
   
        <div className="auth-body mb-6 flex gap-1 items-center px-3 rounded-full border border-[#E5EAE8] bg-white p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors duration-200 ${
              mode === "login"
                ? "bg-cyan-500 text-white"
                : "text-[#5B6B67] hover:text-[#0E211D]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors duration-200 ${
              mode === "register"
                ? "bg-cyan-500 text-white"
                : "text-[#5B6B67] hover:text-[#0E211D]"
            }`}
          >
            Register
          </button>
          <button
          onClick={()=>{
            offauth()
          }}
          className="bg-white cursor-pointer  text-gray-500 size-5 w- rounded-2xl">
            <X/>
          </button>
        </div>

        {/* CHILD: only one renders at a time, based on parent's state */}
        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
};


import { Loader2 } from "lucide-react"; // add this to your imports


export const LoginForm = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 new

  const [get_login_data, set_login_data] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();

const login_submit = async (e) => {
  e.preventDefault();
  console.log("login fun activated");

  if (get_login_data.email == "" || get_login_data.password == "") {
    return alert("give email and password");
  }

  setIsLoading(true); // 👈 loading yahan set karo, validation ke baad

  try {
    let login = await fetch(`${import.meta.env.VITE_SERVER}auth/login`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(get_login_data)
    });

    let data = await login.json();
    console.log(data);

    // 👇 yehi main fix hai
    if (!login.ok || !data.token) {
      alert(data.message || "Invalid email or password");
      return; // yahin ruk jao, navigate mat karo
    }

    localStorage.setItem("token", data.token);
    console.log("login successfuly");

    if (get_login_data.email == "admin1244@gmail.com") {
      return navigate("/admin");
    }
    return navigate("/user");

  } catch (error) {
    console.log("error from login", error);
    alert("Something went wrong, please try again");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-body rounded-3xl border border-[#E5EAE8] bg-white p-8 shadow-[0_10px_40px_rgba(14,33,29,0.06)]">
      <h2 className="auth-display text-2xl font-bold text-[#0E211D]">Welcome back</h2>
      <p className="mt-1 text-sm text-[#5B6B67]">Login to continue booking with Appointly.</p>

      <form className="mt-7 flex flex-col gap-4" onSubmit={(e) => login_submit(e)}>
        {/* email */}
        <div className="flex items-center gap-3 rounded-xl border border-[#E5EAE8] bg-white px-4 py-3 transition-colors duration-200 focus-within:border-cyan-bg-cyan-500">
          <Mail className="h-4.5 w-4.5 flex-none text-[#5B6B67]" strokeWidth={1.75} />
          <input
            type="email"
            value={get_login_data.email}
            onChange={(e) => set_login_data({ ...get_login_data, email: e.target.value })}
            placeholder="Email address"
            className="w-full bg-transparent text-sm text-[#0E211D] placeholder:text-[#9AA6A3] focus:outline-none"
          />
        </div>

        {/* password */}
        <div className="flex items-center gap-3 rounded-xl border border-[#E5EAE8] bg-white px-4 py-3 transition-colors duration-200 focus-within:border-cyan-bg-cyan-500">
          <Lock className="h-4.5 w-4.5 flex-none text-[#5B6B67]" strokeWidth={1.75} />
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) =>
              set_login_data({
                ...get_login_data,
                password: e.target.value,
              })
            }
            placeholder="Password"
            className="w-full bg-transparent text-sm text-[#0E211D] placeholder:text-[#9AA6A3] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="flex-none text-[#9AA6A3] hover:text-[#5B6B67]"
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" strokeWidth={1.75} />
            ) : (
              <Eye className="h-4.5 w-4.5" strokeWidth={1.75} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Logging in...
            </>
          ) : (
            <>
              Login
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#5B6B67]">
        Don't have an account?{" "}
        <button onClick={onSwitchToRegister} className="font-semibold text-cyan-bg-cyan-500 hover:underline">
          Register
        </button>
      </p>
    </div>
  );
};


export const RegisterForm = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 new
  const [register_data, set_register_data] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit_register = async (e) => {
  e.preventDefault();

  if (register_data.name == "" || register_data.email == "" || register_data.password == "") {
    console.log("please provided all field", register_data);
    alert('please full fill all data');
    return false;
  }

  setIsLoading(true); // 👈 start loading

  try {
    let post_register = await fetch(`${import.meta.env.VITE_SERVER}auth/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(register_data)
    });

    let data = await post_register.json();
    console.log(data);

    // 👇 yehi fix hai
    if (!post_register.ok) {
      alert(data.message || "Registration failed, please try again");
      return; // yahin ruk jao, onSwitchToLogin mat call karo
    }

    console.log("user register successfully");
    onSwitchToLogin(); // sirf success pe hi login form pe bhejo

  } catch (error) {
    console.log("error from register user", error);
    alert("Something went wrong, please try again");
  } finally {
    setIsLoading(false); // 👈 sab paths me isse hi loading band hogi
  }
};
  return (
    // ...same JSX as before, sirf button ye replace karo:
 <div className="auth-body rounded-3xl border border-[#E5EAE8] bg-white p-8 shadow-[0_10px_40px_rgba(14,33,29,0.06)]">
      <h2 className="auth-display text-2xl font-bold text-[#0E211D]">Create your account</h2>
      <p className="mt-1 text-sm text-[#5B6B67]">Register once, book appointments in seconds.</p>

      <form className="mt-7 flex flex-col gap-4" onSubmit={(e) => submit_register(e)}>
        {/* name */}
        <div className="flex items-center gap-3 rounded-xl border border-[#E5EAE8] bg-white px-4 py-3 transition-colors duration-200 focus-within:border-cyan-bg-cyan-500">
          <User className="h-4.5 w-4.5 flex-none text-[#5B6B67]" strokeWidth={1.75} />
          <input
            type="text"
            onChange={(e)=>set_register_data({...register_data,name:e.target.value})}
            placeholder="Full name"
            className="w-full bg-transparent text-sm text-[#0E211D] placeholder:text-[#9AA6A3] focus:outline-none"
          />
        </div>

        {/* email */}
        <div className="flex items-center gap-3 rounded-xl border border-[#E5EAE8] bg-white px-4 py-3 transition-colors duration-200 focus-within:border-cyan-bg-cyan-500">
          <Mail className="h-4.5 w-4.5 flex-none text-[#5B6B67]" strokeWidth={1.75} />
          <input
            type="email"
            onChange={(e)=>set_register_data({...register_data,email:e.target.value})}
            placeholder="Email address"
            className="w-full bg-transparent text-sm text-[#0E211D] placeholder:text-[#9AA6A3] focus:outline-none"
          />
        </div>

        {/* password */}
 <div className="flex items-center gap-3 rounded-xl border border-[#E5EAE8] bg-white px-4 py-3 transition-colors duration-200 focus-within:border-cyan-bg-cyan-500">
          <Lock className="h-4.5 w-4.5 flex-none text-[#5B6B67]" strokeWidth={1.75} />
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e)=>set_register_data({...register_data,password:e.target.value})}
            placeholder="Password"
            className="w-full bg-transparent text-sm text-[#0E211D] placeholder:text-[#9AA6A3] focus:outline-none"
          />
          </div>
    <button
      type="submit"
      disabled={isLoading}
      className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
          Registering...
        </>
      ) : (
        <>
          Register
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </>
      )}
    </button>
    </form>
    </div>
  );
};

export default Auth;