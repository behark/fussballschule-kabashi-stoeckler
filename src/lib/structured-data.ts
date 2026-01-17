/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand the business better
 */

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "Kabashi-Stöckler Fussballschule",
  "image": "https://www.ks-fussballschule.at/images/trainer-team.jpg",
  "description": "Professionelles Fußballtraining für Kinder und Jugendliche von 6-16 Jahren in Oberösterreich. Performance Bootcamp und individuelle Trainingseinheiten.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ertlstraße 16",
    "addressLocality": "Kirchdorf an der Krems",
    "postalCode": "4560",
    "addressRegion": "Oberösterreich",
    "addressCountry": "AT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.9056,
    "longitude": 14.1231
  },
  "url": "https://www.ks-fussballschule.at",
  "telephone": "+436644417977",
  "email": "jonas.stoeckler@gmx.at",
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61575646112694",
    "https://www.instagram.com/ks.fussballschule/"
  ],
  "sport": "Soccer",
  "audience": {
    "@type": "Audience",
    "audienceType": "Children and Youth",
    "ageRange": "6-16 years"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kabashi-Stöckler Fussballschule",
  "url": "https://www.ks-fussballschule.at",
  "logo": "https://www.ks-fussballschule.at/images/trainer-team.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+436644417977",
    "contactType": "customer service",
    "email": "jonas.stoeckler@gmx.at",
    "availableLanguage": ["German", "de"]
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61575646112694"
  ]
};
