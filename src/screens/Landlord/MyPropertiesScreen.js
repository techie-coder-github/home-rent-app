
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import PropertyCard from '../../components/PropertyCard';
import { colors, spacing, typography, borderRadius, shadows } from '../../uikit/theme';

const MyPropertiesScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('owner_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProperties(data || []);
        } catch (e) {
            console.log('Error fetching properties:', e.message);
            // Alert.alert('Error', 'Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProperties();
        }, [])
    );

    const handleDelete = (id) => {
        Alert.alert('Delete Property', 'Are you sure you want to delete this property?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const { error } = await supabase.from('properties').delete().eq('id', id);
                    if (error) Alert.alert('Error', error.message);
                    else fetchProperties();
                }
            }
        ])
    };

    const renderItem = ({ item }) => (
        <View style={{ position: 'relative' }}>
            <PropertyCard
                property={item}
                onPress={() => { /* Edit or details */ }}
            />
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color={colors.white} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Properties</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProperty')}
                >
                    <Ionicons name="add" size={24} color={colors.white} />
                    <Text style={styles.addButtonText}>Add New</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: spacing.xl }} />
            ) : (
                <FlatList
                    data={properties}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>You haven't listed any properties yet.</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.l,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        ...typography.h2,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.m,
        borderRadius: borderRadius.l,
        alignItems: 'center',
        gap: 4,
    },
    addButtonText: {
        color: colors.white,
        fontWeight: '600',
    },
    list: {
        padding: spacing.l,
    },
    deleteButton: {
        position: 'absolute',
        top: spacing.s,
        right: spacing.s,
        backgroundColor: colors.error,
        padding: 8,
        borderRadius: borderRadius.round,
        zIndex: 10,
        ...shadows.light,
    },
    emptyState: {
        marginTop: spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: 16,
    }
});

export default MyPropertiesScreen;
