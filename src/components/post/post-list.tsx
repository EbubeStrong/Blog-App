import { PostListsProps } from "@/lib/types";
import PostCard from "./post-card";

function PostList({ posts }: PostListsProps) {
    return (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;