"use client";
import { DeletePostButtonProps, PostContentProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import {  Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



function PostContent({post, isAuthor}: PostContentProps) {
    return ( 
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>
                    By {post.author.name} - {formatDate(post.createdAt)}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
                <p className="text- black font-bold text-2xl mb-6">{post.content}</p>
            </CardContent>

            {isAuthor && (
                <CardFooter>
                    <div className="flex gap-4">
                        <Button asChild variant='outline' className="cursor-pointer">
                            <Link href={`/post/edit/${post.slug}`}>
                            <Pencil className="h-4 w-4"/>
                            Edit
                            </Link>
                        </Button>
                        <DeletePostButton postId={post.id}/>
                    </div>
                </CardFooter>
            )}
        </Card>
     );
}

export default PostContent; 


function DeletePostButton({postId}: DeletePostButtonProps){
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await deletePost(postId);
            if (response.success) {
                toast.success('Post deleted successfully');
                router.push('/');
                router.refresh();
            }else{
                toast.error(response.message || 'Failed to delete post');
            }
        } catch (error) {
            toast.error('An error occurred while deleting the post');  
            console.error(error);
        }finally{
            setIsDeleting(false);
        }
    }
    return(
        <>
        <Button disabled={isDeleting} onClick={handleDelete}  
        className="cursor-pointer"
        variant='destructive' size='sm'>
            <Trash2 className="h-4 w-4 mr-1"/>
           {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        </>
    )
}