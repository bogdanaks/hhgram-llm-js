import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity("misc_parsed")
export class MiscParsedEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string

  @Column({ type: "bigint" })
  message_id: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
