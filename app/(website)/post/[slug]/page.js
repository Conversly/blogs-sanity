import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blogs.verlyai.xyz";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post || !post.title) {
    return { title: "Blog Post | VerlyAI Blog" };
  }

  const postTitle = String(post.title);
  const description =
    post.excerpt ||
    "Read the latest insights from the VerlyAI team on AI customer support, voice agents, and WhatsApp automation.";
  const canonical = `${SITE_URL}/post/${params.slug}`;
  const image = urlForImage(post.mainImage);
  const imageAlt = String(post.mainImage?.alt || postTitle);

  return {
    title: postTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: postTitle,
      description,
      url: canonical,
      siteName: "VerlyAI Blog",
      publishedTime: post.publishedAt ?? post._createdAt,
      modifiedTime: post._updatedAt ?? post.publishedAt ?? post._createdAt,
      authors: [post.author?.name || "VerlyAI"],
      section: post.categories?.[0]?.title || "Blog",
      images: image
        ? [
            {
              url: image.src,
              width: image.width,
              height: image.height,
              alt: imageAlt,
            },
          ]
        : [
            {
              url: "https://verlyai.xyz/verly_logo.png",
              width: 512,
              height: 512,
              alt: "VerlyAI Blog",
            },
          ],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: postTitle,
      description,
      site: "@VerlyAI",
      creator: "@VerlyAI",
      images: image ? [image.src] : undefined,
    },
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostPage post={post} />;
}

export const revalidate = 60;
