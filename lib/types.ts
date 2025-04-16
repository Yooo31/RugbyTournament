// Tournament type definition
export type Tournament = {
  id: string
  name: string
  location: string
  date: string
  price: string
  max_players: number
  registration_deadline: string
  url: string
  participants?: Array<{
    id: string
    full_name: string
  }>
}

// User type definition
export type User = {
  firstName: string
  lastName: string
}

// User inscription type
export type ParticipantWithUser = {
  id: string
  user_id: string
  tournament_id: string
  user: {
    first_name: string
    last_name: string
  }
}