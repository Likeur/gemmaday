"use client";

const steps = [
  {
    number: "1",
    title: "Position de départ",
    description:
      "Activez la géolocalisation pour calculer l'arrêt le plus proche de votre emplacement actuel, ou commencez depuis la Poste centrale de Lubumbashi.",
  },
  {
    number: "2",
    title: "Indiquez votre destination",
    description:
      "Écrivez simplement le nom du quartier, du marché, de l'hôpital ou du site où vous devez vous rendre.",
  },
  {
    number: "3",
    title: "Arrêt et itinéraire",
    description:
      "Obtenez le nom exact de l'arrêt de taxi, son adresse physique et l'itinéraire tracé sur la carte routière.",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Comment ça marche
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Un processus direct en trois étapes pour trouver son transport urbain à Lubumbashi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-6"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-sm mb-4">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
