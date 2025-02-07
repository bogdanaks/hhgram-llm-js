import { MessagePreType } from "shared/types"
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm"

@Entity("message")
export class MessageEntity {
  @PrimaryColumn({ generated: true, type: "bigint" })
  id: string

  @Column({ type: "bigint", nullable: false })
  message_id: string

  @Column({ type: "bigint", nullable: false })
  source_id: string

  @Column({ type: "bigint", nullable: true })
  from_id: string | null

  @Column({ type: "bigint", nullable: true })
  duplicate_id: string | null

  @OneToOne((rec) => MessageEntity, (rec) => rec.id)
  @JoinColumn({ name: "duplicate_id" })
  duplicate: MessageEntity | null

  @Column({ type: "text", nullable: true })
  text: string | null

  @Column({ type: "enum", enumName: "message_type" })
  pre_type: MessagePreType | null

  @Column({ type: "timestamp with time zone" })
  message_at: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: string

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: string
}
