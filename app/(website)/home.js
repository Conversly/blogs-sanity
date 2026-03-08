import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Post({ posts }) {
  return (
    <>
      {posts && (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {posts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts.slice(2, 14).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:-translate-y-0.5">
              <span>View all Posts</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
