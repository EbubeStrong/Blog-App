import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ebube Strong Blog",
  description: "Your go-to platform for insightful articles and updates.",
};

interface PostProps {
  id: string;
  title: string;
  description?: string;
  slug: string;
  createdAt: string;
  author: { name: string };
}

export default async function Home() {
  // Correct: Add the type HERE if needed
  const posts: PostProps[] = await getAllPosts();

  console.log(posts);

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to Ebube Strong Blog</h1>
        <p className="text-lg text-gray-600">
          Your go-to platform for insightful articles and updates.
        </p>

        {posts.length === 0 ? (
          <h2 className="mt-10 font-medium text-center text-gray-500">
            No posts available.
          </h2>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
}
