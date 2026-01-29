
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { colors, spacing, typography, borderRadius } from '../../uikit/theme';

const LandlordProfileScreen = () => {
    const { signOut, profile, user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>

                <View style={styles.card}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{profile?.full_name ? profile.full_name[0] : 'L'}</Text>
                    </View>
                    <Text style={styles.name}>{profile?.full_name || 'Landlord'}</Text>
                    <Text style={styles.email}>{user?.email}</Text>

                    <View style={styles.badges}>
                        <View style={styles.roleBadge}>
                            <Text style={styles.roleText}>{profile?.role || 'User'}</Text>
                        </View>
                        <View style={[styles.statusBadge, {
                            backgroundColor: profile?.verification_status === 'Verified' ? colors.success + '20' : colors.warning + '20'
                        }]}>
                            <Text style={[styles.statusText, {
                                color: profile?.verification_status === 'Verified' ? colors.success : colors.warning
                            }]}>{profile?.verification_status || 'Unverified'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menu}>
                    {/* Add more menu items here like Settings, Support etc */}
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
        backgroundColor: colors.secondary, // Different color for Landlord
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
    badges: {
        flexDirection: 'row',
        gap: spacing.s,
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
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: borderRadius.round,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    menu: {
        marginTop: spacing.xl,
    }
});

export default LandlordProfileScreen;
