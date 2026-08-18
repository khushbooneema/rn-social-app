import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { getPosts } from "../db/queries/posts";
import { FeedPost } from "../db/types";

export function useFeedPosts() {
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const db = useSQLiteContext()

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const feeds = await getPosts(db);
            setPosts(feeds);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [db]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, error, refetch: fetchPosts };
}


