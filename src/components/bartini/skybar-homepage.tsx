"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/bartini/animated-section";
import { ScrollProgress } from "@/components/bartini/scroll-progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Language = "ro" | "en";

const galleryItems = [
  {
    image: "/images/gallery-1-original.jpg",
    titleRo: "Top Shelf Signature",
    titleEn: "Top Shelf Signature",
    subtitleRo: "Cocktailuri premium cu semnatura Bartini",
    subtitleEn: "Signature premium cocktails by Bartini",
  },
  {
    image: "/images/gallery-2.jpg",
    titleRo: "Skyline la Apus",
    titleEn: "Golden Hour Skyline",
    subtitleRo: "Bucurestiul vazut de la inaltime",
    subtitleEn: "Bucharest skyline from above",
  },
  {
    image: "/images/gallery-3.png",
    video: "/images/signature-nights.mp4",
    titleRo: "Nopti Emblematice",
    titleEn: "Signature Nights",
    subtitleRo: "Muzica, energie si vibe exclusiv",
    subtitleEn: "Music, energy, and exclusive nightlife",
  },
  {
    image: "/images/gallery-4.jpg",
    titleRo: "Interior Premium",
    titleEn: "Premium Interior",
    subtitleRo: "Design elegant cu atmosfera sofisticata",
    subtitleEn: "Elegant design and refined atmosphere",
  },
];

const eventItems = [
  {
    titleRo: "Evenimente Corporate",
    titleEn: "Corporate Events",
    textRo: "Setups private pentru lansari, networking si seri executive.",
    textEn: "Private rooftop setups for launches, networking, and executive evenings.",
  },
  {
    titleRo: "Petreceri Aniversare",
    titleEn: "Birthday Parties",
    textRo: "Mese skyline, meniuri personalizate si servicii premium.",
    textEn: "Skyline tables, custom menus, and premium service.",
  },
  {
    titleRo: "Nopti Speciale",
    titleEn: "Special Nights",
    textRo: "Concepte speciale pentru seri memorabile la inaltime.",
    textEn: "Curated concepts for unforgettable rooftop nights.",
  },
];

const testimonials = [
  {
    name: "Andreea S.",
    quoteRo:
      "Atmosfera premium de la primul pas. Cocktailurile sunt excelente.",
    quoteEn:
      "Premium atmosphere from the first step. The cocktails are excellent.",
  },
  {
    name: "Vlad P.",
    quoteRo: "Pentru mine este rooftop-ul numarul 1 din Bucuresti.",
    quoteEn: "For me, this is the number one rooftop in Bucharest.",
  },
  {
    name: "Mara I.",
    quoteRo: "Elegant, modern si cu un vibe international.",
    quoteEn: "Elegant, modern, and with an international vibe.",
  },
];

const instagramShowcase = [
  {
    src: "/images/follow-ig-1.png",
    type: "image" as const,
    objectPosition: "center 34%",
    labelRo: "Mixologie",
    labelEn: "Mixology",
  },
  {
    src: "/images/follow-ig-2.mp4",
    type: "video" as const,
    objectPosition: "center",
    labelRo: "Noapte Live",
    labelEn: "Live Night",
  },
  {
    src: "/images/ig-video.mp4",
    type: "video" as const,
    objectPosition: "center",
    labelRo: "Skyline Live",
    labelEn: "Skyline Live",
  },
  {
    src: "/images/follow-ig-4.jpg",
    type: "image" as const,
    objectPosition: "center 28%",
    labelRo: "Atmosfera",
    labelEn: "Atmosphere",
  },
];

const openingHours = [
  { ro: "luni", en: "Monday", hours: "12:00 - 01:00" },
  { ro: "marti", en: "Tuesday", hours: "12:00 - 01:00" },
  { ro: "miercuri", en: "Wednesday", hours: "12:00 - 01:00" },
  { ro: "joi", en: "Thursday", hours: "12:00 - 01:00" },
  { ro: "vineri", en: "Friday", hours: "12:00 - 02:00" },
  { ro: "sambata", en: "Saturday", hours: "12:00 - 02:00" },
  { ro: "duminica", en: "Sunday", hours: "12:00 - 01:00" },
];

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function RomaniaFlag(props: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={props.className} aria-hidden>
      <rect width="10" height="20" fill="#0033A0" />
      <rect x="10" width="10" height="20" fill="#FCD116" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </svg>
  );
}

