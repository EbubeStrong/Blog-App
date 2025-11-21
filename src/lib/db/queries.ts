import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";
import { PostProps } from "../types";


// // get all posts
// export async function getAllPosts(){
//     try {
//         const fetchAllPosts = await db.query.posts.findMany({
//             orderBy: [desc(posts.createdAt)],
//             with: {
//                 author: true
//             }
//         })
//         return fetchAllPosts

//     } catch (error) {
//         console.log(error)
//         return 
//     }
// }

export async function getAllPosts(): Promise<PostProps[]> {
  try {
    const fetchAllPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });

    const normalized = fetchAllPosts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: {
        ...post.author,
        createdAt: post.author.createdAt.toISOString(),
        updatedAt: post.author.updatedAt.toISOString(),
      },
    }));

    return normalized; // matches PostProps[] (dates as strings)
  } catch (error) {
    console.log(error);
    return []; //  return array, NOT an object
  }
}


export async function getPostBySlug(slug: string){
    try {
        const post = await db.query.posts.findFirst({
            where: eq(posts.slug, slug),
            with: {
                author: true
            }
        })
        return post
    } catch (error) {
        console.log(error)
        return null
    }
}