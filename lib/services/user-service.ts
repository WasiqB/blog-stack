import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type UpdateUserData = Prisma.UserUpdateInput;

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      platforms: {
        select: {
          platform: true,
          profile: true,
        },
      },
    },
  });
}

export async function updateUser(id: string, data: UpdateUserData) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function getUserPlatforms(userId: string) {
  return prisma.platformToken.findMany({
    where: { userId },
    select: {
      platform: true,
      profile: true,
    },
  });
}