function EnglandFlag(props: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={props.className} aria-hidden>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect x="12" width="6" height="20" fill="#CF142B" />
      <rect y="7" width="30" height="6" fill="#CF142B" />
      <rect
        width="30"
        height="20"
        fill="none"
        stroke="#DADADA"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function InstaIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
      <rect
        x="3.4"
        y="3.4"
        width="17.2"
        height="17.2"
        rx="5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FbIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
      <path
        d="M14 8h2V5h-2c-2.6 0-4 1.5-4 4v2H8v3h2v5h3v-5h3l.6-3H13V9.3c0-.8.3-1.3 1-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
      <path
        d="M14.4 4h2.6c.3 1.6 1.2 2.7 2.8 3v2.6a6.7 6.7 0 0 1-2.7-.8V15a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .9.1v2.8a2.7 2.7 0 1 0 1.6 2.5V4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group max-w-3xl">
      <p className="text-xs uppercase tracking-[0.42em] text-[var(--gold)]/90">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] transition-all duration-500 group-hover:w-28" />
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SkybarHomepage({ currentYear }: { currentYear: number }) {
  const [navSolid, setNavSolid] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [language, setLanguage] = useState<Language>("ro");
  const languageInitialized = useRef(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const isRo = language === "ro";

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallax = useTransform(heroProgress, [0, 1], ["0%", "16%"]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncLanguage = (nextLanguage: Language) => {
      window.localStorage.setItem("bartini-language", nextLanguage);
      document.documentElement.lang = nextLanguage;
      const nextUrl = new URL(window.location.href);
      if (nextLanguage === "ro") {
        nextUrl.searchParams.delete("lang");
      } else {
        nextUrl.searchParams.set("lang", "en");
      }
      window.history.replaceState({}, "", nextUrl.toString());
    };

    const urlLang = new URLSearchParams(window.location.search).get("lang");
    let nextLanguage: Language = "ro";
    if (urlLang === "en" || urlLang === "ro") {
      nextLanguage = urlLang;
    } else {
      const saved = window.localStorage.getItem("bartini-language");
      if (saved === "en" || saved === "ro") {
        nextLanguage = saved;
      }
    }

    const raf = window.requestAnimationFrame(() => {
      languageInitialized.current = true;
      setLanguage(nextLanguage);
      syncLanguage(nextLanguage);
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!languageInitialized.current) {
      return;
    }
    window.localStorage.setItem("bartini-language", language);
    document.documentElement.lang = language;
    const nextUrl = new URL(window.location.href);
    if (language === "ro") {
      nextUrl.searchParams.delete("lang");
    } else {
      nextUrl.searchParams.set("lang", "en");
    }
    window.history.replaceState({}, "", nextUrl.toString());
  }, [language]);

  const navItems = isRo
    ? [
      { label: "Experienta", href: "experience" },
      { label: "Galerie", href: "moments" },
      { label: "Evenimente", href: "events" },
      { label: "Contact", href: "contact" },
    ]
    : [
      { label: "Experience", href: "experience" },
      { label: "Gallery", href: "moments" },
      { label: "Events", href: "events" },
      { label: "Contact", href: "contact" },
    ];

  const onBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingSent(true);
  };

  return (
    <div className="relative isolate overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <ScrollProgress />
      <div className="bg-ambient animate-ambient pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_70%_15%,rgba(163,0,0,0.16),transparent_52%)]" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition duration-500",
          navSolid
            ? "border-white/12 bg-[rgba(8,8,8,0.82)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => scrollToId("hero")}
            aria-label="Go to top"
          >
            <span className="relative inline-flex h-11 w-11 overflow-hidden rounded-full border border-white/18 bg-black/40 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/logo.jpg"
                alt="Bartini Rooftop logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </span>
            <span>
              <p className="font-display text-lg text-white">Bartini Rooftop</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/80">
                Bucharest
              </p>
            </span>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                className="group relative text-xs uppercase tracking-[0.16em] text-white/75 transition hover:text-white"
                onClick={() => scrollToId(item.href)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-white/18 bg-black/35 p-1 backdrop-blur-md">
              {(["ro", "en"] as const).map((lang) => {
                const isActive = language === lang;
                const FlagIcon = lang === "ro" ? RomaniaFlag : EnglandFlag;
                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    aria-pressed={isActive}
                    aria-label={`Switch language to ${lang.toUpperCase()}`}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium tracking-[0.12em] transition",
                      isActive
                        ? "bg-white/12 text-white"
                        : "text-white/62 hover:bg-white/8 hover:text-white",
                    )}
                  >
                    <FlagIcon className="h-3.5 w-5 rounded-[2px]" />
                    <span>{lang.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => scrollToId("reserve")}
            >
              {isRo ? "Rezerva" : "Reserve"}
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-24 md:pb-0">
        <section
          id="hero"
          ref={heroRef}
          className="relative flex min-h-[100svh] items-end overflow-hidden pt-20"
        >
          <motion.div style={{ y: heroParallax }} className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/heroimg.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.2),rgba(10,10,10,0.8)_50%,rgba(10,10,10,0.98)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(201,162,39,0.12),transparent_40%)]" />

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-[4.5rem] lg:px-8 lg:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]/90"
            >

            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl"
            >
              {"The city's coolest top shelf"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 max-w-xl text-base text-white/82 sm:text-lg"
            >
              {isRo
                ? "Cocktailuri la inaltime. Gustari elevate. Vibe-uri memorabile."
                : "Sky-high sips. Elevated bites. Big vibes."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" onClick={() => scrollToId("reserve")}>
                {isRo ? "Rezerva o Masa" : "Reserve a Table"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToId("experience")}
              >
                {isRo ? "Exploreaza Experienta" : "Explore the Experience"}
              </Button>
            </motion.div>
          </div>
        </section>

        <AnimatedSection
          id="experience"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <Reveal>
              <SectionTitle
                eyebrow={isRo ? "Experienta" : "Experience"}
                title={
                  isRo
                    ? "O Noapte Elevata Deasupra Orasului"
                    : "An Elevated Night Above the City"
                }
                description={
                  isRo
                    ? "La Bartini, fiecare seara aduce panorama Bucurestiului, cocktailuri signature si o atmosfera premium, intr-un rooftop cu energie exclusivista."
                    : "At Bartini, every evening unfolds with skyline views, signature cocktails, and a curated premium rooftop atmosphere."
                }
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-6 sm:gap-7 md:grid-cols-[1fr_0.92fr] md:items-start lg:gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-black/45 shadow-2xl backdrop-blur-md"
                >
                  <Image
                    src="/images/experience-1.jpg"
                    alt="Signature cocktail close-up"
                    width={960}
                    height={720}
                    sizes="(max-width: 1024px) 70vw, 32vw"
                    className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[420px]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.84)_86%)]" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <p className="font-display text-2xl text-white">
                      {isRo ? "Mixologie Signature" : "Signature Mixology"}
                    </p>
                    <p className="mt-1 text-sm text-white/72">
                      {isRo
                        ? "Retete premium, prezentari impecabile"
                        : "Premium recipes, flawless presentation"}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: 0.15 }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-black/45 shadow-2xl backdrop-blur-md md:mt-11"
                >
                  <Image
                    src="/images/experience-2.jpg"
                    alt="Bartini interior mood"
                    width={960}
                    height={720}
                    sizes="(max-width: 1024px) 68vw, 28vw"
                    className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[360px]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.84)_86%)]" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <p className="font-display text-2xl text-white">
                      {isRo ? "Atmosfera Elevata" : "Elevated Atmosphere"}
                    </p>
                    <p className="mt-1 text-sm text-white/72">
                      {isRo
                        ? "Design rafinat, lumina calda, energie exclusivista"
                        : "Refined design, warm light, exclusive energy"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="moments"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow={isRo ? "Momente Emblematice" : "Signature Moments"}
              title={
                isRo
                  ? "O Galerie A Dorintei Urbane"
                  : "A Gallery of Rooftop Desire"
              }
              description={
                isRo
                  ? "Cadre cinematice cu cocktailuri premium, panorama orasului si nopti spectaculoase."
                  : "Cinematic frames with premium cocktails, skyline views, and iconic nights."
              }
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mt-8 md:hidden">
              <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 pr-16">
                {galleryItems.map((item) => (
                  <motion.article
                    key={item.titleEn}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.52 }}
                    whileHover={{ y: -6 }}
                    className="w-[70%] shrink-0 snap-start overflow-hidden rounded-[28px] border border-white/12 bg-black/55"
                  >
                    {item.video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={item.image}
                        className="h-72 w-full object-cover"
                        aria-label={isRo ? item.titleRo : item.titleEn}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={item.image}
                        alt={isRo ? item.titleRo : item.titleEn}
                        width={960}
                        height={720}
                        sizes="70vw"
                        className="h-72 w-full object-cover"
                      />
                    )}
                    <div className="p-5">
                      <p className="font-display text-2xl text-white">
                        {isRo ? item.titleRo : item.titleEn}
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        {isRo ? item.subtitleRo : item.subtitleEn}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--bg)] to-transparent" />
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-black/55 px-2 py-1 text-xs text-white/70">
                &gt;
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 hidden grid-cols-12 gap-5 md:grid">
              {galleryItems.map((item, index) => (
                <motion.article
                  key={item.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.56, delay: index * 0.06 }}
                  whileHover={{ y: -8 }}
                  className={cn(
                    "group relative overflow-hidden rounded-[30px] border border-white/12 bg-black/50",
                    index === 0 && "col-span-7 row-span-2 min-h-[500px]",
                    index === 1 && "col-span-5 min-h-[245px]",
                    index === 2 && "col-span-5 min-h-[245px]",
                    index === 3 && "col-span-7 min-h-[245px]",
                  )}
                >
                  {item.video ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={item.image}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      aria-label={isRo ? item.titleRo : item.titleEn}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={item.image}
                      alt={isRo ? item.titleRo : item.titleEn}
                      width={960}
                      height={720}
                      sizes="(min-width: 768px) 45vw, 95vw"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.86)_88%)]" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="font-display text-2xl text-white">
                      {isRo ? item.titleRo : item.titleEn}
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      {isRo ? item.subtitleRo : item.subtitleEn}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </AnimatedSection>

        <AnimatedSection
          id="reserve"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow={isRo ? "Rezervari" : "Reservations"}
              title={isRo ? "Rezerva Masa Ta" : "Reserve Your Table"}
              description={
                isRo
                  ? "Interfata demo inspirata din ospitalitatea premium."
                  : "Demo booking interface inspired by luxury hospitality."
              }
            />
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="mt-8 rounded-[32px] border-[var(--gold)]/30 bg-[linear-gradient(145deg,rgba(18,18,18,0.92),rgba(10,10,10,0.82))] p-6 sm:p-8">
              <form onSubmit={onBookingSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/65">
                    {isRo ? "Data" : "Date"}
                  </span>
                  <input type="date" required className="h-12 w-full rounded-2xl border border-white/15 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-[var(--gold)]/70" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/65">
                    {isRo ? "Ora" : "Time"}
                  </span>
                  <select required defaultValue="" className="h-12 w-full rounded-2xl border border-white/15 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-[var(--gold)]/70">
                    <option value="" disabled>{isRo ? "Selecteaza ora" : "Select time"}</option>
                    <option>18:00</option>
                    <option>19:30</option>
                    <option>21:00</option>
                    <option>22:30</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/65">
                    {isRo ? "Persoane" : "Guests"}
                  </span>
                  <select required defaultValue="" className="h-12 w-full rounded-2xl border border-white/15 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-[var(--gold)]/70">
                    <option value="" disabled>{isRo ? "Selecteaza numarul de persoane" : "Select guests"}</option>
                    <option>{isRo ? "2 persoane" : "2 guests"}</option>
                    <option>{isRo ? "4 persoane" : "4 guests"}</option>
                    <option>{isRo ? "6 persoane" : "6 guests"}</option>
                    <option>{isRo ? "8+ persoane" : "8+ guests"}</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/65">
                    {isRo ? "Nume Complet" : "Full Name"}
                  </span>
                  <input type="text" required placeholder={isRo ? "Nume Complet" : "Full Name"} className="h-12 w-full rounded-2xl border border-white/15 bg-black/35 px-4 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[var(--gold)]/70" />
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/65">
                    {isRo ? "Telefon" : "Phone"}
                  </span>
                  <input type="tel" required placeholder="+40" className="h-12 w-full rounded-2xl border border-white/15 bg-black/35 px-4 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[var(--gold)]/70" />
                </label>
                <Button type="submit" size="lg" className="mt-2 w-full md:col-span-2">
                  {isRo ? "Trimite Solicitarea" : "Request Reservation"}
                </Button>
                <p className="text-sm text-white/55 md:col-span-2">
                  {isRo
                    ? "Rezervarile sunt supuse confirmarii."
                    : "Reservations are subject to confirmation."}
                </p>
                {bookingSent ? (
                  <p className="rounded-2xl border border-[var(--gold)]/35 bg-[rgba(201,162,39,0.09)] px-4 py-3 text-sm text-[var(--gold)] md:col-span-2">
                    {isRo
                      ? "Solicitarea demo a fost trimisa. Echipa noastra te va contacta in scurt timp."
                      : "Demo request sent. Our team will contact you shortly."}
                  </p>
                ) : null}
              </form>
            </Card>
          </Reveal>
        </AnimatedSection>

        <AnimatedSection
          id="events"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow={isRo ? "Evenimente Private" : "Private Events"}
              title={
                isRo
                  ? "Evenimente Private si Celebrari"
                  : "Private Events & Celebrations"
              }
              description={
                isRo
                  ? "Organizeaza momente speciale intr-un rooftop exclusiv."
                  : "Host special moments in an exclusive rooftop setting."
              }
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {eventItems.map((item) => (
                <Card key={item.titleEn} className="rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-[var(--gold)]/45">
                  <div className="mb-5 h-px w-16 bg-[linear-gradient(90deg,var(--gold),transparent)]" />
                  <h3 className="font-display text-2xl text-white">
                    {isRo ? item.titleRo : item.titleEn}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {isRo ? item.textRo : item.textEn}
                  </p>
                </Card>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <Button variant="secondary" size="lg">
              {isRo ? "Planifica Evenimentul" : "Plan Your Event"}
            </Button>
          </Reveal>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionTitle
              eyebrow="Social Proof"
              title={isRo ? "Apreciat de Oras" : "Loved by the City"}
              description={
                isRo
                  ? "Recenzii puternice, comunitate fidela si seri memorabile."
                  : "Strong reviews, loyal guests, and memorable nights."
              }
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="rounded-[30px] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-white/65">
                  {isRo ? "Rating Google" : "Google Rating"}
                </p>
                <p className="font-display mt-4 text-6xl text-white">4.8</p>
                <p className="mt-1 text-[var(--gold)]">
                  {isRo ? "4.8 din 5" : "4.8 out of 5"}
                </p>
              </Card>
              <div className="grid gap-4 md:grid-cols-3">
                {testimonials.map((item) => (
                  <Card key={item.name} className="rounded-[30px] p-6">
                    <p className="text-sm leading-relaxed text-white/74">
                      {isRo ? item.quoteRo : item.quoteEn}
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[var(--gold)]/80">
                      {item.name}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--gold)]/80">
              {isRo ? "Urmareste-ne pe Instagram" : "Follow Us on Instagram"}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {instagramShowcase.map((item, index) => (
                <motion.article
                  key={`${item.src}-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 0.48, delay: index * 0.06 }}
                  whileHover={{ y: -5 }}
                  className={cn(
                    "group relative overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(22,22,22,0.92),rgba(10,10,10,0.92))] p-1 shadow-[0_20px_38px_rgba(0,0,0,0.34)]",
                    item.type === "video" ? "sm:row-span-2" : "",
                  )}
                >
                  <div className={cn("relative overflow-hidden rounded-[20px]", item.type === "video" ? "aspect-[4/7]" : "aspect-[4/5]")}>
                    {item.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: item.objectPosition }}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={item.src}
                        alt={`${isRo ? "Cadru Instagram Bartini" : "Bartini Instagram frame"} ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 48vw, 22vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: item.objectPosition }}
                      />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.84)_88%)]" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/78">
                        {isRo ? item.labelRo : item.labelEn}
                      </p>
                      <InstaIcon className="h-4 w-4 text-white/82" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </AnimatedSection>

        <AnimatedSection
          id="contact"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          <Reveal>
            <SectionTitle
              eyebrow={isRo ? "Locatie" : "Location"}
              title={
                isRo
                  ? "Ne Gasesti Deasupra Bucurestiului"
                  : "Find Us Above Bucharest"
              }
              description={
                isRo
                  ? "Locatie centrala, atmosfera premium, seri memorabile."
                  : "Central location, premium atmosphere, unforgettable nights."
              }
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="rounded-[30px] p-7">
                <ul className="space-y-4 text-sm text-white/75">
                  <li>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]/80">
                      {isRo ? "Adresa" : "Address"}
                    </p>
                    <p className="mt-1 text-base text-white">
                      {isRo
                        ? "T Floor (acces pe scari de la M floor), Strada Constantin Mille 18, 030167 Bucuresti"
                        : "T Floor (stairs access from M floor), 18 Strada Constantin Mille, 030167 Bucharest"}
                    </p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]/80">
                      {isRo ? "Program" : "Opening Hours"}
                    </p>
                    <div className="mt-2 space-y-1">
                      {openingHours.map((item) => (
                        <p
                          key={item.en}
                          className="flex items-center justify-between gap-6 text-sm text-white/85"
                        >
                          <span className="capitalize text-white/72">
                            {isRo ? item.ro : item.en}
                          </span>
                          <span className="text-white">{item.hours}</span>
                        </p>
                      ))}
                    </div>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]/80">
                      {isRo ? "Telefon" : "Phone"}
                    </p>
                    <p className="mt-1 text-base text-white">031 221 5826</p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]/80">
                      Email
                    </p>
                    <p className="mt-1 text-base text-white">
                      reservations@bartinirooftop.ro
                    </p>
                  </li>
                </ul>
              </Card>

              <Card className="relative min-h-[280px] overflow-hidden rounded-[30px] p-0">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1a1a,#111,#171717)]" />
                <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(163,0,0,0.62),rgba(163,0,0,0.06))]" />
                <div className="relative z-10 flex h-full flex-col justify-between p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    {isRo ? "Harta Demo" : "Map Demo"}
                  </p>
                  <div className="max-w-xs rounded-2xl border border-white/15 bg-black/55 px-4 py-3 backdrop-blur">
                    <p className="font-display text-lg text-white">
                      Bartini Rooftop
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      {isRo
                        ? "Strada Constantin Mille 18, Bucuresti"
                        : "18 Strada Constantin Mille, Bucharest"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        </AnimatedSection>
      </main>

      <footer className="border-t border-white/12 bg-black/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-display text-3xl text-white">Bartini Rooftop</p>
              <p className="mt-2 text-xs uppercase tracking-[0.26em] text-[var(--gold)]/80">
                {"The city's coolest top shelf"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[InstaIcon, FbIcon, TikTokIcon].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/45">
            (c) {currentYear} Bartini Rooftop. Demo concept website.
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[rgba(10,10,10,0.86)] p-4 backdrop-blur-xl md:hidden">
        <Button className="w-full" onClick={() => scrollToId("reserve")}>
          {isRo ? "Rezerva o Masa" : "Reserve a Table"}
        </Button>
      </div>
    </div>
  );
}
