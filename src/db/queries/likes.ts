import { SQLiteDatabase } from "expo-sqlite";
import { PostLikes } from "../types";

export async function getLikesByPost(db:SQLiteDatabase, post_id: number): Promise<PostLikes[]> {
    let likes: PostLikes[] = []

    const data = await db.getAllAsync<{ likes_id: number,
        post_id: number,
        user_id: number,
        created_at: string,
        username: string,
        avatar_url: string }> (`
            SELECT 
                l.id as likes_id,
                l.post_id as post_id,
                l.user_id as user_id,
                l.created_at as created_at,
                u.username as username,
                u.avatar_url as avatar_url
            FROM likes as l
            INNER JOIN users u ON l.user_id = u.id 
            WHERE l.post_id = $post_id
            ORDER BY l.created_at DESC`,  { $post_id: post_id }
        )

    if (data === undefined || data === null ) {
        return likes
    }

        for (const data_point of data) {
        likes.push({
           likes_id: data_point.likes_id,
           post_id: data_point.post_id,
           user_id: data_point.user_id,
           username: data_point.username,
           avatar_url: data_point.avatar_url,
           created_at: data_point.created_at
        })
    }

    return likes
}