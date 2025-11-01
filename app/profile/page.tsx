import { EditProfileForm } from "@/components/editProfileForm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // ✅ adaugi await
  const rawHeaders = await headers();
  const newHeaders = new Headers(rawHeaders);

  const session = await auth.api.getSession({
    headers: newHeaders,
  });

  const user = session?.user;
  if (!user) redirect("/signup");

  const userProfile = await db.userProfile.findUnique({
    where: { userId: user.id },
  });

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Your Profile</h1>
      <EditProfileForm userProfile={userProfile} />
    </div>
  );
}
