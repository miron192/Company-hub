import { getMeetings } from "@/app/server/meeting/getMeetings";
import CreateMeetingPage from "@/components/create-meeting";

export default async function Discover() {
  const meetings = await getMeetings();

  return (
    <div className="p-6 space-y-8">
      {/* 📝 Formularul de creare meeting */}
      <CreateMeetingPage />

      {/* 📅 Lista de meetinguri */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Meetings</h2>

        {meetings.length === 0 ? (
          <p className="text-muted-foreground">No meetings yet.</p>
        ) : (
          <ul className="space-y-4">
            {meetings.map((m: any) => (
              <li
                key={m.id}
                className="p-4 border rounded-lg shadow-sm bg-card flex flex-col gap-2"
              >
                {/* 🔹 Info despre creator */}
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-sm text-muted-foreground">
                      By {m.creator?.name || "Unknown"}{" "}
                      {m.creator?.profile?.company
                        ? `(${m.creator.profile.company})`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* 🔹 Descriere */}
                {m.description && (
                  <p className="text-sm mt-2 text-foreground">
                    {m.description}
                  </p>
                )}

                {/* 🔹 Detalii meeting */}
                <p className="text-xs text-muted-foreground mt-1">
                  📅 {new Date(m.date).toLocaleString()}{" "}
                  {m.time ? `• 🕒 ${m.time}` : ""}{" "}
                  {m.location ? `• 📍 ${m.location}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
