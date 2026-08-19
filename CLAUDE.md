@AGENTS.md

## What this is

"Insta" — an Instagram-style learning project built by the user to learn React Native / Expo Router. Stack: Expo Router v57 (file-based routing, `src/app`), React Native 0.86, `expo-sqlite` for a preloaded local database, TypeScript.

## Working style — read this first

**This is a learning project. The user writes the code themselves; act as a mentor, not an implementer.**

- Default mode: explain the concept and what the code needs to do, then let the user write it in their own editor. Review what they write (bugs, gotchas, TS issues) as feedback, not as a rewrite.
- Do not use Write/Edit on project source files unless the user explicitly hands off a specific step (e.g. "make this change", "go ahead and do it", "refactor X for me"). A hand-off is scoped to what was asked — don't drift into adjacent files or cleanup beyond that.
- One concept/file at a time. Confirm understanding before moving to the next.
- This applies to all work on this project (DB, queries, hooks, screens, styling), not just the original database task.

## Structure

- `src/app/` — Expo Router routes. `tabs/_layout.tsx` uses `NativeTabs` (from `expo-router/unstable-native-tabs`) with relative Trigger names. `tabs/home/index.tsx` is the feed screen, `post-view.tsx` holds the `FeedCard` component.
- `src/db/` — data layer: `schema.ts` (CREATE TABLE/INDEX strings), `types.ts` (row + composed types), `seed.ts`/`sample_data.ts` (seed data + insert logic), `migrations.ts` (`initDatabase`, wired via `SQLiteProvider onInit` in `src/app/_layout.tsx`), `queries/` (posts, likes, comments — parameterized, joined, aggregated).
- `src/hooks/` — one hook per query (`use-feed-posts`, `use-post`, `use-likes`, `use-comments`), each returning `{ data, loading, error, refetch }`.
- `src/components/` — shared `ThemedText`/`ThemedView` (theme-aware via `useTheme()` + `Colors`/`Spacing`/`Fonts` tokens in `src/constants/theme.ts`). Prefer these over raw `View`/`Text` with hardcoded colors.

## SQLite conventions

- Single shared `db` connection via `SQLiteProvider`'s `onInit` — never open a second connection elsewhere.
- One-time schema/seed via the `PRAGMA user_version` guard in `migrations.ts`; `PRAGMA foreign_keys = ON` is per-connection and must run unconditionally every launch (not inside the version-gated block).
- Always use parameterized queries (`$param` binding), never string interpolation.
- `getAllAsync<T>`/`getFirstAsync<T>` generics aren't checked against the SQL — verify the selected columns actually match `T`.

## Known open items

- `FeedCard`'s tap handlers (`handleUserInfoTap`, `handleDoubleTap`, `handleLikeToggle`, `handleCommentTap`) are stubs.
- No post detail route wired to `getPostById`/`useGetPost` yet (`tabs/home/detail.tsx` is a static placeholder).
- No "liked by" / comments modal UI yet, though `useGetLikes`/`useGetComments` are ready to use.
- `expo start --web` is broken for `expo-sqlite` (`wa-sqlite.wasm` fails to resolve) — test via iOS simulator instead.
