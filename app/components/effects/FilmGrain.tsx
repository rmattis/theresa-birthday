"use client";

import { useEffect, useState } from "react";
import { albumConfig } from "@/app/data/albumConfig";

export default function FilmGrain() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(albumConfig.settings.showFilmGrain);
  }, []);

  if (!show) return null;

  return <div className="film-grain fixed inset-0 pointer-events-none z-50 mix-blend-overlay" />;
}

