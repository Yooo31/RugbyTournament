"use client";

import type { User } from "@/lib/types";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "rugby-user";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  const saveUser = (newUser: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    window.location.reload();
  };

  return { user, saveUser, isLoaded };
};
