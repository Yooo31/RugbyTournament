"use client";

import { supabase } from "@/lib/supabase";
import type { Tournament } from "@/lib/types";
import { useEffect, useState } from "react";

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        setError("Erreur lors du chargement des tournois");
      } else {
        setTournaments(data);
      }

      setLoading(false);
    };

    fetchTournaments();
  }, []);

  return { tournaments, loading, error };
};
