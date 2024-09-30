// type blogsInput = {
//   author: object;
//   authorId: string;
//   title: string;
//   content: string;
//   id: string;
//   published: string;
// };

import { Link } from "react-router-dom";
import { blogsInput } from "../helpers/types";

export default function BlogCard({ blog }) {
  const { author, authorId, title, content, id } = blog;

  return (
    <>
      <div className="flex w-full flex-col gap-2 py-2 sm:w-[50%]">
        <div className="flex items-center gap-2">
          <span className="block h-full rounded-[50%] bg-gray-600 px-4 py-2 text-center text-white">
            {author.name.split("").at(0)}
          </span>
          <p className="cursor-pointer font-bold">
            <Link to={`/${authorId}`}>{author.name}</Link>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/blog/${id}`} className="text-xl font-semibold">
            {title}
          </Link>
          <p className="text-lg font-normal">
            {content.split(" ").length > 50
              ? `${content.split(" ").splice(0, 20).join()}...`
              : content}
          </p>
        </div>
        <p>{`${Math.ceil(content.split(" ").length / 50)} minutes read`}</p>
        <hr></hr>
      </div>
    </>
  );
}
