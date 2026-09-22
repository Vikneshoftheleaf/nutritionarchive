import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-7xl">🍋</span>
      <h1 className="text-3xl font-extrabold text-ink">
        Hmm, this food isn&apos;t on our plate.
      </h1>
      <p className="mt-3 font-semibold text-ink-light">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s find something
        tasty instead.
      </p>
      <Link
        href="/foods"
        className="mt-6 inline-block rounded-2xl bg-duo-green px-6 py-3 font-extrabold text-white shadow-[0_4px_0_0_#46A302] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
      >
        Browse all foods
      </Link>
    </div>
  );
}
