
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, typography, borderRadius } from '../../uikit/theme';

const AMENITIES_LIST = ['WiFi', 'Parking', 'AC', 'Furnished', 'Pet Friendly', 'Gym', 'Pool'];

const AddPropertyScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        city: '',
        monthly_price: '',
        amenities: [],
    });

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleAmenity = (amenity) => {
        setFormData(prev => {
            const exists = prev.amenities.includes(amenity);
            if (exists) {
                return { ...prev, amenities: prev.amenities.filter(a => a !== amenity) };
            } else {
                return { ...prev, amenities: [...prev.amenities, amenity] };
            }
        });
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.monthly_price || !formData.address || !formData.city) {
            Alert.alert('Error', 'Please fill in required fields');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('properties').insert([
                {
                    owner_id: user.id,
                    title: formData.title,
                    description: formData.description,
                    address: formData.address,
                    city: formData.city,
                    monthly_price: parseFloat(formData.monthly_price),
                    amenities: formData.amenities,
                    images: [], // TODO: Implement Image Upload
                    latitude: 0, // TODO: Implement Map Selection
                    longitude: 0,
                }
            ]);

            if (error) throw error;

            Alert.alert('Success', 'Property listed successfully!');
            navigation.goBack();
        } catch (e) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header handled by Navigation Options if stack, but let's be safe */}

                <Text style={styles.sectionTitle}>Basic Details</Text>
                <Input
                    label="Property Title*"
                    placeholder="e.g. Spacious 2BHK in Downtown"
                    value={formData.title}
                    onChangeText={(t) => handleChange('title', t)}
                />
                <Input
                    label="Monthly Rent (₹)*"
                    placeholder="25000"
                    keyboardType="numeric"
                    value={formData.monthly_price}
                    onChangeText={(t) => handleChange('monthly_price', t)}
                />
                <Input
                    label="City*"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChangeText={(t) => handleChange('city', t)}
                />
                <Input
                    label="Complete Address*"
                    placeholder="Flat No, Building, Street..."
                    multiline
                    numberOfLines={3}
                    style={{ height: 80, textAlignVertical: 'top', paddingTop: 10 }}
                    value={formData.address}
                    onChangeText={(t) => handleChange('address', t)}
                />
                <Input
                    label="Description"
                    placeholder="Describe your property..."
                    multiline
                    numberOfLines={4}
                    style={{ height: 100, textAlignVertical: 'top', paddingTop: 10 }}
                    value={formData.description}
                    onChangeText={(t) => handleChange('description', t)}
                />

                <Text style={styles.sectionTitle}>Amenities</Text>
                <View style={styles.amenitiesGrid}>
                    {AMENITIES_LIST.map((amenity) => {
                        const isSelected = formData.amenities.includes(amenity);
                        return (
                            <Text
                                key={amenity}
                                style={[styles.amenityChip, isSelected && styles.amenitySelected]}
                                onPress={() => toggleAmenity(amenity)}
                            >
                                {amenity}
                            </Text>
                        );
                    })}
                </View>

                <Button
                    title="List Property"
                    onPress={handleSubmit}
                    loading={loading}
                    style={styles.submitBtn}
                />

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
        paddingBottom: 100,
    },
    sectionTitle: {
        ...typography.h3,
        marginTop: spacing.m,
        marginBottom: spacing.m,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.s,
        marginBottom: spacing.xl,
    },
    amenityChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: borderRadius.round,
        borderWidth: 1,
        borderColor: colors.border,
        color: colors.textSecondary,
        backgroundColor: colors.white,
        overflow: 'hidden',
    },
    amenitySelected: {
        backgroundColor: colors.primary,
        color: colors.white,
        borderColor: colors.primary,
        fontWeight: '600',
    },
    submitBtn: {
        marginTop: spacing.l,
    }
});

export default AddPropertyScreen;
