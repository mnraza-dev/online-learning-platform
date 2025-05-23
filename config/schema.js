import { integer, json, pgTable, varchar , boolean} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  noOfChapters: integer().notNull(),
  category: varchar({ length: 255 }).notNull(),
  isVideoIncluded: boolean().default(false),
  difficulty_level: varchar({ length: 255 }).notNull(),
  duration: varchar({ length: 255 }),
  courseJson:json(),
  bannerImageUrl: varchar({ length: 255 }).default('https://cdn-icons-png.flaticon.com/512/4076/4076549.png'),
  userEmail: varchar("userEmail").references(() => usersTable.email),
});
