import { auth } from "@clerk/nextjs/server";
import { SignUpButton } from "@clerk/nextjs";
import { BarChart3, Link2, ShieldCheck, Zap } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10 dark:bg-black">
      <main className="w-full max-w-5xl space-y-16">
        <section className="space-y-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
            LinkLite
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            Share smarter links with built-in insights.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
            Create short links, track clicks in real time, and manage campaigns from a clean
            dashboard designed for fast teams.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Link2 className="size-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Custom short links</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Create branded, memorable links your audience trusts and remembers.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <BarChart3 className="size-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Live analytics</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              See performance by link instantly so you can optimize campaigns quickly.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <ShieldCheck className="size-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              Safe by default
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Route protection and secure authentication keep your workspace private.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Zap className="size-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Built for speed</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A lightweight interface helps you launch and manage links in seconds.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Turn every link into an actionable signal
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Join LinkLite to simplify sharing and get a clear view of what drives engagement.
          </p>
          <div className="mt-6">
            <SignUpButton mode="modal">
              <Button size="lg">Create your account</Button>
            </SignUpButton>
          </div>
        </section>
      </main>
    </div>
  );
}
