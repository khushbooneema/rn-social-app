import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { getPostById } from '../db/queries/posts';
import { FeedPost } from '../db/types';

export function useGetPost(post_id: number) {
    const [post, setPost] = useState<FeedPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const db = useSQLiteContext();

    const fetchPost = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedPost = await getPostById(db, post_id);
            setPost(fetchedPost);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [db, post_id])

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return {post, loading, error, refetch: fetchPost};
}