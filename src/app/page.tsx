import { SkybarHomepage } from "@/components/bartini/skybar-homepage";

export default function Home() {
  const currentYear = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Bartini Rooftop",
    description:
      "Skybar premium in Bucuresti cu cocktailuri signature, panorama urbana si experiente exclusiviste.",
    url: "https://bartini-rooftop-demo.vercel.app",
    image: "https://bartini-rooftop-demo.vercel.app/images/heroimg.jpg",
    telephone: "+40 31 221 5826",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Constantin Mille 18",
      addressLocality: "Bucuresti",
      postalCode: "030167",
      addressCountry: "RO",
    },
    servesCuisine: ["Cocktail Bar", "Premium Bites"],
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "12:00",
        closes: "01:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "02:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "248",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkybarHomepage currentYear={currentYear} />
    </>
  );
}
