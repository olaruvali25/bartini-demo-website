import type { Metadata, Viewport } from "next";
import "./globals.css";

const extensionAttrCleanupScript = `
(() => {
  const attrs = ["bis_skin_checked", "bis_register"];
  const hasProcessedPrefix = (name) => name.startsWith("__processed_");
  const cleanElement = (el) => {
    if (!(el instanceof Element)) return;
    for (const attr of attrs) {
      if (el.hasAttribute(attr)) el.removeAttribute(attr);
    }
    for (const name of el.getAttributeNames()) {
      if (hasProcessedPrefix(name)) el.removeAttribute(name);
    }
  };
  const cleanTree = (root) => {
    cleanElement(root);
    if (!(root instanceof Element || root instanceof Document)) return;
    const nodes = root.querySelectorAll("*");
    for (const node of nodes) cleanElement(node);
  };
  cleanTree(document);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.target) {
        cleanElement(mutation.target);
      }
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) cleanTree(node);
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true
  });
  setTimeout(() => observer.disconnect(), 5000);
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://bartini-rooftop-demo.vercel.app"),
  title: {
    default: "Bartini Rooftop Bucuresti | The city's coolest top shelf",
    template: "%s | Bartini Rooftop Bucuresti",
  },
  description:
    "Bartini Rooftop este un skybar premium in Bucuresti: cocktailuri signature, panorama urbana, evenimente private si experiente exclusiviste.",
  keywords: [
    "bartini rooftop",
    "skybar bucuresti",
    "rooftop bar bucuresti",
    "cocktail bar bucuresti",
    "luxury nightlife bucuresti",
    "rezervare rooftop",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "ro-RO": "/",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "/",
    title: "Bartini Rooftop Bucuresti | The city's coolest top shelf",
    description:
      "Skybar premium in Bucuresti cu cocktailuri signature, vibe exclusiv si panorama la inaltime.",
    siteName: "Bartini Rooftop",
    images: [
      {
        url: "/images/heroimg.jpg",
        width: 1200,
        height: 800,
        alt: "Bartini Rooftop skyline hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bartini Rooftop Bucuresti | The city's coolest top shelf",
    description:
      "Cocktailuri premium, nopti emblematice si experiente rooftop in centrul Bucurestiului.",
    images: ["/images/heroimg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "nightlife",
  other: {
    "geo.region": "RO-B",
    "geo.placename": "Bucharest",
    "geo.position": "44.439663;26.096306",
    ICBM: "44.439663, 26.096306",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: extensionAttrCleanupScript }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
