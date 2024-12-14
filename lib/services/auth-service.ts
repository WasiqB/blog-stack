import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function getUserSession() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function createUserProfile(userId: string, data: { 
  email: string;
  fullName?: string;
}) {
  return prisma.user.create({
    data: {
      id: userId,
      email: data.email,
      fullName: data.fullName,
    },
  });
}

export async function updateUserProfile(userId: string, data: {
  fullName?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  avatarUrl?: string;
}) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

export async function deleteUserProfile(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  });
}