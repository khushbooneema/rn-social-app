import { deleteLike, getLikesByPost, pushLike } from "@/db/queries/likes";
import { PostLikes } from "@/db/types";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export function useGetLikes(post_id: number) {
    const [likes, setLikes] = useState<PostLikes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const db = useSQLiteContext();
    
    const fetchLikes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const likes = await getLikesByPost(db, post_id);
            setLikes(likes);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [db, post_id]);

    useEffect(() => {
        fetchLikes();
    }, [fetchLikes]);

    const toggleLike = useCallback(async (userId: number) => {
        const alreadyLiked = likes.some((like) => like.user_id === userId);

        if (alreadyLiked) {
            await deleteLike(db, userId, post_id);
        } else {
            await pushLike(db, userId, post_id);
        }

        await fetchLikes();
    }, [db, post_id, likes, fetchLikes]);

    return {likes, loading, error, refetch: fetchLikes, toggleLike};
}
