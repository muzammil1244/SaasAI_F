import {
  BotMessageSquare,
  LayoutDashboard,
  ShieldUser,
  BriefcaseMedical,
  Zap,
  HospitalIcon,
} from "lucide-react";

const features = [
  {
    icon: BotMessageSquare,
    title: "AI Chat Booking",
    text: "Book appointments naturally by chatting with the AI assistant. No complicated forms required.",
  },
  {
    icon: LayoutDashboard,
    title: "Appointment Scheduling",
    text: "Choose your preferred date and time, then confirm your appointment in seconds.",
  },
  {
    icon: ShieldUser,
    title: "Secure Authentication",
    text: "User accounts are protected with secure authentication and encrypted access.",
  },
  {
    icon: BriefcaseMedical,
    title: "Doctor Availability",
    text: "View available doctors and their appointment slots before booking.",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    text: "Receive quick answers and appointment confirmations with minimal waiting time.",
  },
  {
    icon: HospitalIcon,
    title: "Hospital Information",
    text: "Look up departments, services, and hospital policies directly through the AI assistant.",
  },
];

export const Page2 = () => {
  return (
    <div className="w-screen min-h-screen bg-white p-8 md:p-14">
     

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-xl">
          <span className="p2-body inline-flex items-center gap-2 rounded-full border border-cyan-600\20 bg-[#EAF5F1] px-3 py-1 text-xs font-medium tracking-wide text-cyan-600">
            FEATURES
          </span>
          <h1 className="p2-display mt-5 text-4xl font-semibold  leading-tight text-cyan-500 md:text-5xl">
            Everything you need,
            <span className="text-black"> in one chat</span>.
          </h1>
          <p className="p2-body mt-4 text-base leading-relaxed text-[#5B6B67] md:text-lg">
            From booking to hospital info, Appointly handles it all through a single
            conversation with your AI assistant.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-cyan-50 bg-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/20 hover:shadow-[0_12px_32px_rgba(20,99,86,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/15 bg-cyan-50 transition-colors duration-200 group-hover:bg-cyan-500">
                  <Icon
                    className="h-5.5 w-5.5 text-gray-500 transition-colors duration-200 group-hover:text-white"
                    strokeWidth={1.75}
                  />
                </div>

                <h3 className="p2-display text-lg font-semibold text-[#0E211D]">
                  {feature.title}
                </h3>
                <p className="p2-body text-sm leading-relaxed text-[#5B6B67]">
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

