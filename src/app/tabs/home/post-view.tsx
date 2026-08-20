import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CURRENT_USER_ID } from "@/constants/current-user";
import { Spacing } from "@/constants/theme";
import { FeedPost } from "@/db/types";
import { useGetLikes } from "@/hooks/use-likes";

export const FeedCard = (post: FeedPost) => {
    const router = useRouter();
    const { likes, loading: likesLoading, toggleLike } = useGetLikes(post.post_id);

    const isLiked = likes.some((like) => like.user_id === CURRENT_USER_ID);
    const likesCount = likesLoading ? post.likes_count : likes.length;

    const handleCommentTap = () => {
        router.push({
            pathname: '/tabs/home/comments',
            params: { postId: String(post.post_id) },
        });
    };

    return (
        <ThemedView style={styles.card}>
            <Pressable onPress={handleUserInfoTap} style={styles.header}>
                <Image
                    source={post.avatar_url ? { uri: post.avatar_url } : require('@/assets/images/post/avatar.png')}
                    style={styles.avatar}
                />
                <ThemedText type="smallBold">{post.username}</ThemedText>
            </Pressable>

            <Pressable onPress={handleDoubleTap}>
                <Image source={{ uri: post.image_url }} style={styles.postImage} />
            </Pressable>

            <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => toggleLike(CURRENT_USER_ID)} hitSlop={Spacing.two}>
                    <Image
                        source={isLiked
                            ? require('@/assets/images/post/fill_like.png')
                            : require('@/assets/images/post/empty_like.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCommentTap} hitSlop={Spacing.two}>
                    <Image source={require('@/assets/images/post/comment.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {likesCount > 0 && (
                <ThemedText type="smallBold" style={styles.section}>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                </ThemedText>
            )}

            {post.caption && (
                <ThemedText style={[styles.section, styles.caption]}>
                    <ThemedText type="smallBold">{post.username} </ThemedText>
                    {post.caption}
                </ThemedText>
            )}

            {post.comments_count > 0 && (
                <TouchableOpacity onPress={handleCommentTap}>
                    <ThemedText type="small" themeColor="textSecondary" style={styles.section}>
                        View all {post.comments_count} comments
                    </ThemedText>
                </TouchableOpacity>
            )}
        </ThemedView>
    );
};

function handleUserInfoTap() {}

function handleDoubleTap() {}

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.three,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    postImage: {
        width: '100%',
        aspectRatio: 3 / 2,
    },
    actionRow: {
        flexDirection: 'row',
        gap: Spacing.three,
        paddingHorizontal: Spacing.three,
        paddingTop: Spacing.two,
    },
    icon: {
        width: 24,
        height: 24,
    },
    section: {
        paddingHorizontal: Spacing.three,
        marginTop: Spacing.one,
    },
    caption: {
        lineHeight: 20,
    },
});
