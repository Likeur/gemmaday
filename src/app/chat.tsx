"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { TaxiStop } from "@/data/taxi-stops";
import type { LocationState, MapPoint } from "./route-map";
import { MessageContent } from "./message-content";

const StopPanel = dynamic(() => import("./route-map").then((mod) => mod.StopPanel), {
  ssr: false,
  loading: () => <p className="mt-4 text-sm text-zinc-500">Chargement de la carte…</p>,
});

type Message = {
  role: "user" | "model";
  text: string;
  stop?: TaxiStop | null;
};

const suggestions = [
  "Je veux aller au marché Kenya",
  "Comment aller à l’université ?",
  "Je dois aller à l’aéroport",
  "Où prendre un taxi pour l’hôpital Sendwe ?",
];

export function Chat({
  model,
  promptTrigger,
  onPromptConsumed,
}: {
  model: string;
  promptTrigger?: string | null;
  onPromptConsumed?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [origin, setOrigin] = useState<MapPoint | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const threadRef = useRef<HTMLDivElement>(null);
  const consumedPromptRef = useRef<string | null>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const locate = useCallback(() => {
    if (locationState === "ready" || locationState === "locating") return;
    if (!navigator.geolocation) {
      setLocationState("unsupported");
      return;
    }
    setLocationState("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationState("ready");
      },
      () => setLocationState("denied"),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  }, [locationState]);

  const sendText = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const nextMessages: Message[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setDraft("");
    setError(null);
    setPending(true);
    locate();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text: turnText }) => ({ role, text: turnText })),
        }),
      });
      const data = (await response.json()) as {
        text?: string;
        error?: string;
        stop?: TaxiStop | null;
      };
      if (!response.ok || !data.text) {
        throw new Error(data.error ?? "La réponse du modèle est vide.");
      }
      setMessages((current) => [
        ...current,
        { role: "model", text: data.text!, stop: data.stop ?? null },
      ]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Envoi impossible.");
    } finally {
      setPending(false);
    }
  }, [locate, messages, pending]);

  useEffect(() => {
    if (!promptTrigger) {
      consumedPromptRef.current = null;
      return;
    }
    if (pending || consumedPromptRef.current === promptTrigger) return;
    consumedPromptRef.current = promptTrigger;
    void sendText(promptTrigger);
    onPromptConsumed?.();
  }, [promptTrigger, pending, onPromptConsumed, sendText]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendText(draft);
  }

  return (
    <div className="mx-auto flex h-[620px] max-h-[85vh] w-full max-w-4xl flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-6 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Service de transport · Lubumbashi
          </p>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Rechercher un arrêt de taxi
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {locationState === "ready" ? (
            <span className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Position GPS active
            </span>
          ) : locationState === "locating" ? (
            <span className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Localisation...
            </span>
          ) : (
            <button
              type="button"
              onClick={locate}
              className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Activer ma position
            </button>
          )}

          <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {model}
          </span>
        </div>
      </header>

      <div ref={threadRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-5">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col justify-end gap-4">
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Indiquez votre lieu de destination à Lubumbashi. Nous sélectionnons l'arrêt le plus
              proche, son adresse et l'itinéraire d'accès.
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendText(suggestion)}
                  className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-left text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) =>
            message.role === "user" ? (
              <article
                key={`${message.role}-${index}`}
                className="ml-auto max-w-[85%] rounded-lg bg-zinc-900 px-4 py-3 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
              >
                <p className="mb-1 text-[11px] font-semibold tracking-wide text-zinc-400 dark:text-zinc-500 uppercase">
                  Votre demande
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
              </article>
            ) : (
              <article key={`${message.role}-${index}`} className="w-full">
                <p className="mb-1 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
                  Orientation
                </p>
                <MessageContent text={message.text} />
                {message.stop ? (
                  <StopPanel stop={message.stop} origin={origin} locationState={locationState} />
                ) : null}
              </article>
            ),
          )
        )}
        {pending ? <p className="text-xs text-zinc-500">Recherche de l'arrêt en cours...</p> : null}
        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </p>
        ) : null}
      </div>

      <form
        onSubmit={sendMessage}
        className="flex shrink-0 gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-3 bg-white dark:bg-zinc-950"
      >
        <label className="sr-only" htmlFor="message">
          Destination
        </label>
        <textarea
          id="message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          rows={2}
          placeholder="Ex : Je veux aller au marché Kenya..."
          className="min-h-12 flex-1 resize-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
        />
        <button
          type="submit"
          disabled={pending || draft.trim().length === 0}
          className="h-12 rounded-lg bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
