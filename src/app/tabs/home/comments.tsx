import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { CommentNode } from "@/db/types";
import { useGetComments } from "@/hooks/use-comments";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function timeAgo(dateString: string): string {
    const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w`;
}

function flattenReplies(node: CommentNode): CommentNode[] {
    const result: CommentNode[] = [];
    for (const reply of node.replies) {
        result.push(reply);
        result.push(...flattenReplies(reply));
    }
    return result;
}

function CommentRow({ comment, indented = false }: { comment: CommentNode; indented?: boolean }) {
    return (
        <View style={[styles.commentRow, indented && styles.indentedRow]}>
            <Image
                source={comment.avatar_url ? { uri: comment.avatar_url } : require('@/assets/images/post/avatar.png')}
                style={styles.avatar}
            />
            <View style={styles.commentBody}>
                <ThemedText>
                    <ThemedText type="smallBold">{comment.username} </ThemedText>
                    {comment.body}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.timestamp}>
                    {timeAgo(comment.created_at)}
                </ThemedText>
            </View>
        </View>
    );
}

function CommentThread({ comment }: { comment: CommentNode }) {
    const [expanded, setExpanded] = useState(false);
    const replies = flattenReplies(comment);

    return (
        <View>
            <CommentRow comment={comment} />

            {replies.length > 0 && (
                <TouchableOpacity onPress={() => setExpanded((prev) => !prev)} style={styles.viewRepliesButton}>
                    <View style={styles.replyLine} />
                    <ThemedText type="small" themeColor="textSecondary">
                        {expanded ? 'Hide replies' : `View ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`}
                    </ThemedText>
                </TouchableOpacity>
            )}

            {expanded && replies.map((reply) => (
                <CommentRow key={reply.id} comment={reply} indented />
            ))}
        </View>
    );
}

export default function CommentsScreen() {
    const { postId } = useLocalSearchParams<{ postId: string }>();
    const router = useRouter();
    const theme = useTheme();
    const { comments, loading, error } = useGetComments(Number(postId));

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.handle} />
                <View style={styles.headerRow}>
                    <ThemedText type="smallBold" style={styles.headerTitle}>Comments</ThemedText>
                    <TouchableOpacity onPress={() => router.back()} hitSlop={Spacing.two} style={styles.closeButton}>
                        <ThemedText type="small" themeColor="textSecondary">Close</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            {error != null && (
                <ThemedView style={styles.centered}>
                    <ThemedText type="small" themeColor="textSecondary">Couldn&apos;t load comments.</ThemedText>
                </ThemedView>
            )}

            {error == null && loading && (
                <ThemedView style={styles.centered}>
                    <ActivityIndicator size="large" />
                </ThemedView>
            )}

            {error == null && !loading && comments.length === 0 && (
                <ThemedView style={styles.centered}>
                    <ThemedText type="small" themeColor="textSecondary">No comments yet.</ThemedText>
                </ThemedView>
            )}

            {error == null && !loading && comments.length > 0 && (
                <FlatList
                    data={comments}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => <CommentThread comment={item} />}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingBottom: Spacing.two,
    },
    handle: {
        alignSelf: 'center',
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#8E8E8E',
        marginTop: Spacing.two,
        marginBottom: Spacing.two,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.three,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: Spacing.three,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        paddingHorizontal: Spacing.three,
        paddingBottom: Spacing.four,
    },
    commentRow: {
        flexDirection: 'row',
        gap: Spacing.two,
        paddingVertical: Spacing.two,
    },
    indentedRow: {
        marginLeft: 40,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    commentBody: {
        flex: 1,
        gap: Spacing.half,
    },
    timestamp: {
        marginTop: Spacing.half,
    },
    viewRepliesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        marginLeft: 40,
        marginBottom: Spacing.two,
    },
    replyLine: {
        width: 24,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
});
