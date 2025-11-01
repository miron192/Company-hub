"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      // 🔄 Navighează către homepage după logout
      router.push("/");
    } catch (error) {
      console.error("❌ Eroare la sign out:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleSignOut} className="mx-auto">
      Sign Out
    </Button>
  );
}
