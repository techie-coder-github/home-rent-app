
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing } from '../../uikit/theme';

const MapScreen = ({ navigation }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    // Default region (e.g., India center or first loading)
    const [region, setRegion] = useState({
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 20,
        longitudeDelta: 20,
    });

    const fetchProperties = async () => {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*');

            if (error) throw error;
            setProperties(data || []);

            // If we have properties with location, center map there
            const withLocation = data?.filter(p => p.latitude && p.longitude);
            if (withLocation && withLocation.length > 0) {
                // Simple centering on the first one for now
                setRegion({
                    latitude: withLocation[0].latitude,
                    longitude: withLocation[0].longitude,
                    latitudeDelta: 0.1, // Zoom in
                    longitudeDelta: 0.1,
                });
            }

        } catch (e) {
            console.log("Error fetching map properties", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={true}
            >
                {properties.map((property) => {
                    if (!property.latitude || !property.longitude) return null;

                    return (
                        <Marker
                            key={property.id}
                            coordinate={{
                                latitude: property.latitude,
                                longitude: property.longitude
                            }}
                            title={property.title}
                            description={`$${property.monthly_price}/mo`}
                            pinColor={colors.primary}
                        >
                            <Callout onPress={() => navigation.navigate('PropertyDetails', { property })}>
                                <View style={styles.callout}>
                                    <Text style={styles.title}>{property.title}</Text>
                                    <Text>{property.city}</Text>
                                    <Text style={styles.price}>${property.monthly_price}/mo</Text>
                                    <Text style={styles.link}>Tap to view details</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callout: {
        width: 150,
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    price: {
        color: colors.primary,
        fontWeight: 'bold',
        marginTop: 2,
    },
    link: {
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 4,
    }
});

export default MapScreen;
