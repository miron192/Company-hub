"use server";

import { db } from "@/lib/db";

export async function getMeetings() {
  const meetings = await db.meeting.findMany({
    include: {
      creator: {
        include: {
          profile: true, // 👈 dacă vrei să accesezi compania / jobul
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return meetings;
}
