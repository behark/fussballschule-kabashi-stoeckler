import { getRedisData } from "./redis";

// Content type definitions
export interface HeroContent {
  badge: string;
  headline: string;
  subtext: string;
  image: string;
}

export interface MissionContent {
  title: string;
  text: string;
}

export interface SocialProofContent {
  stats: Array<{ value: string; label: string; icon: string }>;
  facebookUrl: string;
}

export interface PillarContent {
  icon: string;
  title: string;
  description: string;
}

export interface CoachContent {
  name: string;
  role: string;
  bio: string;
  bioExtended?: string[];
  photoUrl: string;
}

export interface StoryContent {
  paragraphs: string[];
}

export interface CampContent {
  id: string;
  name: string;
  dates: string;
  formattedDates: string;
  time: string;
  location: string;
  address: string;
  price: string;
  ageGroup: string;
  schedule: Array<{ day: string; time: string; activity: string }>;
  included: string[];
  bring: string[];
}

export interface TestimonialContent {
  quote: string;
  author: string;
  stars: number;
}

export interface ContactContent {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  hours: string;
  bookingUrl: string;
}

export interface FAQContent {
  question: string;
  answer: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

// Default content (current hardcoded values)
export const defaults = {
  hero: {
    badge: "🏆 Dein Fußball-Traum wird Realität! 🌟",
    headline: "FÜR ALLE DIE\nBESSER WERDEN\nWOLLEN.",
    subtext:
      "Die Kabashi-Stöckler Fussballschule bietet professionelles Training für junge Talente. Technik, Koordination und Power - alles was du brauchst, um dein Spiel auf das nächste Level zu bringen.",
    image: "/images/trainer-team.jpg",
  } as HeroContent,

  mission: {
    title: "UNSERE MISSION",
    text: "Wir glauben daran, dass jedes Kind das Potenzial hat, ein großartiger Fußballer zu werden. Unsere Mission ist es, durch qualitativ hochwertiges Training und echte Fußball-Leidenschaft junge Talente zu fördern und zu inspirieren. Bei uns lernt ihr nicht nur Fußball - ihr entwickelt euch als Sportler und als Person.",
  } as MissionContent,

  socialProof: {
    stats: [
      { value: "326+", label: "Facebook Follower", icon: "ThumbsUp" },
      { value: "33+", label: "Aktive Community", icon: "MessageCircle" },
      { value: "100%", label: "Zufriedenheit", icon: "Star" },
    ],
    facebookUrl: "https://www.facebook.com/profile.php?id=61575646112694",
  } as SocialProofContent,

  pillars: [
    {
      icon: "Target",
      title: "TECHNIK",
      description: "Ballkontrolle, Dribbling und Passspiel auf höchstem Niveau",
    },
    {
      icon: "Zap",
      title: "KOORDINATION",
      description: "Beweglichkeit, Balance und Körperbeherrschung verbessern",
    },
    {
      icon: "Trophy",
      title: "POWER",
      description: "Kraft, Schnelligkeit und Ausdauer gezielt entwickeln",
    },
    {
      icon: "Heart",
      title: "LEIDENSCHAFT",
      description: "Die Liebe zum Spiel steht bei uns an erster Stelle",
    },
  ] as PillarContent[],

  coaches: [
    {
      name: "JONAS STÖCKLER",
      role: "Co-Founder & Trainer",
      bio: "Jonas Stöckler begann seine fußballerische Laufbahn bereits im Alter von sechs Jahren bei Grün-Weiß Micheldorf. Dort durchlief er alle Nachwuchsstationen und schaffte schließlich den Sprung in die Kampfmannschaft der OÖ-Liga.",
      bioExtended: [
        "Jonas Stöckler begann seine fußballerische Laufbahn bereits im Alter von sechs Jahren bei Grün-Weiß Micheldorf. Dort durchlief er alle Nachwuchsstationen und schaffte schließlich den Sprung in die Kampfmannschaft der OÖ-Liga. In dieser Zeit absolvierte er zahlreiche Einsätze und erzielte zwei Tore. Neben seiner Zeit in Micheldorf sammelte er auch wertvolle Erfahrungen in Wien, wo er sechs Monate lang beim Regionalligisten Wiener Viktoria unter der Leitung von Toni Polster mittrainierte.",
        "Nach dieser intensiven Phase folgte der Wechsel in die Landesliga Wien zur Sportunion Schönbrunn. Zwei Jahre später kehrte er zurück nach Oberösterreich zur Union Pettenbach, ebenfalls ein Verein der Landesliga. Aufgrund wiederkehrender und hartnäckiger Verletzungen ließ die Motivation und der Antrieb für den leistungsorientierten Fußball jedoch zunehmend nach.",
        "Parallel zu seiner sportlichen Laufbahn ist Jonas heute als Lehrperson an der Mittelschule in Kirchdorf tätig.",
      ],
      photoUrl: "/images/trainer-jonas.jpg",
    },
    {
      name: "ALBERT KABASHI",
      role: "Co-Founder & Cheftrainer | UEFA A-Lizenz",
      bio: "Mit einer beeindruckenden Karriere als Nachwuchsspieler bei Dinamo Zagreb und jahrzehntelanger Erfahrung als Trainer gehört Albert Kabashi zu den Erfolgreichsten in Oberösterreich.",
      bioExtended: [
        "Mit einer beeindruckenden Karriere als Nachwuchsspieler bei Dinamo Zagreb (Junioren), Trešnjevka Zagreb, sowie bei verschiedenen Vereinen in Österreich wie Steyr, Micheldorf, Lenzing, Gmunden und Vöcklabruck bringt Albert Kabashi jahrzehntelange Fußballerfahrung mit auf den Platz.",
        "Auch als Trainer gehört er zu den Erfolgreichsten in Oberösterreich: Mit Stationen u.a. beim SV Gmunden, Vöcklabruck, Micheldorf, Stadl-Paura und Molln konnte er gleich 4 Meistertitel feiern, wurde 3x Herbstmeister in der OÖ Liga mit Gmunden, 1x mit Stadlpaura und von der Krone zum Trainer des Jahres gewählt. Mit der UEFA A-Lizenz ausgestattet, bringt er höchste fachliche Kompetenz mit.",
        "Neben dem Fußball ist er seit über 20 Jahren als Sozialpädagoge beim Land OÖ tätig – eine Kombination aus Herz, Erfahrung und Know-how, die ihn zu einem spitzen Coach machen.",
      ],
      photoUrl: "/images/trainer-albert.jpg",
    },
  ] as CoachContent[],

  story: {
    paragraphs: [
      "Die Kabashi-Stöckler Fussballschule wurde aus der gemeinsamen Leidenschaft für den Fußball und dem Wunsch gegründet, jungen Talenten in Oberösterreich professionelles Training zu bieten.",
      "Was als kleine Initiative begann, hat sich zu einem anerkannten Trainingszentrum entwickelt, das Kinder und Jugendliche von 6 bis 16 Jahren auf ihrem fußballerischen Weg begleitet und fördert.",
      "Unser Ziel ist es, nicht nur bessere Fußballer zu entwickeln, sondern auch Werte wie Teamgeist, Fairplay und Durchhaltevermögen zu vermitteln - Eigenschaften, die weit über den Fußballplatz hinaus wichtig sind.",
    ],
  } as StoryContent,

  camps: [
    {
      id: "october2024",
      name: "OKTOBER BOOTCAMP",
      dates: "2024-10-27,2024-10-28",
      formattedDates: "27.-28. Oktober 2024",
      time: "09:00 - 12:00 Uhr",
      location: "ASKÖ Kirchdorf Fußballplatz",
      address: "Ertlstraße 16, 4560 Kirchdorf/Krems",
      price: "€50",
      ageGroup: "6-16 Jahre",
      schedule: [
        {
          day: "Tag 1 - Sonntag, 27. Oktober",
          time: "08:45",
          activity: "Ankunft & Check-in",
        },
        { day: "Tag 1 - Sonntag, 27. Oktober", time: "09:00", activity: "Aufwärmen & Koordination" },
        { day: "Tag 1 - Sonntag, 27. Oktober", time: "09:45", activity: "Technik-Training" },
        { day: "Tag 1 - Sonntag, 27. Oktober", time: "10:30", activity: "Kurze Pause" },
        { day: "Tag 1 - Sonntag, 27. Oktober", time: "10:45", activity: "Spielformen & Wettkämpfe" },
        { day: "Tag 1 - Sonntag, 27. Oktober", time: "12:00", activity: "Ende Tag 1" },
        { day: "Tag 2 - Montag, 28. Oktober", time: "08:45", activity: "Ankunft" },
        { day: "Tag 2 - Montag, 28. Oktober", time: "09:00", activity: "Power & Athletik" },
        { day: "Tag 2 - Montag, 28. Oktober", time: "09:45", activity: "Technik-Vertiefung" },
        { day: "Tag 2 - Montag, 28. Oktober", time: "10:30", activity: "Kurze Pause" },
        { day: "Tag 2 - Montag, 28. Oktober", time: "10:45", activity: "Abschlussturnier" },
        { day: "Tag 2 - Montag, 28. Oktober", time: "12:00", activity: "Siegerehrung & Ende" },
      ],
      included: [
        "Professionelles Training durch qualifizierte Trainer",
        "Individuelle Betreuung in kleinen Gruppen",
        "Altersgerechte Trainingseinheiten",
        "Koordinations- und Technikübungen",
        "Spielformen und Mini-Turniere",
        "Getränke während des Trainings",
        "Urkunde und kleines Geschenk",
        "Versicherung während des Camps",
      ],
      bring: [
        "Fußballschuhe (Nocken/Stollen)",
        "Schienbeinschoner",
        "Sportkleidung",
        "Trinkflasche",
        "Kleine Jause",
        "Gute Laune!",
      ],
    },
  ] as CampContent[],

  testimonials: [
    {
      quote:
        "Mein Sohn hat in nur einem Camp so viel gelernt! Die Trainer sind super motiviert und gehen auf jedes Kind individuell ein.",
      author: "Maria S.",
      stars: 5,
    },
    {
      quote:
        "Professionelles Training in familiärer Atmosphäre. Die Kinder haben Spaß und werden gleichzeitig gefordert. Top!",
      author: "Thomas K.",
      stars: 5,
    },
    {
      quote:
        "Die beste Fußballschule in der Region! Meine Tochter freut sich jedes Mal auf das Training.",
      author: "Sandra H.",
      stars: 5,
    },
  ] as TestimonialContent[],

  contact: {
    phone: "+43 664 441 7977",
    email: "jonas.stoeckler@gmx.at",
    whatsapp: "https://wa.me/436644417977",
    address: "Ertlstraße 16, 4560 Kirchdorf/Krems",
    hours: "Mo-Fr: 09:00 - 18:00 Uhr",
    bookingUrl: "https://cal.com/kabashi-jwghfq/30min",
  } as ContactContent,

  faq: [
    {
      question: "Wie erfolgt die Bezahlung?",
      answer: "Die Bezahlung erfolgt per Überweisung nach Bestätigung. Details erhalten Sie per E-Mail.",
    },
    {
      question: "Kann ich kurzfristig anmelden?",
      answer: "Ja, solange Plätze verfügbar sind nehmen wir gerne auch kurzfristige Anmeldungen an.",
    },
    {
      question: "Was bei schlechtem Wetter?",
      answer: "Das Training findet bei fast jedem Wetter statt. Bei extremen Bedingungen informieren wir Sie.",
    },
    {
      question: "Muss mein Kind im Verein sein?",
      answer: "Nein, unser Bootcamp ist für alle Kinder von 6-16 Jahren offen.",
    },
  ] as FAQContent[],

  gallery: [
    { src: "/images/camp-group.jpg", alt: "Fußballcamp Gruppentraining", title: "Teamtraining" },
    { src: "/images/team-banner.jpg", alt: "Team mit KICKEN Banner", title: "Unsere Werte" },
    { src: "/images/training-kids.jpg", alt: "Kinder beim Training", title: "Nachwuchsförderung" },
    {
      src: "/images/partnership.jpg",
      alt: "Partnerschaft mit ASKÖ Kirchdorf",
      title: "Partnerschaft mit ASKÖ Kirchdorf",
    },
    { src: "/images/trainer-team.jpg", alt: "Unser Trainerteam", title: "Unser Trainerteam" },
  ] as GalleryImage[],
};

// Generic content getter with fallback
export async function getContent<T extends keyof typeof defaults>(
  section: T
): Promise<typeof defaults[T]> {
  const redisData = await getRedisData<typeof defaults[T]>(`content:${section}`);
  return redisData || defaults[section];
}

// Type-safe getters for each section
export async function getHeroContent(): Promise<HeroContent> {
  return getContent("hero");
}

export async function getMissionContent(): Promise<MissionContent> {
  return getContent("mission");
}

export async function getSocialProofContent(): Promise<SocialProofContent> {
  return getContent("socialProof");
}

export async function getPillarsContent(): Promise<PillarContent[]> {
  return getContent("pillars");
}

export async function getCoachesContent(): Promise<CoachContent[]> {
  return getContent("coaches");
}

export async function getStoryContent(): Promise<StoryContent> {
  return getContent("story");
}

export async function getCampsContent(): Promise<CampContent[]> {
  return getContent("camps");
}

export async function getTestimonialsContent(): Promise<TestimonialContent[]> {
  return getContent("testimonials");
}

export async function getContactContent(): Promise<ContactContent> {
  return getContent("contact");
}

export async function getFAQContent(): Promise<FAQContent[]> {
  return getContent("faq");
}

export async function getGalleryContent(): Promise<GalleryImage[]> {
  return getContent("gallery");
}
