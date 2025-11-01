"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth"; // BetterAuth setup
import { headers } from "next/headers";

export async function createMeeting(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() }); // ia userul logat
  const user = session?.user;

  if (!user) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const location = formData.get("location")?.toString() || "";
  const dateStr = formData.get("date")?.toString() || "";
  const date = dateStr ? new Date(dateStr) : null;
  const time = dateStr.includes("T") ? dateStr.split("T")[1] : null;

  if (!title || !date || isNaN(date.getTime())) {
    throw new Error("Title and valid date are required");
  }

  const meeting = await db.meeting.create({
    data: {
      title,
      description,
      location,
      date, // required DateTime field in Prisma schema
      time,
      userId: user.id, // ✅ corect
    },
  });

  // Adaugă automat creatorul ca participant "accepted"
  await db.meetingParticipant.create({
    data: {
      meetingId: meeting.id,
      userId: user.id,
      status: "accepted",
    },
  });

  return meeting;
}
