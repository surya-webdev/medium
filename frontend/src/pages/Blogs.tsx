import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import BlogCard from "../components/BlogCard";
import { blogsInput } from "../helpers/types";
import { Link } from "react-router-dom";
// import { BlogInputs } from "@surya_dev_/medium-common";

export default function Blogs() {
  // useEffect hook , get the datas
  //till then skeleton should load
  // error occurs handle
  // if there is no blog handle

  const [isBlogs, setIsblogs] = useState<blogsInput[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  async function getData() {
    try {
      setIsLoading(() => true);
      const getBlogs = await axios.post(
        `${BACKEND_URL}/api/v1/blog/bulk`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setIsblogs(getBlogs.data.blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(() => false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="rounded-xl bg-indigo-500 px-2 py-1"
          disabled
        >
          {/* <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg> */}
          Processing...
        </button>
      </div>
    );

  return (
    <section className="flex w-full flex-col items-center justify-start px-2 md:my-10">
      <div className="py-2 text-xl font-bold text-blue-600">BLOGS</div>
      <div>
        <Link to={"/post"}>+</Link>
      </div>
      {isBlogs.map((blog) => {
        return <BlogCard blog={blog} key={blog.id} />;
      })}
    </section>
  );
}
