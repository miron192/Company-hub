import { GameGrid } from "@/components/game-grid";

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Games</h1>
          <p className="text-muted-foreground">
            Browse and play your favorite games
          </p>
        </div>
        <GameGrid />
      </div>
    </main>
  );
}
