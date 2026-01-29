
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../../uikit/theme';

const LandlordBookingsScreen = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            // Fetch bookings where the related property belongs to the current user
            const { data, error } = await supabase
                .from('bookings')
                .select(`
            *,
            properties!inner(*),
            profiles:tenant_id(*)
        `)
                .eq('properties.owner_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (e) {
            console.log('Error fetching bookings:', e.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchBookings();
        }, [])
    );

    const updateStatus = async (id, status) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            fetchBookings();
        } catch (e) {
            Alert.alert('Error', e.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return colors.success;
            case 'Rejected': return colors.error;
            case 'Pending': return colors.warning;
            default: return colors.textSecondary;
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.propertyName} numberOfLines={1}>{item.properties.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            <Text style={styles.tenantName}>Tenant: {item.profiles?.full_name || 'Unknown'}</Text>
            <Text style={styles.dates}>Date: {new Date(item.created_at).toLocaleDateString()}</Text>
            {item.message && <Text style={styles.message}>"{item.message}"</Text>}

            {item.status === 'Pending' && (
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => updateStatus(item.id, 'Rejected')}
                    >
                        <Text style={[styles.actionText, { color: colors.error }]}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => updateStatus(item.id, 'Approved')}
                    >
                        <Text style={[styles.actionText, { color: colors.white }]}>Approve</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bookings</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: spacing.xl }} />
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No bookings found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.l,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        ...typography.h2,
    },
    list: {
        padding: spacing.l,
    },
    card: {
        backgroundColor: colors.white,
        padding: spacing.m,
        borderRadius: borderRadius.l,
        marginBottom: spacing.m,
        ...shadows.light,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.s,
    },
    propertyName: {
        ...typography.h3,
        flex: 1,
        marginRight: spacing.m,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tenantName: {
        ...typography.body,
        fontWeight: '600',
        marginBottom: 2,
    },
    dates: {
        ...typography.caption,
        marginBottom: spacing.s,
    },
    message: {
        ...typography.body,
        fontStyle: 'italic',
        color: colors.textSecondary,
        marginBottom: spacing.m,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.m,
        marginTop: spacing.s,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rejectButton: {
        backgroundColor: colors.error + '10',
        borderWidth: 1,
        borderColor: colors.error,
    },
    approveButton: {
        backgroundColor: colors.success,
    },
    actionText: {
        fontWeight: '600',
    },
    emptyState: {
        marginTop: spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.textSecondary,
    }
});

export default LandlordBookingsScreen;
