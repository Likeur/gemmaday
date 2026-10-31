"use client";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
              gemmaday · Lubumbashi
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Système de repérage des arrêts de taxi urbains
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
            <a href="#presentation" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Présentation
            </a>
            <a href="#comment-ca-marche" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Comment ça marche
            </a>
            <a href="#arrets" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Arrêts
            </a>
            <a href="#equipe" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              L'Équipe
            </a>
            <a href="#assistant" className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline">
              Rechercher un trajet
            </a>
          </div>

          <p className="text-xs text-zinc-400">
            © 2026 gemmaday · Lubumbashi
          </p>
        </div>
      </div>
    </footer>
  );
}
