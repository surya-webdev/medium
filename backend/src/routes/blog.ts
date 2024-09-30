import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogInputs } from "@surya_dev_/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECERET: string;
  };
}>();

// blogRoute.use("*", (c, next) => {
//   const prisma: any = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   c.set("prisma", prisma);

//   next();
// });

blogRoute.use("/*", async (c, next) => {
  // get the jwt from the headers, analyse it return the id
  const header = c.req.header("authorization") || "";

  const token = header || "";
  try {
    const user = (await verify(token, c.env.JWT_SECERET)) || "";
    /////
    console.log(user);

    if (user.id) {
      c.set("jwtPayload", user);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "Your'e not logged in :(((",
      });
    }
  } catch (error) {
    console.error(error);
    c.status(403);
    return c.json({
      message: "Your'e not logged in :(((",
    });
  }
  //////////////////
});

blogRoute.post("/post", async (c) => {
  //
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.get("jwtPayload");

  const body = await c.req.json();

  const { success } = blogInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not valid!!!",
    });
  }

  if (id && (body.title || body.content)) {
    //
    try {
      const blog = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content || "",
          authorId: id?.id,
        },
      });

      return c.json({ blog });

      //
    } catch (error) {
      console.error(error);
      c.status(411);
      return c.json({ message: "ERROR WHILE FETCHING" });
    }
  } else {
    c.status(300);
    return c.text("PLEASE GIVE A VALID BLOG");
  }
});

blogRoute.put("/:id/edit", async (c) => {
  //
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = blogInputs.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not valid!!!",
    });
  }

  const authorId = c.get("jwtPayload");

  const id = c.req.param("id");

  console.log(id);

  if (body.title || body.content) {
    try {
      const user = await prisma.post.update({
        where: {
          id,
          authorId: authorId.id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });

      return c.json({ user });
    } catch (error) {
      console.error(error);
      c.status(400);
      return c.json({ error: "FAILDED WHILE FETCHING!" });
    }
  } else {
    c.status(300);
    return c.json({
      message: "invalid inputs",
    });
  }
});

// TODO ADDING PAGINATION:

blogRoute.post("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (blogs) {
      return c.json({ blogs });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    return c.json({ error: "FAILDED WHILE FETCHING!" });
  }
});

// id

blogRoute.get("/:id", async (c) => {
  // 4943b6af-f9d9-463b-a4b2-8482c5b5006c

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const blogs = await prisma.post.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    //
  });
  if (blogs) return c.json({ blogs });
  else {
    c.status(411);
    return c.json({
      message: "No blogs by the user",
    });
  }
});
