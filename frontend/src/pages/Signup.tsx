import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <section className="flex flex-col items-center justify-center py-[10%]">
      <div className="flex w-[30rem] flex-col items-center justify-center py-4">
        <h1 className="py-2 text-2xl font-bold">CREATE YOUR ACCOUNT</h1>
        <p>
          Already have an account?{" "}
          <Link className="font-semibold underline" to="/signin">
            Login
          </Link>
        </p>
      </div>
      <div className="w-[20rem]">
        <form className="flex w-full flex-col">
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="Enter your username"
          />
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Email
          </label>
          <input
            type="email"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="Enter your email"
          />
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Password
          </label>
          <input
            type="password"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="password"
          />
          <button className="my-4 rounded-md bg-black py-1 text-lg font-semibold text-white">
            Signup
          </button>
        </form>
      </div>
    </section>
  );
}
