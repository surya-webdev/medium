import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export default function Blogs() {
  // useEffect hook , get the datas
  //till then skeleton should load
  // error occurs handle
  // if there is no blog handle

  const [isBlogs, setIsblogs] = useState(null);
  const token = localStorage.getItem("token");

  async function getData() {
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
  }

  useEffect(() => {
    getData();
  }, []);

  if (!isBlogs) return <p>....Loading</p>;
  return (
    <section>
      <div>blog</div>;
    </section>
  );
}
