import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(await headers()),
    });

    const user = session?.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userProfile = await db.userProfile.findUnique({
      where: { userId: user.id },
      select: { company: true },
    });

    if (!userProfile?.company) {
      return NextResponse.json({ friends: [] });
    }

    const friends = await db.userProfile.findMany({
      where: {
        company: userProfile.company,
        NOT: { userId: user.id },
      },
      include: {
        user: {
          select: { name: true, email: true, image: true },
        },
      },
    });

    const formatted = friends.map((f: any) => ({
      id: f.userId,
      name: f.user.name,
      email: f.user.email,
      avatar: f.profileImage || f.user.image || "/placeholder.svg",
      position: f.position,
      departament: f.departament,
    }));

    return NextResponse.json({ friends: formatted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
