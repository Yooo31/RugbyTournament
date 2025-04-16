"use client";

import type { Tournament, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Link,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Props = {
  tournament: Tournament;
  user: User;
  onToggle: (id: string) => void;
};

export const TournamentCard = ({ tournament, user, onToggle }: Props) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const participants = tournament.participants ?? [];

  const isRegistered = participants.some((p) => p.full_name === fullName);
  const spotsLeft = tournament.max_players - participants.length;
  const isClosed = new Date(tournament.registration_deadline) < new Date();
  const [showParticipants, setShowParticipants] = useState(false);

  const participationPercentage =
    (participants.length / tournament.max_players) * 100;

  const formattedDate = new Date(tournament.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  return (
    <Card className="overflow-hidden border-none shadow-md p-0">
      <CardHeader className="p-0 overflow-hidden">
        <div className="h-2 bg-blue-600"></div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-xl tracking-tight text-gray-900">
                {tournament.name}
              </h2>

              <div className="flex items-center mt-1 text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span className="text-sm">{tournament.location}</span>
              </div>
            </div>

            {isRegistered ? (
              <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100">
                Inscrit
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-gray-500 border-gray-200"
              >
                {new Date(tournament.registration_deadline) < new Date()
                  ? "Terminé"
                  : spotsLeft === 0
                  ? "Complet"
                  : `${spotsLeft} places`}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <Calendar size={16} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={16} className="text-green-600 mr-2" />
            <span className="text-sm font-medium">{tournament.price}</span>
          </div>
          <div className="flex items-center underline">
            <Link size={16} className="text-orange-500 mr-2" />
            <span className="text-sm font-medium">
              <a
                href={tournament.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                En savoir plus
              </a>
            </span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="text-purple-600 mr-2" />
            <span className="text-sm font-medium">
              {participants.length}/{tournament.max_players}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              participationPercentage >= 90
                ? "bg-red-500"
                : participationPercentage >= 70
                ? "bg-orange-500"
                : "bg-blue-600"
            }`}
            style={{ width: `${participationPercentage}%` }}
          ></div>
        </div>

        {showParticipants && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-sm mb-2 text-gray-700">
              Participants:
            </p>
            <div className="flex flex-wrap gap-2">
              {participants.length === 0 ? (
                <span className="text-sm text-gray-500">Aucun participant</span>
              ) : (
                participants.map((p) => {
                  const [first, last] = p.full_name.split(" ");
                  const short = `${first}${last ? ` ${last[0]}.` : ""}`;
                  return (
                    <Badge key={p.id} variant="outline" className="bg-white">
                      {short}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
        <Button
          className="flex-1"
          variant={isRegistered ? "outline" : "default"}
          onClick={() => onToggle(tournament.id)}
          disabled={isClosed || (!isRegistered && spotsLeft === 0)}
        >
          {isClosed
            ? "Inscriptions clôturées"
            : isRegistered
            ? "Se désinscrire"
            : spotsLeft === 0
            ? "Complet"
            : "S'inscrire"}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setShowParticipants((v) => !v)}
          className="h-10 w-10 rounded-full"
        >
          {showParticipants ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
