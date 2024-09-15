import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECERET: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  // get the jwt from the headers, analyse it return the id
  const header = c.req.header("authorization") || "";

  const token = header || "";

  const user = await verify(token, c.env.JWT_SECERET);
  console.log(user);
  next();
});

blogRoute.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

blogRoute.get("/api/v1/blog/:blog", (c) => {
  const id = c.req.param("blog");
  return c.text(id);
});
