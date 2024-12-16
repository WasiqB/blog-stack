import { prisma } from "@/lib/prisma";

export async function connectPlatform(
  userId: string,
  platform: string,
  data: {
    token: string;
    profile: any;
  }
) {
  return prisma.platformToken.upsert({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
    update: {
      token: data.token,
      profile: data.profile,
    },
    create: {
      userId,
      platform,
      token: data.token,
      profile: data.profile,
    },
  });
}

export async function disconnectPlatform(userId: string, platform: string) {
  return prisma.platformToken.delete({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
  });
}

export async function getPlatformToken(userId: string, platform: string) {
  return prisma.platformToken.findUnique({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
  });
}

export async function getUserPlatforms(userId: string) {
  return prisma.platformToken.findMany({
    where: { userId },
    select: {
      platform: true,
      token: true,
      profile: true,
    },
  });
}
