import { Search, BookOpenCheck, HeartPulse } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    color: "bg-duo-green",
    shadow: "shadow-[0_6px_0_0_#46A302]",
    title: "1. Search any food",
    text: "Type a fruit, veggie, grain, or protein — our search finds it instantly.",
  },
  {
    icon: BookOpenCheck,
    color: "bg-duo-blue",
    shadow: "shadow-[0_6px_0_0_#1899D6]",
    title: "2. Get the real facts",
    text: "Calories, macros, vitamins, and glycemic index — laid out clearly, no jargon.",
  },
  {
    icon: HeartPulse,
    color: "bg-duo-red",
    shadow: "shadow-[0_6px_0_0_#EA2B2B]",
    title: "3. Eat smarter",
    text: "Health benefits, things to watch for, and serving ideas you can use today.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Nutrition, without the noise
        </h2>
        <p className="mt-2 font-semibold text-ink-light">
          Three steps to becoming a smarter eater.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.title} className="flex flex-col items-center text-center">
            <div
              className={`mb-5 grid h-20 w-20 place-items-center rounded-3xl text-white ${step.color} ${step.shadow}`}
            >
              <step.icon className="h-10 w-10" strokeWidth={2.25} />
            </div>
            <h3 className="mb-2 text-lg font-extrabold text-ink">{step.title}</h3>
            <p className="max-w-xs font-medium text-ink-light">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
