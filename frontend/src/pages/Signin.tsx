import { UserSignin } from "@surya_dev_/medium-common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState<UserSignin>({
    email: "",
    password: "",
  });
  async function onSubmit(e: any) {
    e.preventDefault();
    if (data.email && data.password) {
      try {
        const user = await axios.post(
          `${BACKEND_URL}/api/v1/user/signin`,
          data,
        );
        const token = user?.data.jwt;
        localStorage.setItem("token", token);
        navigate("/blogs");
      } catch (error) {
        console.error(error);
        alert("error");
      }
    }
  }
  return (
    <section className="flex flex-col items-center justify-center py-[10%]">
      <div className="flex w-[30rem] flex-col items-center justify-center py-4">
        <h1 className="py-2 text-2xl font-bold">Login into your account</h1>
        <p>
          Don't have an account?{" "}
          <Link className="font-semibold underline" to="/signup">
            Login
          </Link>
        </p>
      </div>
      <div className="w-[20rem]">
        <form onSubmit={(e) => onSubmit(e)} className="flex w-full flex-col">
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Email
          </label>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="Enter your email"
          />
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Password
          </label>
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="password"
          />
          <button className="my-4 rounded-md bg-black py-1 text-lg font-semibold text-white">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
