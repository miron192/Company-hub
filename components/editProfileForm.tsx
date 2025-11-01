"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { updateProfile } from "@/app/server/profile/edit";

export function EditProfileForm({ userProfile }: any) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    userProfile?.profileImage || null
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    await updateProfile(formData);
    setLoading(false);
    alert("✅ Profile updated successfully!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-4 border border-border rounded-lg p-6 bg-card"
    >
      <h2 className="text-lg font-semibold">Edit Profile</h2>

      <Input
        name="company"
        placeholder="Company"
        defaultValue={userProfile?.company || ""}
      />
      <Input
        name="position"
        placeholder="Position"
        defaultValue={userProfile?.position || ""}
      />
      <Input
        name="departament"
        placeholder="Department"
        defaultValue={userProfile?.departament || ""}
      />
      <Textarea
        name="bio"
        placeholder="Bio..."
        defaultValue={userProfile?.bio || ""}
      />

      <div className="flex items-center gap-3">
        <label className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ImagePlus className="w-4 h-4" />
          <span>Change profile image</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        {preview && (
          <img
            src={preview}
            className="h-12 w-12 rounded-full object-cover border"
          />
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
