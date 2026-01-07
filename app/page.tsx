"use client";

import {
  useAlbumMedia,
  MediaItem as MediaItemType,
} from "@/app/hooks/useAlbumMedia";
import { albumConfig } from "@/app/data/albumConfig";
import { motion, useInView } from "framer-motion";
import MediaItem from "@/app/components/gallery/MediaItem";
import FilmGrain from "@/app/components/effects/FilmGrain";
import PasswordProtection from "@/app/components/PasswordProtection";
import {
  ChevronDown,
  Heart,
  Sparkles,
  Star,
  Camera,
  Music,
  Plane,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const { media, isLoading } = useAlbumMedia();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-vintage-cream">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-vintage-hand text-4xl text-vintage-dark"
        >
          ✨ Wird geladen... ✨
        </motion.div>
      </div>
    );
  }

  return (
    <PasswordProtection>
      <main className="min-h-screen bg-vintage-cream overflow-x-hidden paper-texture">
        <FilmGrain />

        {/* Floating decorative elements */}
        <FloatingDoodles />

        {/* Landing Hero */}
        <LandingHero />

        {/* Love Marquee */}
        <LoveMarquee />

        {/* Ski Trip - Horizontal Scroll (FIXED) */}
        {media["02-ski-trip"] && (
          <HorizontalScrollSection
            config={albumConfig.sections["02-ski-trip"]}
            items={media["02-ski-trip"]}
            bgColor="bg-gradient-to-b from-vintage-cream to-[#e8f4f8]"
            emoji="⛷️"
          />
        )}

        {/* Germany Hiking - Instant Camera Style */}
        {media["03-germany-hiking"] && (
          <InstantCameraSection
            config={albumConfig.sections["03-germany-hiking"]}
            items={media["03-germany-hiking"]}
            bgColor="bg-[#f5f0e8]"
          />
        )}

        {/* Croatia - Film Strip */}
        {media["04-croatia"] && (
          <FilmStripSection
            config={albumConfig.sections["04-croatia"]}
            items={media["04-croatia"]}
            bgColor="bg-vintage-dark"
          />
        )}

        {/* Switzerland - Masonry Grid (FIXED - shows ALL images) */}
        {media["06-switzerland"] && (
          <MasonrySection
            config={albumConfig.sections["06-switzerland"]}
            items={media["06-switzerland"]}
            bgColor="bg-gradient-to-b from-[#e8e2d8] to-[#d4e8d9]"
          />
        )}

        {/* Hamburg - Scrapbook Style */}
        {media["05-hamburg"] && (
          <ScrapbookSection
            config={albumConfig.sections["05-hamburg"]}
            items={media["05-hamburg"]}
            bgColor="bg-[#f0ebe3]"
          />
        )}

        {/* Egypt - Beach Vibes Carousel */}
        {media["07-egypt"] && (
          <BeachVibesSection
            config={albumConfig.sections["07-egypt"]}
            items={media["07-egypt"]}
            bgColor="bg-gradient-to-b from-[#f5ebe0] to-[#ffe4c9]"
          />
        )}

        {/* Stuttgart - Polaroid Scatter */}
        {media["08-stuttgart"] && (
          <PolaroidScatterSection
            config={albumConfig.sections["08-stuttgart"]}
            items={media["08-stuttgart"]}
            bgColor="bg-[#f0ebe3]"
          />
        )}

        {/* Everyday Moments - Photo Wall */}
        {media["09-everyday-moments"] && (
          <PhotoWallSection
            config={albumConfig.sections["09-everyday-moments"]}
            items={media["09-everyday-moments"]}
            bgColor="bg-vintage-cream"
          />
        )}

        {/* Romantic Transition */}
        <RomanticTransition />

        {/* Birthday Finale - More Romantic */}
        <BirthdayFinale />
      </main>
    </PasswordProtection>
  );
}

