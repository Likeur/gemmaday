"use client";

import { taxiStops } from "@/data/taxi-stops";

interface TaxiStopsGridProps {
  onSelectStop: (stopName: string) => void;
}

export function TaxiStopsGrid({ onSelectStop }: TaxiStopsGridProps) {
  return (
    <section id="arrets" className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Arrêts de taxi repères
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Liste des 12 principaux points d'embarquement répertoriés à Lubumbashi.
            Cliquez sur un arrêt pour lancer une recherche vers cette direction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {taxiStops.map((stop) => (
            <div
              key={stop.id}
              className="flex flex-col justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/40 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {stop.name}
                  </h3>
                  <span className="font-mono text-[11px] text-zinc-500 uppercase">
                    {stop.id}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
                  {stop.address}
                </p>

                <div className="rounded border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 mb-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-zinc-900 dark:text-zinc-200 block mb-0.5">
                    Desserte :
                  </span>
                  {stop.serves}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectStop(`Je veux aller à : ${stop.name}`)}
                className="mt-2 w-full rounded-md bg-zinc-900 px-3.5 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 active:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Sélectionner cet itinéraire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
