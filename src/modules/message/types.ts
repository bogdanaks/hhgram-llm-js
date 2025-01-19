export interface CreateMessage {
  id: string
  source_id: string
  from_id: string | null
  duplicate_id: string | null
  text: string | null
  message_at: string
}
