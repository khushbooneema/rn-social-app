import { SQLiteDatabase } from "expo-sqlite";
import { COMMENTS, POSTS, USERS } from "./sample_data";

async function insertUsers(db: SQLiteDatabase): Promise<number[]> {
    const $insertUserQuery = await db.prepareAsync(`
        INSERT INTO users (username, display_name, avatar_url)
        VALUES ($username, $display_name, $avatar_url)
    `);

    const userIds: number[] = [];
    try {
        for (const user of USERS) {
            const result = await $insertUserQuery.executeAsync({
                $username: user.username,
                $display_name: user.display_name,
                $avatar_url: user.avatar_url
            });
            userIds.push(Number(result.lastInsertRowId));
        }
    } finally {
        await $insertUserQuery.finalizeAsync();
    }
    
    return userIds;
}

async function insertPosts(db: SQLiteDatabase, userIds: number[]): Promise<number[]> {
    const $insertPostQuery = await db.prepareAsync(`
        INSERT INTO posts (user_id, image_url, caption)
        VALUES ($user_id, $image_url, $caption)
    `);
    
    const postIds: number[] = [];
    try {
        for (const post of POSTS) {
            const result = await $insertPostQuery.executeAsync({
                $user_id: userIds[Math.floor(Math.random() * userIds.length)],
                $image_url: post.image_url,
                $caption: post.caption
            });
            postIds.push(Number(result.lastInsertRowId));
        }
    } finally {
        await $insertPostQuery.finalizeAsync();
    }

    return postIds;
}

async function insertComments(db: SQLiteDatabase, postIds: number[], userIds: number[]) {
    const $insertCommentQuery = await db.prepareAsync(`
        INSERT INTO comments (post_id, parent_comment_id, user_id, body)
        VALUES ($post_id, $parent_comment_id, $user_id, $body)
    `);

    // Recursively inserts one comment node and all of its replies. `postId` is
    // fixed for the whole thread (chosen once by the caller for the top-level
    // comment) so a reply always lands on the same post as its parent —
    // otherwise a reply could randomly end up on a different post than the
    // comment it's replying to, and would never show up nested under it when
    // querying "comments for post X" later.
    async function insertCommentNode(
        node: (typeof COMMENTS)[number],
        postId: number,
        parentCommentId: number | null
    ) {
        const result = await $insertCommentQuery.executeAsync({
            $post_id: postId,
            $parent_comment_id: parentCommentId,
            $user_id: userIds[Math.floor(Math.random() * userIds.length)],
            $body: node.body
        });
        const commentId = Number(result.lastInsertRowId);

        for (const reply of node.replies) {
            await insertCommentNode(reply, postId, commentId);
        }
    }

    try {
        for (const comment of COMMENTS) {
            const postId = postIds[Math.floor(Math.random() * postIds.length)];
            await insertCommentNode(comment, postId, null);
        }
    } finally {
        await $insertCommentQuery.finalizeAsync();
    }
}

async function insertLikes(db: SQLiteDatabase, postIds: number[], userIds: number[]) {
    const $insertLikeQuery = await db.prepareAsync(`
        INSERT INTO likes (post_id, user_id)
        VALUES ($post_id, $user_id)
    `);

    try {
        for (const postId of postIds) {
            const shuffledUserIds = [...userIds].sort(() => 0.5 - Math.random());
            const numberOfLikes = Math.floor(Math.random() * userIds.length);
            const selectedUserIds = shuffledUserIds.slice(0, numberOfLikes);

            for (const userId of selectedUserIds) {
                await $insertLikeQuery.executeAsync({
                    $post_id: postId,
                    $user_id: userId
                });
            }
        }
    } finally {
        await $insertLikeQuery.finalizeAsync();
    }
}

export async function seedDatabase(db: SQLiteDatabase) {

    await db.withTransactionAsync(async () => {
        const userIds = await insertUsers(db); 
        const postIds = await insertPosts(db, userIds);
        await insertComments(db, postIds, userIds);
        await insertLikes(db, postIds, userIds);
    })
}