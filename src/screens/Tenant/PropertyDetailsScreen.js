
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../../uikit/theme';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({ route, navigation }) => {
    const { property } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/300x200' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{property.title}</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={16} color={colors.primary} />
                                <Text style={styles.location}>{property.city}</Text>
                            </View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>${property.monthly_price}</Text>
                            <Text style={styles.period}>/month</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{property.description || 'No description available for this property.'}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Amenities</Text>
                        <View style={styles.amenities}>
                            {property.amenities && property.amenities.map((amenity, index) => (
                                <View key={index} style={styles.amenityBadge}>
                                    <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                                    <Text style={styles.amenityText}>{amenity}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Landlord</Text>
                        <View style={styles.landlordContainer}>
                            <View style={styles.landlordAvatar}>
                                <Ionicons name="person" size={24} color={colors.white} />
                            </View>
                            <View>
                                <Text style={styles.landlordName}>John Owner</Text>
                                <Text style={styles.landlordRole}>Property Owner</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity style={styles.chatButton} onPress={() => Alert.alert('Chat', 'Chat feature coming soon')}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.footerPriceLabel}>Total Price</Text>
                    <Text style={styles.footerPrice}>${property.monthly_price} <Text style={{ fontSize: 14, fontWeight: '400' }}>/mo</Text></Text>
                </View>
                <Button
                    title="Book Now"
                    style={styles.bookButton}
                    onPress={() => Alert.alert('Booking', 'Booking flow coming soon')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    imageContainer: {
        height: 300,
        width: width,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: colors.white,
        padding: 8,
        borderRadius: borderRadius.round,
        ...shadows.medium,
    },
    content: {
        padding: spacing.l,
        marginTop: -20,
        backgroundColor: colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        minHeight: 500,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.l,
    },
    title: {
        ...typography.h2,
        marginBottom: spacing.s,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        ...typography.body,
        color: colors.textSecondary,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    period: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    section: {
        marginBottom: spacing.l,
    },
    sectionTitle: {
        ...typography.h3,
        marginBottom: spacing.m,
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    amenities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.m,
    },
    amenityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: borderRadius.m,
        borderWidth: 1,
        borderColor: colors.border,
    },
    amenityText: {
        color: colors.text,
    },
    landlordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.m,
        borderRadius: borderRadius.l,
        ...shadows.light,
        gap: spacing.m,
    },
    landlordAvatar: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.round,
        backgroundColor: colors.textSecondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    landlordName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    landlordRole: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    chatButton: {
        padding: spacing.s,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        padding: spacing.l,
        paddingBottom: spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.medium,
    },
    footerPriceLabel: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    footerPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    bookButton: {
        flex: 1,
    }
});

import { Alert } from 'react-native';

export default PropertyDetailsScreen;
