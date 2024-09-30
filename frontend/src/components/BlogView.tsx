import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { blogsInput } from "../helpers/types";

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState<blogsInput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  async function getBlogData() {
    try {
      setIsLoading(() => true);
      const blog = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setBlog(blog.data.blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(() => false);
    }
  }

  useEffect(() => {
    getBlogData();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="rounded-xl bg-indigo-500 px-2 py-1"
          disabled
        >
          Processing...
        </button>
      </div>
    );
  //
  return (
    <section className="flex justify-center py-10">
      <div className="flex w-full flex-col justify-center gap-2 py-2 sm:w-[50%]">
        <div className="flex items-center gap-2">
          <span className="block h-full rounded-[50%] bg-gray-600 px-4 py-2 text-center text-white">
            {blog.author?.name.split("")[0]}
          </span>
          <p className="cursor-pointer font-bold">
            <Link to={`/${blog.authorId}`}>{blog.author?.name}</Link>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/blog/${id}`} className="text-xl font-semibold">
            {blog.title}
          </Link>
          <p className="text-lg font-normal">{blog.content}</p>
          <p>{`${Math.ceil(blog?.content?.split(" ").length / 50)} minutes read`}</p>
        </div>
        <hr></hr>
      </div>
    </section>
  );
}
