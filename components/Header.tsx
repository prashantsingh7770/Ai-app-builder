import Link from "next/link";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import Image from "next/image";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";
import { PricingModal } from "@/components/PricingModal";
import { PLANS } from "@/lib/constants";
import type { Plan } from "@/types/plans";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          {/* <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/30">
            <span className="font-sans text-[16px] font-black tracking-tighter">N</span>
            <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
          </div> */}
<span className="font-sans text-3xl font-black tracking-tight">
  <span className="text-white">Nexa</span>
  <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
    AI
  </span>
</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <Show when="signed-in">
            <Link
              href="/projects"
              className="text-[13px] font-medium text-white/40 transition-colors hover:text-white/80"
            >
              Projects
            </Link>

            {user && (
              <PricingModal>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70">
                  <Zap className="h-3 w-3 fill-white/70" />
                  {user.credits} credits
                </span>
              </PricingModal>
            )}

            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-medium text-white/50 hover:text-white/90 hover:bg-transparent"
              >
                Sign in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button
                size="sm"
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-black hover:bg-white/90 active:scale-95"
              >
                Get Started
                <ArrowRight className="h-3 w-3 opacity-60" />
              </Button>
            </SignInButton>
          </Show>
        </div>
      </nav>
    </header>
  );
}
