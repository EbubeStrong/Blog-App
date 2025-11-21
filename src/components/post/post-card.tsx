import { PostCardsProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: PostCardsProps) {
    return (
        <Link href={`/post/${post.slug}`}>
            <Card className="border rounded-lg p-4 hover:shadow-lg transition">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold mb-2">{post.title}</CardTitle>
                </CardHeader>

                <CardDescription className="px-6">
                    <p className="text-gray-700 mb-4">{post.description}</p>
                </CardDescription>

                <CardContent>
                    <p className="text- black font-bold text-2xl mb-6">{post.content}</p>

                    <p className="text-sm text-gray-500">By {post.author.name} on {formatDate(post.createdAt)}</p>
                </CardContent>
                {/* <p className="text-sm text-gray-500">By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}</p> */}
            </Card>
        </Link>
    );
}

export default PostCard;