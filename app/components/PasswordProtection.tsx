"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Sparkles, Eye, EyeOff } from "lucide-react";
import { albumConfig } from "@/app/data/albumConfig";

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export default function PasswordProtection({
  children,
}: PasswordProtectionProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shake, setShake] = useState(false);

  // Check if already unlocked in localStorage
  useEffect(() => {
    const unlocked = localStorage.getItem("theresa-album-unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toLowerCase() === albumConfig.settings.password.toLowerCase()) {
      // Correct password
      localStorage.setItem("theresa-album-unlocked", "true");
      setIsUnlocked(true);
      setError(false);
    } else {
      // Wrong password
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-vintage-cream">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-12 h-12 text-red-400 fill-red-400" />
        </motion.div>
      </div>
    );
  }

  // If unlocked, show the album
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Password page
  return (
    <div className="min-h-screen bg-vintage-cream flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating hearts */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl"
            style={{
              left: `${8 + i * 8}%`,
              top: `${10 + ((i * 13) % 80)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "🌸"}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Card */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-10 border border-vintage-sepia/20"
        >
          {/* Lock icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg"
              >
                <Lock className="w-10 h-10 text-red-400" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-vintage-gold" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="font-vintage-title text-3xl md:text-4xl text-vintage-dark text-center mb-2">
            Geheimes Album
          </h1>
          <p className="font-vintage-hand text-xl text-vintage-sepia text-center mb-8">
            Nur für besondere Menschen 💝
          </p>

          {/* Password form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Passwort eingeben..."
                className={`w-full px-5 py-4 rounded-lg border-2 text-lg font-vintage-hand text-vintage-dark placeholder:text-vintage-sepia/50 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all ${
                  error
                    ? "border-red-400 bg-red-50"
                    : "border-vintage-sepia/30 bg-white/50"
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-vintage-sepia/60 hover:text-vintage-dark transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-center font-vintage-hand text-lg"
                >
                  Falsches Passwort! Versuche es nochmal 💔
                </motion.p>
              )}
            </AnimatePresence>

            {/* Hint */}
            <p className="text-center text-vintage-sepia/70 font-vintage-hand text-lg">
              Hinweis: {albumConfig.settings.passwordHint}
            </p>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-red-400 to-pink-400 text-white font-vintage-hand text-xl rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
            >
              <Heart className="w-5 h-5 fill-white" />
              Album öffnen
              <Heart className="w-5 h-5 fill-white" />
            </motion.button>
          </form>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-vintage-hand text-vintage-sepia/60 text-lg">
            Mit viel Liebe gemacht ❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

