import { redirect } from "next/navigation";

export default function ContactPage() {
  const verlyWebsiteUrl = process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL || "https://verlyai.xyz";

  // Perform a server-side redirect to the official Verly AI contact page
  redirect(`${verlyWebsiteUrl}/contact`);
}
