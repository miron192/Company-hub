import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createMeeting } from "@/app/server/meeting/createMeeting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateMeetingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) redirect("/login");

  async function handleSubmit(formData: FormData) {
    "use server";
    await createMeeting(formData);
    redirect("/discover"); // după creare, du-te pe pagina cu meeting-uri
  }

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Create a Meeting</h1>

      <form
        action={handleSubmit}
        className="space-y-4 bg-card p-6 rounded-2xl shadow"
      >
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <Input
            name="title"
            placeholder="Ex: Ping-pong on Friday night"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <Textarea
            name="description"
            placeholder="Short description (optional)"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Location</label>
          <Input name="location" placeholder="Ex: ASE Sports Hall" />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Date and Time</label>
          <Input type="datetime-local" name="date" required />
        </div>

        <Button type="submit" className="w-full">
          Create Meeting
        </Button>
      </form>
    </div>
  );
}
