"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const teamContacts = [
  {
    name: "Raghvendra Singh Dhakad",
    title: "Co-founder & CEO",
    email: "raghvendrasinghdhakar2@gmail.com",
    twitter: "https://x.com/Raghvendra56595",
    linkedin: "https://www.linkedin.com/in/raghvendra1853/"
  },
  {
    name: "Shashank Tyagi",
    title: "Co-founder & CTO",
    email: "tyagishashank118@gmail.com",
    twitter: "https://x.com/tyagi_Shashankk",
    linkedin: "https://www.linkedin.com/in/shas007/"
  }
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Data Deletion Policy", href: "/deletion" }
];

const socialLinks = [
  { name: "X", icon: XIcon, href: "https://x.com/VerlyAI" },
  { name: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/verlyai/" }
];

const quickLinks = [
  { name: "Solutions", href: process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL ? `${process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL}/solutions` : "/solutions" },
  { name: "About Us", href: process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL ? `${process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL}/about` : "/about" },
  { name: "Blog", href: "/" },
  { name: "Documentation", href: process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL ? `${process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL}/docs` : "/docs" }
];

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  const verlyWebsiteUrl = process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL || "https://verlyai.xyz";

  return (
    <footer className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      {/* Smooth easing gradient - White to Brand Blue to Black */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(to bottom, #ffffff 0%, #f7fbff 12.5%, #edf5ff 25%, #d6eaff 37.5%, #b3d7ff 50%, #80bfff 62.5%, #4d94ff 75%, #0056b3 87.5%, #000000 100%)"
        }}
      >
        <div className="relative pt-20 pb-16">
          <motion.div
            className="text-center max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              if you have come this far : let&apos;s talk!
            </h2>
            <p className="text-gray-800 font-medium text-lg md:text-xl max-w-2xl mx-auto mb-8">
              schedule a call with us!
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && window.Calendly) {
                    window.Calendly.initPopupWidget({ url: "https://calendly.com/rdhakad2002/30min" });
                  } else {
                    window.open("https://calendly.com/rdhakad2002/30min", "_blank");
                  }
                }}
                className="inline-flex items-center gap-2 h-12 px-6 text-base bg-gray-900 text-white hover:bg-gray-800 rounded-full font-medium transition-all duration-300 hover:shadow-md"
              >
                <CalendarIcon className="w-5 h-5" />
                Schedule a meet
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="relative bg-black border-t border-white/10">
        <div className="w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto py-16 px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Contact Us */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h3>
              <div className="space-y-4">
                {teamContacts.map((contact) => (
                  <div key={contact.name} className="space-y-1">
                    <p className="text-white/80 font-medium">{contact.name}</p>
                    <p className="text-white/40 text-xs">{contact.title}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors mb-2 break-all"
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                      {contact.email}
                    </a>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 mt-1">
                      {contact.twitter && (
                        <a
                          href={contact.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          <XIcon className="w-4 h-4" />
                        </a>
                      )}
                      {contact.linkedin && (
                        <a
                          href={contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/80 font-medium mb-1">Official Email</p>
                  <a
                    href="mailto:team@verlyai.xyz"
                    className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                    team@verlyai.xyz
                  </a>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Resources / Quick Links */}
              <div className="mt-12">
                <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Resources</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Connect</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
              <p className="text-white/40 text-sm mt-4">
                Follow us for updates and news
              </p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Link href={verlyWebsiteUrl}>
                  <Image
                    src="/verly_logo.png"
                    alt="VerlyAI Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </Link>
                <span className="text-white/50 text-sm">
                  &copy; {new Date().getFullYear()} VerlyAI. All rights reserved.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
