"use client";

import { useState, useEffect } from "react";

function useHeadings() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const article = document.querySelector("article.prose, .prose");
    if (!article) return;

    const elements = article.querySelectorAll("h2[id], h3[id]");
    const headingData = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent,
      level: el.tagName === "H2" ? 2 : 3,
    }));

    setHeadings(headingData);
  }, []);

  return headings;
}

function useActiveHeading() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    const article = document.querySelector("article.prose, .prose");
    if (article) {
      const elements = article.querySelectorAll("h2[id], h3[id]");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return activeId;
}

export default function TableOfContents() {
  const headings = useHeadings();
  const activeId = useActiveHeading();

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  const activeIndex = headings.findIndex((h) => h.id === activeId);

  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-6">
      <div className="min-h-0">
        <div className="flex h-full w-full flex-col items-start gap-5 overflow-hidden bg-white p-0">
          <p className="font-semibold text-sm text-gray-500 uppercase tracking-widest">
            Table of Contents
          </p>
          <div className="relative min-h-0 w-full flex-1 overflow-auto overscroll-contain max-h-[calc(100vh-300px)]">
            <div className="pointer-events-none absolute top-0 left-[1px] h-full w-[2px] rounded-full bg-gray-100" />

            <div
              className="pointer-events-none absolute left-0 h-5 w-[4px] rounded-full transition-transform duration-200 ease-out"
              style={{
                background: "linear-gradient(rgb(255, 122, 224) 0%, rgb(255, 184, 108) 100%)",
                transform: `translateY(${activeIndex * 32}px)`,
              }}
            />

            <div className="relative w-full space-y-2 pl-4">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  title={heading.text}
                  className={`block w-full text-left truncate text-sm leading-6 tracking-[-0.32px] transition-all duration-150 ease-in-out hover:text-gray-900 ${
                    activeId === heading.id
                      ? "font-semibold text-gray-900"
                      : "font-medium text-gray-500"
                  } ${heading.level === 3 ? "ml-3" : ""}`}
                >
                  {heading.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
