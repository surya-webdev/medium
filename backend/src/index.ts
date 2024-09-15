import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECERET: string;
  };
}>();

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  if (!body.email) return c.text("NO USER INPUt");

  // check there is a user before;
  const checkExistingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!checkExistingUser) {
    const user = await prisma.user.create({
      data: { email: body.email, password: body.password, name: body.name },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECERET);

    console.log(token);

    return c.json({ jwt: token });
  } else {
    c.status(403);
    return c.text("EXISTING USER EMAIL !!!");
  }
});

// SIGNIN

app.post("api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //token to verify , email & PASSOWORD

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  console.log(user);

  if (user) {
    const checkIsUser = await sign({ id: user.id }, c.env.JWT_SECERET);

    return c.json({ jwt: checkIsUser });
  } else {
    c.status(403);
    return c.text("NO USER FOUND");
  }

  //
});

app.get("/api/v1/blog/:blog", (c) => {
  const id = c.req.param("blog");
  return c.text(id);
});

export default app;
