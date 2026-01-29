
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../../uikit/theme';

const DashboardScreen = () => {

    const StatCard = ({ title, value, color }) => (
        <View style={[styles.statCard, { borderLeftColor: color }]}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.subtitle}>Overview of your rentals</Text>
                </View>

                <View style={styles.statsGrid}>
                    <StatCard title="Total Properties" value="3" color={colors.primary} />
                    <StatCard title="Active Tenants" value="12" color={colors.success} />
                    <StatCard title="Pending Requests" value="4" color={colors.warning} />
                    <StatCard title="This Month Revenue" value="$4,500" color={colors.secondary} />
                </View>

                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No recent activity</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.l,
    },
    header: {
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.m,
        marginBottom: spacing.xl,
    },
    statCard: {
        backgroundColor: colors.white,
        padding: spacing.m,
        borderRadius: borderRadius.l,
        width: '47%',
        borderLeftWidth: 4,
        ...shadows.light,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
        color: colors.text,
    },
    statTitle: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    sectionTitle: {
        ...typography.h3,
        marginBottom: spacing.m,
    },
    emptyState: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.l,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: colors.border,
    },
    emptyText: {
        color: colors.textSecondary,
    }
});

export default DashboardScreen;