// Floating doodles in background
function FloatingDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${8 + i * 8}%`,
            top: `${10 + ((i * 7) % 80)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {i % 4 === 0 ? (
            <Heart className="w-6 h-6 text-red-300/40" fill="currentColor" />
          ) : i % 4 === 1 ? (
            <Star
              className="w-5 h-5 text-vintage-gold/50"
              fill="currentColor"
            />
          ) : i % 4 === 2 ? (
            <Sparkles className="w-4 h-4 text-vintage-sepia/40" />
          ) : (
            <span className="text-2xl opacity-30">✨</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Love Marquee - scrolling love text
function LoveMarquee() {
  return (
    <div className="py-6 bg-vintage-dark/5 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-vintage-hand text-2xl md:text-3xl text-vintage-accent/60 mx-8"
          >
            ❤️ Ski-Abenteuer • 🏔️ Wandern • 🌊 Kroatien • 🎭 Hamburg • 🏔️
            Schweiz • ☀️ Ägypten • 🎵 Stuttgart • 💕 Alltag • ✨ Liebe •
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Landing Hero with playful animations
function LandingHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">
      {/* Decorative circles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 border-dashed border-vintage-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full border-2 border-dotted border-vintage-accent/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating hearts around title */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${25 + i * 10}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Heart className="w-4 h-4 text-red-300 fill-red-300" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-vintage-hand text-2xl md:text-3xl text-vintage-accent mb-4 text-center"
        >
          Alles Gute zum Geburtstag
        </motion.p>

        <h1 className="font-vintage-title text-7xl md:text-9xl text-vintage-dark text-center">
          {albumConfig.landing.title}
        </h1>

        {/* Hand-drawn underline */}
        <motion.svg
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-6"
          viewBox="0 0 200 20"
        >
          <motion.path
            d="M5 15 Q 50 5, 100 15 T 195 15"
            stroke="var(--color-vintage-gold)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
        className="absolute font-vintage-title text-[16rem] md:text-[24rem] text-vintage-gold select-none pointer-events-none"
      >
        {albumConfig.landing.age}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 text-center"
      >
        <p className="font-vintage-hand text-3xl md:text-5xl text-vintage-accent">
          Ein Jahr voller Liebe ✨
        </p>
        <p className="font-vintage-hand text-xl md:text-2xl text-vintage-dark/50 mt-2">
          2025 in Bildern
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center text-vintage-dark/50"
      >
        <span className="tracking-widest uppercase mb-2 font-vintage-hand text-lg">
          {albumConfig.landing.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Section Title Component
function SectionTitle({
  title,
  subtitle,
  personalNote,
  variant = "default",
  icon,
}: {
  title: string;
  subtitle: string;
  personalNote?: string | null;
  variant?: "default" | "dark" | "playful";
  icon?: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textColor =
    variant === "dark" ? "text-vintage-cream" : "text-vintage-dark";
  const accentColor =
    variant === "dark" ? "text-vintage-gold" : "text-vintage-accent";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {variant === "playful" && (
        <motion.div
          className="flex justify-center gap-3 mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Star className="w-5 h-5 text-vintage-gold" fill="currentColor" />
          <Heart className="w-5 h-5 text-red-400" fill="currentColor" />
          <Sparkles className="w-5 h-5 text-vintage-gold" />
        </motion.div>
      )}

      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: 0.2 }}
          className="mb-4"
        >
          {icon}
        </motion.div>
      )}

      <h2
        className={`font-vintage-title text-4xl md:text-6xl ${textColor} mb-3`}
      >
        {title}
      </h2>
      <p
        className={`font-sans text-sm md:text-base tracking-widest uppercase ${accentColor}`}
      >
        {subtitle}
      </p>

      {personalNote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: -1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-md mx-auto mt-8 px-4"
        >
          <div
            className={`bg-white/70 backdrop-blur-sm p-5 rounded-sm shadow-lg tape ${
              variant === "playful" ? "tape-pink" : ""
            }`}
          >
            <p className="font-vintage-hand text-xl md:text-2xl text-vintage-dark leading-relaxed">
              &ldquo;{personalNote}&rdquo;
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Horizontal Scroll Section - Native horizontal scroll (works better on mobile)
function HorizontalScrollSection({
  config,
  items,
  bgColor,
  emoji,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
  emoji?: string;
}) {
  return (
    <section className={`py-16 ${bgColor} overflow-hidden`}>
      {/* Title */}
      <div className="px-4 mb-8">
        <SectionTitle
          title={config.title}
          subtitle={config.subtitle}
          personalNote={config.personalNote}
          variant="playful"
        />
      </div>

      {/* Horizontal scroll container - native scroll */}
      <div className="overflow-x-auto no-scrollbar pb-8">
        <motion.div
          className="flex gap-5 px-6 w-max"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              style={{ rotate: `${i % 2 === 0 ? -2 : 2}deg` }}
              className={`relative shrink-0 bg-white p-3 shadow-xl polaroid-shadow cursor-pointer ${
                i % 4 === 0
                  ? "tape"
                  : i % 4 === 1
                  ? "tape tape-pink"
                  : i % 4 === 2
                  ? "tape tape-blue"
                  : "tape tape-green"
              }`}
            >
              <div
                className="aspect-[3/4] relative overflow-hidden bg-gray-100"
                style={{ width: i % 5 === 0 ? "220px" : "180px" }}
              >
                <MediaItem
                  item={item}
                  index={i}
                  allItems={items}
                  aspectRatio="portrait"
                  priority={i < 5}
                />
              </div>
              <div className="h-8 flex items-center justify-center">
                <span className="font-vintage-hand text-vintage-dark/70 text-base">
                  {item.caption ||
                    (i % 6 === 0
                      ? "❄️"
                      : i % 6 === 1
                      ? "⛷️"
                      : i % 6 === 2
                      ? "🏔️"
                      : "")}
                </span>
              </div>
            </motion.div>
          ))}

          {/* End decoration */}
          <div className="shrink-0 flex items-center justify-center w-24 h-64">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-vintage-hand text-3xl text-vintage-dark/30"
            >
              {emoji || "⛷️ 🏔️ ❄️"}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Swipe hint */}
      <motion.p
        className="text-center font-vintage-hand text-vintage-dark/40 text-lg"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ← Wische für mehr Fotos →
      </motion.p>
    </section>
  );
}

// Instant Camera Section (Germany Hiking)
function InstantCameraSection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  return (
    <section
      className={`py-24 px-4 md:px-8 ${bgColor} relative overflow-hidden`}
    >
      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
        icon={<Camera className="w-10 h-10 text-vintage-sepia mx-auto" />}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {items.map((item, i) => {
            const rotation = ((i * 7) % 12) - 6;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, rotate: rotation * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                className="bg-white p-4 pb-16 shadow-xl cursor-pointer"
                style={{ transformOrigin: "center bottom" }}
              >
                <MediaItem
                  item={item}
                  index={i}
                  allItems={items}
                  aspectRatio="square"
                />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-vintage-hand text-vintage-dark/60 text-lg">
                    {item.caption || ""}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Film Strip Section (Croatia)
function FilmStripSection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  return (
    <section className={`py-24 ${bgColor} relative overflow-hidden`}>
      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
        variant="dark"
        icon={<Plane className="w-10 h-10 text-vintage-gold mx-auto" />}
      />

      {/* Film strip container */}
      <div className="relative mt-8">
        {/* Film holes top */}
        <div className="flex justify-center gap-6 mb-4 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="film-hole shrink-0" />
          ))}
        </div>

        <div className="overflow-x-auto no-scrollbar py-6">
          <div className="flex gap-2 w-max px-8">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="relative w-52 md:w-64 shrink-0 bg-black/95 p-2 cursor-pointer"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <MediaItem
                    item={item}
                    index={i}
                    allItems={items}
                    aspectRatio="video"
                  />
                </div>
                <div className="text-center py-2">
                  <span className="font-mono text-xs text-vintage-gold/70">
                    FRAME {String(i + 1).padStart(3, "0")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Film holes bottom */}
        <div className="flex justify-center gap-6 mt-4 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="film-hole shrink-0" />
          ))}
        </div>
      </div>

      <p className="text-center font-vintage-hand text-vintage-cream/50 text-lg mt-8">
        ← Wische für mehr Fotos →
      </p>
    </section>
  );
}

