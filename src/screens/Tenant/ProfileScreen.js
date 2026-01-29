
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { colors, spacing, typography, borderRadius } from '../../uikit/theme';

const ProfileScreen = () => {
    const { signOut, profile, user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>

                <View style={styles.card}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{profile?.full_name ? profile.full_name[0] : 'U'}</Text>
                    </View>
                    <Text style={styles.name}>{profile?.full_name || 'User'}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{profile?.role || 'User'}</Text>
                    </View>
                </View>

                <Button title="Log Out" variant="outline" onPress={signOut} style={{ marginTop: spacing.xl }} />
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
        padding: spacing.l,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.l,
    },
    card: {
        backgroundColor: colors.white,
        padding: spacing.xl,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    avatarText: {
        color: colors.white,
        fontSize: 32,
        fontWeight: 'bold',
    },
    name: {
        ...typography.h2,
        marginBottom: spacing.xs,
    },
    email: {
        color: colors.textSecondary,
        marginBottom: spacing.m,
    },
    roleBadge: {
        backgroundColor: colors.background,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: borderRadius.round,
    },
    roleText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    }

});

export default ProfileScreen;
