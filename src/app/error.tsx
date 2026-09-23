"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-zinc-50">Something went wrong</h1>
      <p className="text-zinc-400">
        Could not load the portfolio content right now. This usually means the API is
        unreachable.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-zinc-50 hover:bg-white/10"
      >
        Try again
      </button>
    </main>
  );
}