// Scrapbook Section (Hamburg)
function ScrapbookSection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  const tapeColors = [
    "tape",
    "tape tape-pink",
    "tape tape-blue",
    "tape tape-green",
  ];

  return (
    <section
      className={`py-24 px-4 md:px-8 ${bgColor} relative overflow-hidden`}
    >
      {/* Doodle decorations */}
      <motion.div
        className="absolute top-20 left-10 text-4xl"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎭
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-3xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⚓
      </motion.div>

      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
        variant="playful"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              style={{ rotate: `${i % 2 === 0 ? -2 : 2}deg` }}
              className={`bg-white p-2 shadow-lg ${
                tapeColors[i % tapeColors.length]
              } ${i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <MediaItem
                item={item}
                index={i}
                allItems={items}
                aspectRatio={i % 7 === 0 ? "square" : "portrait"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FIXED: Masonry Section - shows ALL images (Switzerland)
function MasonrySection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  return (
    <section
      className={`py-24 px-4 md:px-8 ${bgColor} relative overflow-hidden`}
    >
      {/* Mountain emoji decoration */}
      <div className="absolute top-1/4 right-8 text-8xl opacity-10 pointer-events-none">
        🏔️
      </div>
      <div className="absolute bottom-1/4 left-8 text-6xl opacity-10 pointer-events-none">
        ⛰️
      </div>
      <div className="absolute top-1/2 left-1/3 text-4xl opacity-10 pointer-events-none">
        🌲
      </div>

      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
      />

      <div className="max-w-7xl mx-auto">
        {/* Masonry grid using CSS columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid bg-white p-2 shadow-lg mb-4"
            >
              <MediaItem
                item={item}
                index={i}
                allItems={items}
                aspectRatio={
                  i % 3 === 0 ? "portrait" : i % 3 === 1 ? "square" : "video"
                }
              />
              {item.caption && (
                <p className="font-vintage-hand text-center text-vintage-dark/60 text-sm mt-2 py-1">
                  {item.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Beach Vibes Section (Egypt)
function BeachVibesSection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  return (
    <section
      className={`py-24 px-4 md:px-8 ${bgColor} relative overflow-hidden`}
    >
      {/* Beach decorations */}
      <motion.div
        className="absolute top-16 left-8 text-5xl"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌴
      </motion.div>
      <motion.div
        className="absolute top-24 right-16 text-4xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ☀️
      </motion.div>
      <div className="absolute bottom-32 left-1/4 text-3xl opacity-60">🐚</div>
      <div className="absolute bottom-20 right-1/4 text-2xl opacity-50">🦀</div>

      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
        variant="playful"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-5 md:gap-8">
          {items.map((item, i) => {
            const rotation = Math.sin(i * 1.3) * 10;
            const yOffset = Math.cos(i * 1.7) * 15;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: yOffset }}
                whileHover={{ scale: 1.12, rotate: 0, zIndex: 30, y: -10 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: (i % 8) * 0.05,
                }}
                style={{ rotate: `${rotation}deg` }}
                className="w-36 md:w-48 bg-white p-2 shadow-xl cursor-pointer"
              >
                <MediaItem
                  item={item}
                  index={i}
                  allItems={items}
                  aspectRatio="square"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Polaroid Scatter Section (Stuttgart)
function PolaroidScatterSection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  const rotations = [-10, 6, -4, 8, -6, 5, -8, 4, -5, 7, -3, 6, -7, 5];

  return (
    <section
      className={`py-24 px-4 md:px-8 ${bgColor} relative overflow-hidden`}
    >
      <motion.div
        className="absolute top-20 right-20 text-4xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        🎵
      </motion.div>

      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
        icon={<Music className="w-10 h-10 text-vintage-accent mx-auto" />}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.7,
                rotate: rotations[i % rotations.length] * 2,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: rotations[i % rotations.length],
              }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="bg-white p-3 pb-12 shadow-xl cursor-pointer"
            >
              <MediaItem
                item={item}
                index={i}
                allItems={items}
                aspectRatio="square"
              />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="font-vintage-hand text-vintage-dark/50 text-base">
                  {item.caption || ""}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Photo Wall Section (Everyday Moments)
function PhotoWallSection({
  config,
  items,
  bgColor,
}: {
  config: { title: string; subtitle: string; personalNote: string | null };
  items: MediaItemType[];
  bgColor: string;
}) {
  const pins = ["📌", "📍", "💕", "⭐", "💜"];

  return (
    <section className={`py-24 px-4 md:px-8 ${bgColor}`}>
      <SectionTitle
        title={config.title}
        subtitle={config.subtitle}
        personalNote={config.personalNote}
        variant="playful"
      />

      <div className="max-w-7xl mx-auto">
        {/* Cork board style background */}
        <div className="bg-[#c4a574]/30 rounded-lg p-6 md:p-10 border-4 border-[#8b6914]/20 shadow-inner">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  rotate: i % 2 === 0 ? -12 : 12,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  rotate: i % 2 === 0 ? -4 : 4,
                  scale: 1,
                }}
                whileHover={{ scale: 1.15, rotate: 0, zIndex: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, type: "spring" }}
                className="relative bg-white p-2 shadow-md cursor-pointer"
              >
                {/* Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg z-10">
                  {pins[i % pins.length]}
                </div>
                <MediaItem
                  item={item}
                  index={i}
                  allItems={items}
                  aspectRatio="square"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Romantic Transition before finale
function RomanticTransition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 px-6 bg-gradient-to-b from-vintage-cream to-[#f5e6e0] text-center relative overflow-hidden"
    >
      {/* Floating hearts */}
      {isInView &&
        [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${5 + i * 6}%` }}
            initial={{ y: 300, opacity: 0 }}
            animate={{
              y: -100,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          >
            <Heart className="w-6 h-6 text-red-300 fill-red-300" />
          </motion.div>
        ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <Heart className="w-20 h-20 text-red-400 fill-red-400 mx-auto" />
        </motion.div>

        <p className="font-vintage-hand text-4xl md:text-6xl text-vintage-dark mt-8">
          Danke für dieses wunderbare Jahr
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="font-vintage-hand text-2xl md:text-3xl text-vintage-accent mt-4"
        >
          ...und jetzt zum wichtigsten Teil ✨
        </motion.p>
      </motion.div>
    </section>
  );
}

