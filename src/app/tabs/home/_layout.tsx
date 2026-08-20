import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: true }} />
            <Stack.Screen name="detail" options={{ headerShown: true }} />
            <Stack.Screen name="comments" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
    )
}