import { getCommentsForPost } from "@/db/queries/comments";
import { CommentNode } from "@/db/types";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export function useGetComments(post_id: number) {
    const [comments, setComments] = useState<CommentNode[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const db = useSQLiteContext();

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getCommentsForPost(db, post_id);
            setComments(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [db, post_id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return {comments, loading, error, refetch: fetchComments}
}