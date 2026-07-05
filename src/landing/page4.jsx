import { Sparkles, Building2, Clock, Lock, CalendarDays, Rocket } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Assistance",
    text: "Our intelligent AI assistant understands natural conversations and helps users book appointments quickly without navigating complex forms.",
  },
  {
    icon: Building2,
    title: "Accurate Hospital Information",
    text: "Get reliable details about hospitals, doctors, departments, and services through AI-powered knowledge retrieval.",
  },
  {
    icon: Clock,
    title: "Save Time",
    text: "Book appointments in minutes without waiting on phone calls or standing in long queues.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    text: "User accounts and appointment data are protected with secure authentication and modern security practices.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Scheduling",
    text: "Choose your preferred doctor, date, and available time slot with a simple and user-friendly interface.",
  },
  {
    icon: Rocket,
    title: "Fast & Easy Experience",
    text: "Enjoy a clean, responsive, and easy-to-use platform designed to make healthcare appointments simple.",
  },
];

export const Page4 = () => {
  return (
    <div className="w-screen min-h-screen bg-white">
     

      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="p5-body inline-flex items-center gap-2 rounded-full border border-cyan-500 bg-cyan-50 px-3 py-1 text-xs font-medium tracking-wide text-cyan-500">
            WHY APPOINTLY
          </span>
          <h1 className="p5-display mt-5 text-4xl font-semibold leading-tight text-cyan-500 md:text-5xl">
            Why Choose
            <span className="text-gray-700"> Appointly</span>?
          </h1>
          <p className="p5-body mt-4 text-base leading-relaxed text-gray-500 md:text-lg">
            Experience a smarter, faster, and more reliable way to book healthcare
            appointments with AI-powered assistance.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-[#E5EAE8] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(20,99,86,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-50 transition-colors duration-200 group-hover:bg-cyan-500">
                  <Icon
                    className="h-5.5 w-5.5 text-gray-500 transition-colors duration-200 group-hover:text-white"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="p5-display mt-5 text-lg font-semibold text-cyan-500 md:text-xl">
                  {feature.title}
                </h3>
                <p className="p5-body mt-2 text-sm leading-relaxed text-black md:text-base">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

