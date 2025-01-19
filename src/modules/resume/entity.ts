import {
  ExperienceLevel,
  Languages,
  Salary,
  Specialties,
  WorkFormat,
  WorkTime,
} from "shared/schemas"
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { z } from "zod"
import { ContactsResume } from "./dto/schema"

@Entity("resume")
export class ResumeEntity {
  @PrimaryColumn({ generated: false, type: "bigint" })
  id: string

  @Column({ type: "bigint" })
  message_id: string

  @Column({ type: "bigint", nullable: true })
  tg_user_id: string | null

  @Column({ type: "character varying", precision: 150, nullable: true })
  name: string

  @Column({ type: "character varying", precision: 200, nullable: true })
  position: string

  @Column({ type: "text", nullable: true })
  description: string | null

  @Column({ type: "integer", nullable: true })
  experience_months: number

  @Column({ type: "character varying", precision: 200, nullable: true })
  education: string | null

  @Column({ type: "character varying", array: true, nullable: true })
  skills: string[]

  @Column("enum", { array: true, enumName: "work_format", nullable: true })
  work_format: z.infer<typeof WorkFormat>[] | null

  @Column("enum", { array: true, enumName: "work_time", nullable: true })
  work_time: z.infer<typeof WorkTime>[] | null

  @Column({ type: "enum", enumName: "experience_level", nullable: true })
  experience_level: z.infer<typeof ExperienceLevel> | null

  @Column({ type: "simple-json", nullable: true })
  salary: z.infer<typeof Salary> | null

  @Column({ type: "jsonb", array: true, nullable: true })
  languages: z.infer<typeof Languages>[] | null

  @Column({ type: "simple-json", nullable: true })
  contacts: z.infer<typeof ContactsResume> | null

  @Column({ type: "character varying", precision: 150, nullable: true })
  location: string | null

  @Column({ type: "character varying", array: true, nullable: true })
  specialties: z.infer<typeof Specialties>[]

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
