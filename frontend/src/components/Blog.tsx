import { Link } from "react-router-dom";

export default function Blog({ blog }) {
  const { id, title, content, authorId } = blog;

  return (
    <div className="flex flex-col gap-2">
      <Link to={`/blog/${id}`} className="text-xl font-semibold">
        {title}
      </Link>
      <p className="text-lg font-normal">
        {content.split(" ").length > 50
          ? `${content.split(" ").splice(0, 20).join()}...`
          : content}
      </p>
      <p>{`${Math.ceil(content.split(" ").length / 50)} minutes read`}</p>
      <hr></hr>
    </div>
  );
}
