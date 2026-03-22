import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blogs.verlyai.xyz";

async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "VerlyAI Blog — AI Agents, Voice & WhatsApp Support",
      template: "%s | VerlyAI Blog",
    },
    description:
      settings?.description ||
      "Articles from VerlyAI on deploying AI customer support agents: voice AI, WhatsApp automation, web chat, RAG, and scaling support without extra headcount.",
    keywords: [
      "AI customer support",
      "voice AI agents",
      "WhatsApp automation",
      "AI chatbot",
      "VerlyAI",
      "customer support automation",
      "conversational AI",
      "AI agents blog",
      "omnichannel support",
    ],
    authors: [{ name: "VerlyAI Team" }],
    creator: "VerlyAI",
    publisher: "VerlyAI",
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      siteName: "VerlyAI Blog",
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "https://verlyai.xyz/verly_logo.png",
          width: 1200,
          height: 630,
          alt: "VerlyAI Blog — AI Customer Support Insights",
        },
      ],
    },
    twitter: {
      title: "VerlyAI Blog — AI Agents, Voice & WhatsApp Support",
      card: "summary_large_image",
      site: "@VerlyAI",
      creator: "@VerlyAI",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  return (
    <>
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="h-[100px]" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
