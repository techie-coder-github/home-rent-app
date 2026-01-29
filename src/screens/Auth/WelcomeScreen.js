
import React from 'react';
import { View, Text, StyleSheet, ImageBackround, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../uikit/theme';
import Button from '../../components/Button';

// Using a remote image for demo purposes or placeholder
const HERO_IMAGE = 'https://images.unsplash.com/photo-1560448204-e897c005472d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>HomeRental</Text>
                    <Text style={styles.subtitle}>Find your perfect home or rent your property easily.</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: HERO_IMAGE }} style={styles.image} resizeMode="cover" />
                </View>

                <View style={styles.actions}>
                    <Button
                        title="Log In"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}
                    />
                    <Button
                        title="Sign Up"
                        variant="outline"
                        onPress={() => navigation.navigate('Signup')}
                        style={styles.button}
                    />
                </View>
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
    header: {
        marginTop: spacing.xl,
        alignItems: 'center',
    },
    title: {
        ...typography.h1,
        color: colors.primary,
        marginBottom: spacing.s,
    },
    subtitle: {
        ...typography.body,
        textAlign: 'center',
        color: colors.textSecondary,
    },
    imageContainer: {
        flex: 1,
        marginVertical: spacing.xl,
        borderRadius: 20,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 15,
            },
            android: {
                elevation: 10,
            }
        }),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    actions: {
        gap: spacing.m,
        marginBottom: spacing.l,
    },
    button: {
        width: '100%',
    }
});

import { Platform } from 'react-native';

export default WelcomeScreen;
