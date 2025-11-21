import Container from "@/components/layout/container";
import PostForm from "@/components/post/post-form";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        // Handle unauthenticated access, e.g., redirect to login
        redirect('/');
    }

    const post = await getPostBySlug(slug);

    if (!post) {
        // Handle unauthorized access, show 404
        notFound();
    }

    if (post.authorId !== session.user.id) {
        // Handle unauthorized access, redirect to homepage
        redirect('/');
    }

    return (
        <Container className="py-10">
            <h1 className="max-w-2xl text-4xl font-bold mb-6">Edit Post</h1>
            <PostForm
                isEditing={true}
                post={{
                    id: post.id,
                    title: post.title,
                    description: post.description || '',
                    content: post.content || '',
                    slug: post.slug,
                }}
            />
        </Container>
    );
}

export default EditPostPage;