
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../../uikit/theme';
import Button from '../../components/Button';

const RoleSelectionScreen = () => {
    const { user, setProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const handleContinue = async () => {
        if (!selectedRole) return;
        setLoading(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: selectedRole })
                .eq('id', user.id);

            if (error) throw error;

            // Refresh profile in context to trigger navigation change
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profile);

        } catch (e) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    const RenderCard = ({ role, title, description }) => {
        const isSelected = selectedRole === role;
        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedRole(role)}
                activeOpacity={0.9}
            >
                <Text style={[styles.cardTitle, isSelected && styles.textSelected]}>{title}</Text>
                <Text style={[styles.cardDesc, isSelected && styles.textSelected]}>{description}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Choose your role</Text>
                    <Text style={styles.subtitle}>How do you want to use this app?</Text>
                </View>

                <View style={styles.cardsContainer}>
                    <RenderCard
                        role="Tenant"
                        title="I'm a Tenant"
                        description="I'm looking for a place to rent."
                    />
                    <RenderCard
                        role="Landlord"
                        title="I'm a Landlord"
                        description="I want to list my property for rent."
                    />
                </View>

                <Button
                    title="Continue"
                    onPress={handleContinue}
                    loading={loading}
                    disabled={!selectedRole}
                    style={{ opacity: selectedRole ? 1 : 0.5 }}
                />
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
        justifyContent: 'space-between',
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.s,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
    cardsContainer: {
        gap: spacing.l,
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: colors.white,
        padding: spacing.xl,
        borderRadius: borderRadius.xl, // Premium look
        borderWidth: 2,
        borderColor: 'transparent',
        ...shadows.medium,
    },
    cardSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '10', // 10% opacity hex
    },
    cardTitle: {
        ...typography.h2,
        color: colors.text,
        marginBottom: spacing.s,
    },
    cardDesc: {
        ...typography.body,
        color: colors.textSecondary,
    },
    textSelected: {
        color: colors.primary,
    }
});

export default RoleSelectionScreen;