// Birthday Finale - More Romantic
function BirthdayFinale() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 px-6 bg-vintage-dark text-vintage-cream text-center relative overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Floating confetti */}
      {isInView &&
        [...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${4 + i * 4}%` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: [0, 800],
              opacity: [1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + (i % 4),
              delay: i * 0.15,
              repeat: Infinity,
            }}
          >
            {
              ["🎉", "🎊", "✨", "🎈", "💫", "🌟", "💝", "🎁", "💕", "❤️"][
                i % 10
              ]
            }
          </motion.div>
        ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-8"
        >
          <Heart className="w-20 h-20 text-red-400 fill-red-400" />
        </motion.div>

        <h2 className="font-vintage-title text-4xl md:text-7xl mb-10">
          {albumConfig.finale.title}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto bg-gradient-to-br from-red-900/30 to-pink-900/20 backdrop-blur-sm p-8 md:p-12 rounded-2xl border-2 border-vintage-gold/30 shadow-2xl"
        >
          <h3 className="font-vintage-title text-2xl md:text-4xl mb-6 text-vintage-gold">
            {albumConfig.finale.loveLetterTitle}
          </h3>
          <p className="font-vintage-hand text-xl md:text-2xl leading-relaxed mb-8">
            {albumConfig.finale.message}
          </p>

          {/* "Ich liebe dich" declaration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
            className="mt-8 pt-6 border-t border-vintage-gold/30"
          >
            <motion.p
              className="font-vintage-title text-3xl md:text-5xl text-red-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {albumConfig.finale.declaration}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="mt-12 text-6xl"
        >
          🎂 🎉 🥳
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
          className="mt-8 font-vintage-hand text-2xl text-vintage-cream/70"
        >
          Auf die nächsten Abenteuer gemeinsam! 💑
        </motion.p>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 text-vintage-cream/40 tracking-widest uppercase font-vintage-hand text-lg">
        2025 • Made with ❤️
      </div>
    </section>
  );
}
