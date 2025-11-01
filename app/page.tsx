import FeedPage from "@/components/feedPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // 🔐 Verificăm sesiunea utilizatorului
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  });

  // ❌ Dacă nu e autentificat → trimite la /signup
  if (!session?.user) {
    redirect("/signup");
  }

  // ✅ Dacă e logat → arată feed-ul
  return (
    <div className="flex flex-col min-h-screen">
      <FeedPage />
    </div>
  );
}
