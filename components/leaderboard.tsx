import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Award } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Antonio",
    score: 2847,
    change: "+12",
    wins: 24,
    initials: "AN",
  },
  {
    rank: 2,
    name: "Catalin",
    score: 2691,
    change: "+8",
    wins: 21,
    initials: "CA",
  },
]

export function Leaderboard() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-2">Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Top performers this season</p>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((player) => (
          <Card
            key={player.rank}
            className={`p-6 transition-all hover:shadow-lg ${
              player.rank === 1 ? "bg-gradient-to-r from-accent-gold/10 to-transparent border-accent-gold" : ""
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              {/* Rank Badge */}
              <div className="flex-shrink-0">
                {player.rank === 1 ? (
                  <div className="relative">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent-gold flex items-center justify-center">
                      <Trophy className="w-6 h-6 md:w-8 md:h-8 text-accent-gold-foreground" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center text-xs font-bold text-accent-gold-foreground">
                      {player.rank}
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground">{player.rank}</span>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <Avatar className="w-12 h-12 md:w-14 md:h-14">
                <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                  {player.initials}
                </AvatarFallback>
              </Avatar>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{player.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {player.wins} wins
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{player.score.toLocaleString()}</div>
                <div className="text-sm font-medium text-accent-success">{player.change}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">2</div>
          <div className="text-sm text-muted-foreground">Total Players</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">45</div>
          <div className="text-sm text-muted-foreground">Total Wins</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">5,538</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">156</div>
          <div className="text-sm text-muted-foreground">Point Gap</div>
        </Card>
      </div>
    </div>
  )
}
