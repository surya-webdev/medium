import { useEffect, useState } from "react";
import { userBlogs } from "../helpers/types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Blog from "./Blog";

export default function AuthorBlog() {
  const { authorid } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<userBlogs[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    try {
      setIsLoading(() => true);
      const blog = await axios.get(
        `${BACKEND_URL}/api/v1/blog/user/${authorid}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setUser(blog.data.blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(() => false);
    }
  }
  // console.log(user);
  useEffect(() => {
    getData();
  }, []);

  if (isLoading || !user)
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
  return (
    <section className="flex flex-col items-center justify-center py-10">
      <div className="flex w-full flex-col items-start justify-start gap-2 py-2 sm:w-[50%]">
        <div className="flex items-center gap-2">
          <span className="block h-full rounded-[50%] bg-gray-600 px-4 py-2 text-center text-white">
            {user.name?.split("")[0]}
          </span>
          <p className="cursor-pointer font-bold">
            <Link to={`/user/${user.id}`}>{user?.name}</Link>
          </p>
        </div>
      </div>
      <div>
        {user?.posts?.map((blog) => <Blog blog={blog} key={blog.id} />)}
        {user?.post?.length === 0 ? <p>No blogs posted</p> : <></>}
      </div>
    </section>
  );
}
