import { NextResponse } from "next/server";
import { getBlogs, createBlog } from "@/lib/services/blog-service";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "published";
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const sortBy = searchParams.get("sortBy") || "newest";
  const authorId = searchParams.get("authorId");

  try {
    const blogs = await getBlogs({ status, tags, sortBy, authorId });

    // Collect unique tags from all blogs
    const allTags = new Set<string>();
    blogs.forEach((blog) => blog.tags.forEach((tag) => allTags.add(tag)));

    return NextResponse.json({
      blogs,
      tags: Array.from(allTags),
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const blog = await createBlog({
      ...body,
      author: {
        connect: { id: user.id },
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
