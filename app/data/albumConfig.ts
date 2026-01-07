export interface SectionConfig {
  title: string;
  subtitle: string;
  personalNote: string | null;
}

export interface AlbumConfig {
  settings: {
    randomOrder: boolean;
    showFilmGrain: boolean;
    birthdayDate: string;
    password: string; // Password to access the album
    passwordHint: string; // Hint for the password
  };
  landing: {
    title: string;
    age: string;
    scrollHint: string;
  };
  finale: {
    title: string;
    loveLetterTitle: string;
    message: string;
    declaration: string;
  };
  sections: Record<string, SectionConfig>;
  captions: Record<string, string>;
}

export const albumConfig: AlbumConfig = {
  // Globale Einstellungen
  settings: {
    randomOrder: true,        // true = zufällig, false = nach Dateiname
    showFilmGrain: true,      // Filmkorn-Overlay ein/aus
    birthdayDate: "2026-01-08",
    password: "Schnuffi2013",    // Passwort zum Entsperren
    passwordHint: "Du weißt es doch schon...", // Hinweis für das Passwort
  },

  // Landing Page
  landing: {
    title: "Theresa",
    age: "25",
    scrollHint: "Nach unten scrollen",
  },

  // Finale
  finale: {
    title: "Alles Gute zum 25. Geburtstag!",
    loveLetterTitle: "Für dich, Theresa",
    message: "Ich bin so dankbar für all die schönen Momente, die wir in deinem 24. Lebensjahr zusammen erlebt haben. Ich freue mich auf alles, was noch kommt und bin so dankbar, dass du an meiner Seite bist.", 
    declaration: "Ich liebe dich ❤️",
  },

  // Kapitel-Konfiguration
  sections: {
    "01-intro": {
      title: "Unser Jahr",
      subtitle: "2025",
      personalNote: null,
    },
    "02-ski-trip": {
      title: "Ski-Abenteuer",
      subtitle: "Ratschings & Balderschwang",
      personalNote: "Zwei unvergessliche Ski-Trips: Mit deiner Familie nach Ratschings und mit unseren Freunden nach Balderschwang.",
    },
    "03-germany-hiking": {
      title: "Wandern & Entspannung",
      subtitle: "Bad Gögging",
      personalNote: null,
    },
    "04-croatia": {
      title: "Kroatien",
      subtitle: "Remote Work & Sightseeing",
      personalNote: "Arbeiten mit Meerblick - im Regen ☔",
    },
    "05-hamburg": {
      title: "Hamburg",
      subtitle: "Städte-Trip",
      personalNote: "Danach haben wir zusammen Hamburg unsicher gemacht.",
    },
    "06-switzerland": {
      title: "Schweiz",
      subtitle: "Wander-Urlaub",
      personalNote: "Die Schweizer Alpen in all ihrer Pracht.",
    },
    "07-egypt": {
      title: "Ägypten",
      subtitle: "Entspannungsurlaub",
      personalNote: "Endlich mal richtig abschalten - Sonne, Strand und Meer.",
    },
    "08-stuttgart": {
      title: "Stuttgart",
      subtitle: "Städte-Trip & Musical",
      personalNote: null,
    },
    "09-everyday-moments": {
      title: "Alltags-Momente",
      subtitle: "Das Leben dazwischen",
      personalNote: "Die kleinen Momente, die unser Jahr so besonders gemacht haben.",
    },
  },

  // Bildunterschriften (Dateiname -> Text)
  captions: {
    // Beispiele:
    // "IMG_0808.jpeg": "Unsere erste Abfahrt!",
  },
};

