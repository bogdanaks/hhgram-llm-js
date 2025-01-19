import {
  ExperienceLevel,
  Languages,
  Salary,
  Specialties,
  WorkFormat,
  WorkTime,
} from "shared/schemas"
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm"
import { z } from "zod"
import { ContactsVacancy } from "./dto/schema"

@Entity("vacancy")
export class VacancyEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string

  @Column({ type: "bigint" })
  message_id: string

  @Column({ type: "bigint", nullable: true })
  tg_user_id: string | null

  @Column({ type: "character varying", precision: 200, nullable: true })
  company_name: string | null

  @Column({ type: "character varying", precision: 200, nullable: true })
  position: string | null

  @Column({ type: "text", nullable: true })
  description: string | null

  @Column({ type: "integer", nullable: true })
  experience_months: number | null

  @Column({ type: "character varying", precision: 200, nullable: true })
  education: string | null

  @Column({ type: "character varying", array: true, default: [], nullable: true })
  skills: string[] | null

  @Column("enum", { array: true, enumName: "work_format", nullable: true })
  work_format: z.infer<typeof WorkFormat>[] | null

  @Column("enum", { array: true, enumName: "work_time", nullable: true })
  work_time: z.infer<typeof WorkTime>[] | null

  @Column({ type: "enum", enumName: "experience_level", nullable: true })
  experience_level: z.infer<typeof ExperienceLevel> | null

  @Column({ type: "simple-json", nullable: true })
  salary: z.infer<typeof Salary> | null

  @Column({ type: "jsonb", nullable: true })
  languages: z.infer<typeof Languages>[] | null

  @Column({ type: "character varying", precision: 150, nullable: true })
  location: string | null

  @Column({ type: "simple-json", nullable: true })
  contacts: z.infer<typeof ContactsVacancy> | null

  @Column({ type: "character varying", array: true, nullable: true })
  specialties: z.infer<typeof Specialties>[]

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
