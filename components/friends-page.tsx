"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserMinus, Users } from "lucide-react";

type Friend = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position?: string;
  departament?: string;
};

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetch("/api/friends");
      const data = await res.json();
      setFriends(data.friends || []);
    };
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8" />
            <h1 className="text-3xl font-semibold tracking-tight text-balance">
              Friends
            </h1>
          </div>
          <p className="text-muted-foreground text-pretty">
            Members in your company
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search colleagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results */}
        {filteredFriends.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No colleagues found</p>
          </Card>
        ) : (
          filteredFriends.map((friend) => (
            <Card key={friend.id} className="p-4 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {friend.email}
                    </p>
                    {friend.position && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {friend.position} • {friend.departament}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
