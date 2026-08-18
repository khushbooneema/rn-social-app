import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { FeedPost } from "@/db/types";

export const FeedCard = (post: FeedPost) => {
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
                <TouchableOpacity onPress={handleLikeToggle} hitSlop={Spacing.two}>
                    <Image source={require('@/assets/images/post/empty_like.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCommentTap} hitSlop={Spacing.two}>
                    <Image source={require('@/assets/images/post/comment.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {post.likes_count > 0 && (
                <ThemedText type="smallBold" style={styles.section}>
                    {post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}
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

function handleLikeToggle() {}

function handleCommentTap() {}

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
