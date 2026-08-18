import { SQLiteDatabase } from "expo-sqlite";
import { CommentNode } from "../types";

export async function getCommentsForPost(db: SQLiteDatabase, post_id: number): Promise<CommentNode[]> {
    const rows = await db.getAllAsync<{
        id: number,
        post_id: number,
        parent_comment_id: number | null,
        body: string,
        created_at: string,
        username: string,
        avatar_url: string | null
    }>(`
        SELECT
            c.id as id,
            c.post_id as post_id,
            c.parent_comment_id as parent_comment_id,
            c.body as body,
            c.created_at as created_at,
            u.username as username,
            u.avatar_url as avatar_url
        FROM comments c
        INNER JOIN users u ON c.user_id = u.id
        WHERE c.post_id = $post_id
        ORDER BY c.created_at ASC
    `, { $post_id: post_id });

    const byId = new Map<number, CommentNode>();
    for (const row of rows) {
        byId.set(row.id, { ...row, replies: [] });
    }

    const roots: CommentNode[] = [];
    for (const row of rows) {
        const node = byId.get(row.id)!;

        if (row.parent_comment_id === null) {
            roots.push(node);
            continue;
        }

        const parent = byId.get(row.parent_comment_id);
        if (parent) {
            parent.replies.push(node);
        } else {
            // Defensive fallback: a parent_comment_id that doesn't resolve
            // within this post's rows (shouldn't happen given the foreign
            // key constraint) still surfaces the comment as a root instead
            // of silently dropping it.
            roots.push(node);
        }
    }

    return roots;
}
