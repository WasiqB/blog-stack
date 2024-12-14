import { prisma } from '@/lib/prisma';
import { BlogFilter } from '@/lib/types/blog';

export async function createBlog(userId: string, data: {
  title: string;
  tagline?: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  scheduledFor?: Date;
  platforms?: Record<string, boolean>;
}) {
  return prisma.blog.create({
    data: {
      ...data,
      authorId: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function updateBlog(blogId: string, userId: string, data: {
  title?: string;
  tagline?: string;
  content?: string;
  imageUrl?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'scheduled';
  scheduledFor?: Date;
  platforms?: Record<string, boolean>;
}) {
  return prisma.blog.update({
    where: {
      id: blogId,
      authorId: userId,
    },
    data,
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function deleteBlog(blogId: string, userId: string) {
  return prisma.blog.delete({
    where: {
      id: blogId,
      authorId: userId,
    },
  });
}

export async function getBlogById(blogId: string) {
  return prisma.blog.findUnique({
    where: { id: blogId },
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function getBlogs(filter: BlogFilter & { authorId?: string }) {
  const where: any = {};
  
  if (filter.status) {
    where.status = filter.status;
  }
  
  if (filter.authorId) {
    where.authorId = filter.authorId;
  }
  
  if (filter.tags?.length) {
    where.tags = {
      hasEvery: filter.tags,
    };
  }

  const orderBy: any = {};
  switch (filter.sortBy) {
    case 'oldest':
      orderBy.createdAt = 'asc';
      break;
    case 'popular':
      orderBy.viewCount = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
  }

  return prisma.blog.findMany({
    where,
    orderBy,
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
}