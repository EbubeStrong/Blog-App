"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function createPost(data: FormData) {
  try {
    // get the current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to create a post.",
      };
    }

    // extract form data or get form data
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const content = data.get("content") as string;

    // validate form data
    if (!title || !description || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // create the slug from post title
    const slug = slugify(title);

    // check if the slug already exists in the database
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with the same title already exists. Please choose a different title.",
      };
    }
    const [newPost] = await db
      .insert(posts)
      .values({
        id: randomUUID(),
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    //   Revalidate the home page to reflect the new post
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath(`/profile`);

    return {
      success: true,
      message: "Post created successfully.",
      slug: newPost.slug,
    };

    // Here you would typically handle the data, e.g., save it to a database
    // console.log("Creating post with data:", { title, description, content });
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: "Failed to create new post. Please try again.",
    };
  }
}

export async function updatePost(postId: string, data: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to update a post.",
      };
    }

    // extract form data or get form data
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const content = data.get("content") as string;

    // validate form data
    if (!title || !description || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const slug = slugify(title);

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with the same title already exists. Please choose a different title.",
      };
    }
  
    const postToEdit = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    }); 

    if (!postToEdit?.authorId || postToEdit.authorId !== session.user.id) {
      return {
        success: false,
        message: "Post not found.",
      };
    }

    await db
      .update(posts)
      .set({
        title,
        description,
        content,
        slug,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, postId));

    // Revalidate the post page and profile page to reflect the updated post
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath(`/profile`);

    return {
      success: true,
      message: "Post updated successfully.",
      slug: slug,
    };

  } catch (error) {
    console.error("Error updating post:", error);
    return {
      success: false,
      message: "Failed to update the post. Please try again.",
    };
  }
}


export async function deletePost(postId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to delete a post.",
      };
    }

    const postToDelete = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    if (!postToDelete?.authorId || postToDelete.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only delete your own posts.",
      };
    }
    await db.delete(posts).where(eq(posts.id, postId));

    // Revalidate the home page and profile page to reflect the deleted post
    revalidatePath("/");
    revalidatePath(`/profile`); 
    return {
      success: true,
      message: "Post deleted successfully.",
    };
    
  } catch (error) {
   console.log(error, "failed to delete") 
    return {
      success: false,
      message: "Failed to delete the post. Please try again.",
    };
  }
}