import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate slug from title if not provided
    const slug = body.slug || body.titleAr
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
    
    const post = await prisma.blogPost.create({
      data: {
        title: body.title || "",
        titleAr: body.titleAr,
        slug: slug,
        content: body.content || "",
        contentAr: body.contentAr,
        excerpt: body.excerpt || "",
        excerptAr: body.excerptAr,
        image: body.image || null,
        tags: body.tags || "",
        tagsAr: body.tagsAr || "",
        published: body.published ?? false,
        publishedAt: body.published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
