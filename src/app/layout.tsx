import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Headings only use 600, so one static weight keeps the font file small.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-bricolage",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s · ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: "en_US",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.seo.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf1f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c141b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-accent text-on-fill focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
