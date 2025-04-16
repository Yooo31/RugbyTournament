'use client'

import { UserDialog } from '@/components/UserDialog'
import { TournamentCard } from '@/components/TournamentCard'
import { useUser } from '@/hooks/useUser'
import { useParticipation } from '@/hooks/useParticipation'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  const { user, isLoaded } = useUser()
  const { tournaments, loading, error, toggleParticipation } = useParticipation()

  const isLoadingUser = !isLoaded
  const isLoadingTournaments = loading

  const showSkeletons = isLoadingUser || isLoadingTournaments || !user

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <UserDialog />
      <h1 className="text-2xl font-bold mb-6">🏉 Liste des tournois</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {showSkeletons ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-md" />
          ))
        ) : (
          tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              user={user}
              onToggle={toggleParticipation}
            />
          ))
        )}
      </div>
    </main>
  )
}
