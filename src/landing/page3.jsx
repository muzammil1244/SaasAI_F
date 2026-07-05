import { UserPlus, LogIn, MessageCircle, CalendarPlus, LayoutList, Plus, Pencil, Trash2, History, FileText } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: UserPlus,
    title: "Register",
    text: "Create your account with your name and mobile number. Takes under a minute, no paperwork.",
  },
  {
    id: "02",
    icon: LogIn,
    title: "Login",
    text: "Sign back in securely whenever you need to book, check, or change an appointment.",
  },
  {
    id: "03",
    icon: MessageCircle,
    title: "Chat directly with AI",
    text: "Tell the assistant what you need in plain language — no forms, no call center hold music.",
  },
  {
    id: "04",
    icon: CalendarPlus,
    title: "Share your appointment details",
    text: "Give the assistant your name, a short description, the doctor you'd like to see, your mobile number, and a preferred date.",
    chips: ["Dr. Ramesh", "Dr. Suresh", "+ more doctors"],
  },
  {
    id: "05",
    icon: LayoutList,
    title: "Manage everything, anytime",
    text: "Create, update, or cancel appointments, pull up your last visit instantly, and ask about hospital policies whenever you're unsure.",
    tags: [
      { icon: Plus, label: "Create" },
      { icon: Pencil, label: "Update" },
      { icon: Trash2, label: "Cancel" },
      { icon: History, label: "Last visit" },
      { icon: FileText, label: "Policies" },
    ],
  },
];

export const Page3 = () => {
  return (
    <div className="w-screen min-h-screen bg-white">
     
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        {/* Header */}
        <div className="max-w-2xl">

          <span className="p3-body inline-flex items-center gap-2 rounded-full border border-[#146356]/20 bg-cyan-100 px-3 py-1 text-xs font-medium tracking-wide text-cyan-500">
            HOW IT WORKS
          </span>

          <h1 className="p3-display mt-5 text-4xl font-semibold leading-tight text-[#0E211D] md:text-5xl">
            Five steps from
            <span className="text-cyan-500"> hello </span>
            to a booked appointment.
          </h1>

          <p className="p3-body mt-4 text-base leading-relaxed text-[#5B6B67] md:text-lg">
            No apps to hunt through, no hold music. Just register once, then let the assistant
            handle the rest of your visit — start to finish.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="relative mt-16">
          {/* connecting line */}
          <div
            className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#146356]/30 via-[#146356]/15 to-transparent md:block"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-14">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.id} className="relative flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
                  {/* icon node */}
                  <div className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-[#146356]/15 bg-cyan-200 shadow-sm">
                    <Icon className="h-6 w-6 text-cyan-500" strokeWidth={1.75} />
                    <span className="p3-display absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-semibold text-white">
                      {step.id}
                    </span>
                  </div>

                  {/* content card */}
                  <div className="flex-1 rounded-2xl border border-[#E5EAE8] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(20,99,86,0.08)] md:p-7">
                    <h3 className="p3-display text-xl font-semibold text-[#0E211D] md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="p3-body mt-2 max-w-xl text-sm leading-relaxed text-[#5B6B67] md:text-base">
                      {step.text}
                    </p>

                    {step.chips && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {step.chips.map((chip) => (
                          <span
                            key={chip}
                            className="p3-body rounded-full border border-[#E5EAE8] bg-[#FAFAF9] px-3 py-1 text-xs font-medium text-[#5B6B67]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}

                    {step.tags && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {step.tags.map((tag) => {
                          const TagIcon = tag.icon;
                          return (
                            <span
                              key={tag.label}
                              className="p3-body inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1.5 text-xs font-medium text-cyan-500"
                            >
                              <TagIcon className="h-3.5 w-3.5" strokeWidth={2} />
                              {tag.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

