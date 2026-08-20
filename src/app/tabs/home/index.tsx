import { useFeedPosts } from "@/hooks/use-feed-posts";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedCard } from "./post-view";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
    const data = useFeedPosts()
    const theme = useTheme()

    if (data.error != null) {
        return (
            <ThemedView style={styles.centered}>
                <ThemedText type="small" themeColor="textSecondary">Couldnt load posts. Pull down to try again.</ThemedText>
            </ThemedView>
        )
    }

    if (data.loading) {
        return (
            <ThemedView style={styles.centered}>
                <ActivityIndicator size="large" />
            </ThemedView>
        )
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
            <FlatList
                data={data.posts}
                keyExtractor={(item) => String(item.post_id)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.feedContent}
                renderItem={({ item }) => <FeedCard {...item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
    },
    feedContent: {
        paddingBottom: Spacing.four,
    },
})
