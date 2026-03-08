"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const leftmenu = [
  { label: "Home", href: "/" },
  // { label: "Archive", href: "/archive" }
];

const rightmenu = [
  {
    label: "About",
    href: process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL
      ? `${process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL}/about`
      : "/about",
    external: true
  },
  {
    label: "Documentation",
    href: process.env.NEXT_PUBLIC_VERLY_DOCS_WEBSITE_URL
      ? `${process.env.NEXT_PUBLIC_VERLY_DOCS_WEBSITE_URL}`
      : "https://docs.verlyai.xyz",
    external: true
  }
];

const mobilemenu = [...leftmenu, ...rightmenu];

export default function Navbar(props) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = window;

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 10) {
          setIsVisible(true);
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
          // Check if scrolling down
          if (currentScrollY > lastScrollY.current) {
            setIsVisible(false);
          } else {
            // Check if scrolling up
            setIsVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
      }
    };

    scrollContainer.addEventListener("scroll", controlNavbar);

    return () => {
      scrollContainer.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const verlyWebsiteUrl = process.env.NEXT_PUBLIC_VERLY_WEBSITE_URL || "https://verlyai.xyz";

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={`transition-all duration-300 w-full max-w-7xl
          ${isVisible ? "translate-y-0" : "-translate-y-[150%]"}
          ${isScrolled ? "shadow-lg" : ""}
        `}
      >
        <div
          className="flex h-[74px] items-center justify-between px-4 md:px-6
            rounded-none md:rounded-[47px]
            border border-gray-200/60 dark:border-gray-700/60
            bg-white/70 dark:bg-gray-900/70
            backdrop-blur-md
            shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
          "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/verly_logo.png"
              alt="VerlyAI Logo"
              width={139}
              height={33}
              className="h-8 w-auto object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = "none";
              }}
            />
            <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
              VerlyAI
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {leftmenu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {rightmenu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : ""}
                rel={item.external ? "noopener noreferrer" : ""}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href={verlyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Disclosure>
            {({ open }) => (
              <>
                <div className="md:hidden">
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="ml-auto rounded-md px-2 py-1 text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none dark:text-gray-300"
                  >
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open ? (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel className="md:hidden absolute top-full left-4 right-4 mt-2">
                  <div
                    className="rounded-2xl border border-gray-200 dark:border-gray-700
                      bg-white/95 dark:bg-gray-900/95
                      backdrop-blur-md
                      shadow-lg
                      p-4 space-y-2"
                  >
                    {mobilemenu.map((item) => (
                      <Fragment key={item.label}>
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener noreferrer" : ""}
                          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {item.label}
                          {item.external && (
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </Link>
                      </Fragment>
                    ))}
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                      <Link
                        href={verlyWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-colors"
                      >
                        Get Started
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </nav>
    </div>
  );
}
