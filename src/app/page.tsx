"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { TaxiStopsGrid } from "@/components/TaxiStopsGrid";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";
import { Chat } from "./chat";

export default function Home() {
  const [promptTrigger, setPromptTrigger] = useState<string | null>(null);

  function handleStart() {
    const el = document.getElementById("assistant");
    el?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("message")?.focus({ preventScroll: true });
  }

  function handleSelectPrompt(prompt: string) {
    setPromptTrigger(prompt);
    const el = document.getElementById("assistant");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-orange-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onStartClick={handleStart} />

      <main className="flex-1">
        {/* Hero Section with Commencer CTA */}
        <Hero
          onStartClick={handleStart}
          onSuggestionClick={handleSelectPrompt}
        />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Section Recherche de trajet */}
        <section
          id="assistant"
          className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Recherche de trajet
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Trouver un arrêt de taxi
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Saisissez votre lieu d'arrivée pour obtenir l'arrêt le plus adapté et visualiser l'itinéraire.
              </p>
            </div>

            {/* Chat Assistant */}
            <Chat
              model="gemma-4-31b-it"
              promptTrigger={promptTrigger}
              onPromptConsumed={() => setPromptTrigger(null)}
            />
          </div>
        </section>

        {/* Key Lubumbashi Taxi Stops Catalog */}
        <TaxiStopsGrid onSelectStop={handleSelectPrompt} />

        {/* The Group & Hackathon Team Section */}
        <TeamSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
