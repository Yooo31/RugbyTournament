"use client";

import { supabase } from "@/lib/supabase";
import type { ParticipantWithUser, Tournament } from "@/lib/types";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export const useParticipation = () => {
  const { user } = useUser();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: tournamentsData, error: tournamentsError } = await supabase
        .from("tournaments")
        .select("*")
        .order("date", { ascending: true });

      if (tournamentsError) {
        setError("Erreur chargement tournois");
        setLoading(false);
        return;
      }

      const { data: participantsDataRaw, error: participantsError } =
        await supabase.from("participants").select(`
            id,
            user_id,
            tournament_id,
            user:users (
              first_name,
              last_name
            )
          `);

      if (participantsError) {
        setError("Erreur chargement participants");
        setLoading(false);
        return;
      }

      const participantsData = (participantsDataRaw ??
        []) as unknown as ParticipantWithUser[];

      const enrichedTournaments = tournamentsData.map((tournament) => {
        const participants = participantsData
          .filter((p) => p.tournament_id === tournament.id)
          .map((p) => ({
            id: p.user_id,
            full_name: `${p.user.first_name} ${p.user.last_name}`,
          }));

        return { ...tournament, participants };
      });

      setTournaments(enrichedTournaments);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleParticipation = async (tournamentId: string) => {
    if (!user) return;

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("first_name", user.firstName)
      .eq("last_name", user.lastName)
      .single();

    let userId = existingUser?.id;

    if (!userId) {
      const { data: newUser } = await supabase
        .from("users")
        .insert({
          first_name: user.firstName,
          last_name: user.lastName,
        })
        .select("id")
        .single();

      userId = newUser?.id;
    }

    if (!userId) return;

    const { data: existingParticipation } = await supabase
      .from("participants")
      .select("id")
      .eq("user_id", userId)
      .eq("tournament_id", tournamentId)
      .single();

    if (existingParticipation) {
      await supabase
        .from("participants")
        .delete()
        .eq("id", existingParticipation.id);
    } else {
      await supabase.from("participants").insert({
        user_id: userId,
        tournament_id: tournamentId,
      });
    }

    location.reload();
  };

  return {
    user,
    tournaments,
    loading,
    error,
    toggleParticipation,
  };
};
