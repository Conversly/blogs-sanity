import { redirect } from "next/navigation";

export default function AboutPage() {
  const verlyWebsiteUrl = process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL || "https://verlyai.xyz";

  // Perform a server-side redirect to the official Verly AI about page
  redirect(`${verlyWebsiteUrl}/about`);
}
