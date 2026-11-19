import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Aurora, GridBackdrop } from "@/components/fx/atmosphere";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Aurora intensity="subtle" />
        <GridBackdrop />
        <div className="relative mx-auto w-full max-w-3xl px-5 py-32 text-center sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">Error 404</p>
          <p className="text-gradient mt-4 text-[clamp(5rem,18vw,11rem)] font-semibold leading-none tracking-[-0.06em]">
            404
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            This lane does not exist.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            The page may have moved, or the link was mistyped. The work and the studio pages are
            still where you left them.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="glow" size="lg">
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">
                See our work
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
