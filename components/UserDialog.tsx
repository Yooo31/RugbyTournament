"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

export const UserDialog = () => {
  const { user, saveUser, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (isLoaded && !user) {
      setOpen(true);
    }
  }, [user, isLoaded]);

  const handleSubmit = () => {
    if (firstName && lastName) {
      saveUser({ firstName, lastName });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bienvenue !</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button className="w-full" onClick={handleSubmit}>
            C’est parti !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
