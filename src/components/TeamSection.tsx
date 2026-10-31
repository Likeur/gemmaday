"use client";

const teamRoles = [
  {
    pole: "Pôle 1",
    title: "Cartographie des arrêts",
    desc: "Recensement des 12 arrêts repères de Lubumbashi, relevé des coordonnées GPS OpenStreetMap et documentation des lignes de desserte.",
  },
  {
    pole: "Pôle 2",
    title: "Logique & Traitement",
    desc: "Définition des règles d'orientation, filtrage des arrêts selon la géolocalisation et liaison avec le service de réponse.",
  },
  {
    pole: "Pôle 3",
    title: "Moteur Cartographique",
    desc: "Intégration de la carte Leaflet et calcul des tracés routiers réels avec OSRM (distances en mètres et temps indicatif).",
  },
  {
    pole: "Pôle 4",
    title: "Interface & Parcours",
    desc: "Conception de l'interface publique, accessibilité sur mobile et ordinateur, ergonomie du formulaire de destination.",
  },
];

export function TeamSection() {
  return (
    <section id="equipe" className="py-16 sm:py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            L'Équipe du Projet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Organisation du travail de notre groupe pour le développement de l'application de transport à Lubumbashi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamRoles.map((item) => (
            <div
              key={item.pole}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs"
            >
              <span className="inline-block rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                {item.pole}
              </span>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center">
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Projet collaboratif réalisé dans le cadre du Hackathon de Lubumbashi pour simplifier les déplacements urbains.
          </p>
        </div>
      </div>
    </section>
  );
}
