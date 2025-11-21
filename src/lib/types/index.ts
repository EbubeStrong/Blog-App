export interface PostProps {
  id: string;
  title: string;
  description?: string;
  slug: string;
  createdAt: string;
  content: string;
  author: {
    name: string;
    createdAt: string; // changed from Date to string
    updatedAt: string; // changed from Date to string
  };
}

export interface PostListsProps {
  posts: Array<{
    id: string;
    title: string;
    description?: string;
    slug: string;
    createdAt: string;
    content: string;
    author: { name: string };
  }>;
}

export interface PostCardsProps {
  post: {
    id: string;
    title: string;
    description?: string;
    slug: string;
    createdAt: string;
    content: string;
    author: { name: string };
  };
}


export interface PostContentProps{
  post: {
    id: string;
    title: string;
    description?: string;
    content?: string;
    slug: string;
    createdAt: string;
    author: { name: string };
  };
  isAuthor: boolean
}


export interface DeletePostButtonProps{
  postId: string
}