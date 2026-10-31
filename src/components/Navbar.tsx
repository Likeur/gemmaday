"use client";

import { useState } from "react";

export function Navbar({ onStartClick }: { onStartClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleStart() {
    if (onStartClick) {
      onStartClick();
    } else {
      const el = document.getElementById("assistant");
      el?.scrollIntoView({ behavior: "smooth" });
      const textarea = document.getElementById("message") as HTMLTextAreaElement | null;
      textarea?.focus();
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-8 4h4m6-10v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                gemmaday
              </span>
              <p className="text-xs text-zinc-500">Transports de Lubumbashi</p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#presentation" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Présentation
          </a>
          <a href="#comment-ca-marche" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Comment ça marche
          </a>
          <a href="#arrets" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Arrêts de taxi
          </a>
          <a href="#equipe" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            L'Équipe
          </a>
        </nav>

        {/* Real solid button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Commencer
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            aria-label="Ouvrir le menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3">
            <a
              href="#presentation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
            >
              Présentation
            </a>
            <a
              href="#comment-ca-marche"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
            >
              Comment ça marche
            </a>
            <a
              href="#arrets"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
            >
              Arrêts de taxi
            </a>
            <a
              href="#equipe"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
            >
              L'Équipe
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleStart();
              }}
              className="mt-2 w-full rounded-lg bg-zinc-900 py-2.5 text-center text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Commencer
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
