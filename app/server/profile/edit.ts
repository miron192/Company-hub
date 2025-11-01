"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { headers } from "next/headers";

export async function updateProfile(formData: FormData) {
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const departament = formData.get("departament") as string;
  const bio = formData.get("bio") as string;
  const file = formData.get("file") as File | null;

  let profileImage: string | undefined;

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile-images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    profileImage = uploadResult.secure_url;
  }

  await db.userProfile.upsert({
    where: { userId: user.id },
    update: { company, position, departament, bio, profileImage },
    create: {
      userId: user.id,
      company,
      position,
      departament,
      bio,
      profileImage,
    },
  });

  return { success: true };
}
