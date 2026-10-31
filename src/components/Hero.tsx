"use client";

interface HeroProps {
  onStartClick: () => void;
  onSuggestionClick: (prompt: string) => void;
}

const quickDestinations = [
  { label: "Marché Kenya", prompt: "Je veux aller au marché Kenya" },
  { label: "Université UNILU", prompt: "Comment aller à l’université de Lubumbashi ?" },
  { label: "Aéroport de la Luano", prompt: "Je dois aller à l’aéroport de Lubumbashi" },
  { label: "Hôpital Jason Sendwe", prompt: "Où prendre un taxi pour l’hôpital Sendwe ?" },
];

export function Hero({ onStartClick, onSuggestionClick }: HeroProps) {
  return (
    <section id="presentation" className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Project Tag */}
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6">
          <span>Projet Lubumbashi</span>
          <span className="text-zinc-400">·</span>
          <span>Mobilité urbaine & Taxis</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-3xl mx-auto leading-tight">
          Trouvez l'arrêt de taxi qui dessert votre destination à Lubumbashi
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Vous venez d'arriver ou vous ne connaissez pas l'organisation des transports ?
          Indiquez où vous souhaitez vous rendre : nous identifions l'arrêt de taxi le plus proche,
          son adresse exacte et le trajet à pied ou en voiture.
        </p>

        {/* Real solid buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartClick}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-zinc-900 px-7 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-zinc-800 active:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Commencer
          </button>

          <a
            href="#arrets"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3.5 text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Consulter les arrêts
          </a>
        </div>

        {/* Fast Destination Buttons */}
        <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
            Destinations courantes :
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickDestinations.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onSuggestionClick(item.prompt)}
                className="inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">12</p>
            <p className="text-xs text-zinc-500 mt-0.5">Arrêts repères vérifiés</p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">OpenStreetMap</p>
            <p className="text-xs text-zinc-500 mt-0.5">Données géographiques</p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">OSRM</p>
            <p className="text-xs text-zinc-500 mt-0.5">Calcul de distance & temps</p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Gemma</p>
            <p className="text-xs text-zinc-500 mt-0.5">Traitement de la requête</p>
          </div>
        </div>
      </div>
    </section>
  );
}
