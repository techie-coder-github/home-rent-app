
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../uikit/theme';

const PropertyCard = ({ property, onPress }) => {
    const imageUri = property.images && property.images.length > 0
        ? property.images[0]
        : 'https://via.placeholder.com/300x200';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>${property.monthly_price}/mo</Text>
                </View>
            </View>

            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
                <View style={styles.row}>
                    <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.location} numberOfLines={1}>{property.city}</Text>
                </View>

                <View style={styles.amenities}>
                    {property.amenities && property.amenities.slice(0, 3).map((amenity, index) => (
                        <View key={index} style={styles.amenityBadge}>
                            <Text style={styles.amenityText}>{amenity}</Text>
                        </View>
                    ))}
                    {property.amenities && property.amenities.length > 3 && (
                        <Text style={styles.moreText}>+{property.amenities.length - 3} more</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.l,
        marginBottom: spacing.l,
        ...shadows.medium,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 200,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    priceTag: {
        position: 'absolute',
        bottom: spacing.m,
        right: spacing.m,
        backgroundColor: colors.primary,
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.m,
        borderRadius: borderRadius.m,
    },
    priceText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    details: {
        padding: spacing.m,
    },
    title: {
        ...typography.h3,
        marginBottom: spacing.xs,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    location: {
        ...typography.caption,
        marginLeft: spacing.xs,
    },
    amenities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.s,
        alignItems: 'center',
    },
    amenityBadge: {
        backgroundColor: colors.background,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    amenityText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    moreText: {
        fontSize: 12,
        color: colors.textSecondary,
    }
});

export default PropertyCard;
