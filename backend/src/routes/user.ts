import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECERET: string;
  };
}>();

userRoute.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findMany();
  return c.json({ user });
});

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  if (!body.email) return c.text("ENTER THE CORRECT VALIDATION");

  // check there is a user before;
  try {
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

    //
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ message: "ERROR WHILE FETCHING" });
  }

  //
});

// SIGNIN

userRoute.post("/signin", async (c) => {
  //
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //token to verify , email & PASSOWORD
  const body = await c.req.json();

  try {
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
      //
    } else {
      c.status(403);
      return c.text("NO USER FOUND");
    }
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ message: "ERROR WHILE FETCHING" });
  }
});
