import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample game data - replace with your actual games
const games = [
  {
    id: 1,
    title: "Wordle",
    description: "Guess the word!",
    image: "/wordle.jpeg",
    players: "1",
    link: "http://wordle-hackathon-veghes-w8vd.vercel.app/",
  },
  {
    id: 2,
    title: "Word Guess",
    description: "Fun and challenging word puzzles",
    image: "/wordgame.jpeg",
    players: "1",
    link: "https://words-hackathon-veghes.vercel.app/",
  },
  {
    id: 3,
    title: "Memory Match",
    description: "Test your memory with this fun card matching game!",
    image: "/memory.jpeg",
    players: "1",
    link: "https://memory-hackathon-veghes-mmcx.vercel.app/", // înlocuiește cu linkul real când îl ai
  },
  {
    id: 4,
    title: "Path Drag",
    description: "Drag the path to the goal!",
    image: "/path.jpeg",
    players: "1",
    link: "https://wordle-hackathon-veghes-w8vd.vercel.app/",
  },
];

export function GameGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <Card
          key={game.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-video relative overflow-hidden bg-muted">
            <Image
              fill
              src={game.image || "/placeholder.svg"}
              alt={game.title}
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              {game.title}
            </CardTitle>
            <CardDescription>{game.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Players: {game.players}
              </span>
              <Link href={game.link} target="_blank" rel="noopener noreferrer">
                <Button className="cursor-pointer">Play Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
