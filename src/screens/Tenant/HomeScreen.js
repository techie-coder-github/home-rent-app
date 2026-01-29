
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import PropertyCard from '../../components/PropertyCard';
import { colors, spacing, typography, borderRadius, shadows } from '../../uikit/theme';

const MOCK_PROPERTIES = [
    {
        id: 1,
        title: 'Luxury Apartment in Downtown',
        city: 'Mumbai, MH',
        monthly_price: 25000,
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Wifi', 'AC', 'Gym'],
        description: 'A beautiful luxury apartment in the heart of the city.',
    },
    {
        id: 2,
        title: 'Cozy Studio near Univ',
        city: 'Pune, MH',
        monthly_price: 12000,
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Wifi', 'Parking'],
        description: 'Perfect for students.',
    },
    {
        id: 3,
        title: 'Spacious 3BHK Villa',
        city: 'Bangalore, KA',
        monthly_price: 45000,
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Pool', 'Garden', 'Garage'],
        description: 'Luxurious villa for a big family.',
    }
];

const HomeScreen = ({ navigation }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProperties = async () => {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                setProperties(data);
            } else {
                setProperties(MOCK_PROPERTIES); // Fallback for demo
            }
        } catch (e) {
            console.log('Error fetching properties, using mock data:', e.message);
            setProperties(MOCK_PROPERTIES);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProperties();
    };

    const filteredProperties = properties.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <View>
                    <Text style={styles.greeting}>Find your home</Text>
                    <Text style={styles.subGreeting}>Where would you like to live?</Text>
                </View>
                {/* Profile Avatar or similar could go here */}
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search location, property..."
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={colors.textSecondary}
                />
                <View style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color={colors.white} />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredProperties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PropertyCard
                        property={item}
                        onPress={() => navigation.navigate('PropertyDetails', { property: item })}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        padding: spacing.l,
    },
    header: {
        marginBottom: spacing.l,
    },
    headerTop: {
        marginBottom: spacing.l,
    },
    greeting: {
        ...typography.h2,
        color: colors.text,
    },
    subGreeting: {
        ...typography.body,
        color: colors.textSecondary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.s,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        backgroundColor: colors.white,
        height: 50,
        borderRadius: borderRadius.l,
        paddingLeft: 40,
        paddingRight: spacing.m,
        ...typography.body,
        color: colors.text,
        ...shadows.light,
    },
    filterButton: {
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.l,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.medium,
    }
});

export default HomeScreen;
