import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  primaryKey,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userReadBlogs = pgTable(
  "user_read_blogs",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    blogId: serial("blog_id")
      .notNull()
      .references(() => blogs.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // Composite primary key ensures a user can only have one "read" entry per blog
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.blogId] }),
  })
);

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videos = pgTable(
  "videos",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    youtubeUrl: text("youtube_url").notNull(), // e.g., https://www.youtube.com/watch?v=...
    youtubeId: text("youtube_id").notNull(), // e.g., _rTCzxg6VmM
    courseId: integer("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    section: text("Section").notNull().default("General"),
    sequence: integer("sequence").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    youtubeIdIdx: uniqueIndex("youtube_id_idx").on(t.youtubeId),
  })
);

export const userWatchedVideos = pgTable(
  "user_watched_videos",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    videoId: integer("video_id")
      .notNull()
      .references(() => videos.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.videoId] }),
  })
);

// NEW: Define relations for easier querying
export const userRelations = relations(user, ({ many }) => ({
  watchedVideos: many(userWatchedVideos),
}));

export const videoRelations = relations(videos, ({ many }) => ({
  watchEntries: many(userWatchedVideos),
}));

export const userWatchedVideosRelations = relations(
  userWatchedVideos,
  ({ one }) => ({
    user: one(user, {
      fields: [userWatchedVideos.userId],
      references: [user.id],
    }),
    video: one(videos, {
      fields: [userWatchedVideos.videoId],
      references: [videos.id],
    }),
  })
);
