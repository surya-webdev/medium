import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Post() {
  //
  const [isBlog, setIsBlog] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handler(e) {
    e.preventDefault();
    if (!isBlog.content || !isBlog.title) return;

    const user = await axios.post(
      `${BACKEND_URL}/api/v1/blog/post`,
      {
        title: isBlog.title,
        content: isBlog.content,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    if (user.data.blog) {
      setIsBlog({ ...isBlog, title: "", content: "" });
      // alert("Blog added ");
      return navigate(`/blog/${user.data.blog.id}`);
    }
  }

  return (
    <section
      onSubmit={(e) => handler(e)}
      className="flex flex-col items-center justify-center py-20 text-lg"
    >
      <form className="flex w-full flex-col gap-4 sm:w-[50%]">
        <label htmlFor="title" className="">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) => setIsBlog({ ...isBlog, title: e.target.value })}
          value={isBlog.title}
          className="rounded-lg border border-black bg-green-50 px-2 py-2"
          id="title"
        />
        <label htmlFor="content" className="">
          Message
        </label>
        <textarea
          value={isBlog.content}
          onChange={(e) => setIsBlog({ ...isBlog, content: e.target.value })}
          rows="6"
          cols="50"
          className="rounded-lg border border-black bg-green-50 px-2 py-2"
          id="content"
        ></textarea>
        <div>
          <button className="rounded-lg bg-black px-10 py-2 text-white">
            Publish
          </button>
        </div>
      </form>
    </section>
  );
}
