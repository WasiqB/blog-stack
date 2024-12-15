import { createClient } from "@/lib/supabase/client";

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(data.path);

  return publicUrl;
}
