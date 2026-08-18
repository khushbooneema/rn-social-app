export interface User {
    id: number;
    username: string;
    display_name: string | null;
    created_at: string;
    avatar_url: string | null;
}

export interface Post {
    id: number;
    user_id: number;
    image_url: string;
    caption: string | null;
    created_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    parent_comment_id: number | null;
    user_id: number;
    body: string;
    created_at: string;
}

export interface Like {
    id: number;
    post_id: number;
    user_id: number;
    created_at: string;
}

export interface FeedPost {
    post_id: number;
    username: string;
    image_url: string;
    avatar_url: string | null;
    caption: string | null;
    likes_count: number;
    comments_count: number;
    created_at: string;
}

export interface PostLikes {
    likes_id: number;
    post_id: number;
    user_id: number;
    username: string;
    avatar_url: string | null;
    created_at: string;
}

export interface CommentNode {
    id: number;
    post_id: number;
    parent_comment_id: number | null;
    body: string;
    created_at: string;
    username: string;
    avatar_url: string | null;
    replies: CommentNode[];
}