
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../uikit/theme';

const MyBookingsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>My Bookings</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No bookings found yet.</Text>
                    <Text style={styles.emptySubText}>Browse properties and book your next home!</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: spacing.l,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.l,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        ...typography.h3,
        marginBottom: spacing.s,
    },
    emptySubText: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    }
});

export default MyBookingsScreen;
