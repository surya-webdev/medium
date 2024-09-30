export interface blogsInput {
  author: {
    name: string;
    id: string;
  };
  authorId: string;
  title: string;
  content: string;
  id: string;
  published: string;
}

export interface userBlogs {
  id: string;
  name: string;
  posts: any;
}
