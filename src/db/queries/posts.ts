import { SQLiteDatabase } from "expo-sqlite";
import { FeedPost } from "../types";

export async function getPosts(db: SQLiteDatabase): Promise<FeedPost[]> {
    const feeds: FeedPost[] = []
    const data = await db.getAllAsync<{ post_id: number,
        caption: string|null,
        created_at: string,
        post_url: string,
        username: string,
        avatar_url: string,
        likes_count: number,
        comments_count: number }> (`
        SELECT p.id as post_id, 
            p.caption as caption, 
            p.created_at as created_at, 
            p.image_url as post_url, 
            u.username as username, 
            u.avatar_url as avatar_url,
            COUNT(DISTINCT l.id) as likes_count,
            COUNT(DISTINCT c.id) as comments_count
        FROM posts p
        INNER JOIN users u ON u.id = p.user_id
        LEFT JOIN likes l ON l.post_id = p.id
        LEFT JOIN comments c on c.post_id = p.id
        GROUP BY p.id
        ORDER BY p.created_at DESC`
    )

    if (data === undefined || data === null || data.length === 0) {
        return feeds
    }

    for (const data_point of data) {
        feeds.push({
            post_id: data_point.post_id,
            username: data_point.username,
            image_url: data_point.post_url,
            avatar_url: data_point.avatar_url,
            caption: data_point.caption,
            likes_count: data_point.likes_count || 0,
            comments_count: data_point.comments_count || 0,
            created_at: data_point.created_at
        })
    }

    return feeds
}

export async function getPostById(db: SQLiteDatabase, post_id: number): Promise<FeedPost | null> {
    const data = await db.getFirstAsync<{ post_id: number,
        caption: string|null,
        created_at: string,
        post_url: string,
        username: string,
        avatar_url: string,
        likes_count: number,
        comments_count: number }> (`
        SELECT p.id as post_id, 
            p.caption as caption, 
            p.created_at as created_at, 
            p.image_url as post_url, 
            u.username as username, 
            u.avatar_url as avatar_url,
            COUNT(DISTINCT l.id) as likes_count,
            COUNT(DISTINCT c.id) as comments_count
        FROM posts p
        INNER JOIN users u ON u.id = p.user_id
        LEFT JOIN likes l ON l.post_id = p.id
        LEFT JOIN comments c on c.post_id = p.id
        WHERE p.id = $post_id
        ORDER BY p.created_at DESC`, { $post_id: post_id }
    )

    if (data === undefined || data === null ) {
        return null
    }

    const feed: FeedPost = {
        post_id: data.post_id,  
        username: data.username,
        image_url: data.post_url,
        avatar_url: data.avatar_url,
        caption: data.caption,
        likes_count: data.likes_count || 0,
        comments_count: data.comments_count || 0,
        created_at: data.created_at
    }

    return feed
}