import Image from "next/image";
import Link from "next/link";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";
import Iframe from "react-iframe";
import getVideoId from "get-video-id";
import { cx } from "@/utils/all";
import { slugify } from "@/utils/slugify";

import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import html from "refractor/lang/markup";
import css from "refractor/lang/css";
import bash from "refractor/lang/bash";

Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(html);
Refractor.registerLanguage(css);
Refractor.registerLanguage(bash);

// Image with caption, rounded corners, lazy loading
const ImageComponent = ({ value }) => {
  const imageUrl = urlForImage(value);
  return (
    <figure className="my-10">
      <Image
        src={imageUrl}
        alt={value.alt || "Image"}
        loading="lazy"
        width={1200}
        height={700}
        className="rounded-xl shadow-sm object-cover w-full"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {value.caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
};

// Styled table with header detection, borders, and horizontal scroll
const PortableTextTable = ({ value }) => {
  const [head, ...rows] = value.table.rows;
  const hasHeader = head?.cells?.filter(Boolean).length > 0;

  return (
    <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        {hasHeader && (
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {head.cells.map((cell, i) => (
                <th
                  key={i}
                  className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {row.cells.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Code = ({ value }) => {
  if (!value?.code) {
    return null;
  }
  return (
    <Refractor
      language={value.language || "bash"}
      value={value.code}
      markers={value.highlightedLines}
    />
  );
};

const IframePreview = ({ value }) => {
  const { url, height } = value;
  if (!url) {
    return <p>Missing Embed URL</p>;
  }
  const { id, service } = getVideoId(url);

  const isYoutubeVideo = id && service === "youtube";

  const finalURL = isYoutubeVideo
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : url;

  return (
    <Iframe
      url={finalURL}
      width="100%"
      height={height || "350"}
      className={cx(!height && "aspect-video", "rounded-md")}
      display="block"
      position="relative"
      frameBorder="0"
      allowfullscreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

// Verdict box for review articles
const VerdictBox = ({ value }) => {
  const score = value.rating ?? 0;
  const scoreColor =
    score >= 8
      ? "text-green-600"
      : score >= 5
        ? "text-yellow-600"
        : "text-red-500";

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-10 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-900">⚖️ Final Verdict</h3>
        <span
          className={`text-2xl font-extrabold tabular-nums ${scoreColor}`}>
          {score}
          <span className="text-base font-medium text-gray-400">/10</span>
        </span>
      </div>
      <p className="text-gray-700 leading-7">{value.summary}</p>
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: Code,
    embed: IframePreview,
    tables: PortableTextTable,
    verdictBox: VerdictBox,
  },
  block: {
    h2: ({ children, value }) => {
      const id = slugify(children?.[0] || "");
      return (
        <h2
          id={id}
          className="text-3xl font-bold mt-12 mb-4 scroll-mt-20 text-gray-900 dark:text-white">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const id = slugify(children?.[0] || "");
      return (
        <h3
          id={id}
          className="text-2xl font-semibold mt-8 mb-3 scroll-mt-20 text-gray-900 dark:text-white">
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="text-lg leading-8 text-gray-700 dark:text-gray-300 mb-6">
        {children}
      </p>
    ),
    // TL;DR / Quick Summary box
    blockquote: ({ children }) => (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8 shadow-sm">
        <p className="font-semibold text-green-700 mb-2 flex items-center gap-2">
          <span>✅</span> Quick Summary
        </p>
        <div className="text-gray-700 leading-7">{children}</div>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 space-y-2 my-6 text-lg text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 space-y-2 my-6 text-lg text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  marks: {
    center: props => (
      <div className="text-center">{props.children}</div>
    ),
    highlight: props => (
      <span className="font-bold text-blue-500">
        {props.children}
      </span>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noopener"
        : undefined;
      const target = !value.href.startsWith("/")
        ? "_blank"
        : undefined;
      return (
        <a href={value.href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      return (
        <Link href={`/post/${value?.slug?.current}`}>{children}</Link>
      );
    }
  }
};

// Set up Portable Text serialization
export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);
