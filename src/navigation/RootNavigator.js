
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { colors } from '../uikit/theme';

// Auth Screens
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import LandlordVerificationScreen from '../screens/Auth/LandlordVerificationScreen';

// Tenant Screens
import TenantStack from './TenantStack';

// Landlord Screens
import LandlordStack from './LandlordStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    // Auth Stack
                    <Stack.Group>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </Stack.Group>
                ) : !profile?.role ? (
                    // Onboarding / Role Selection
                    <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                ) : (
                    // App Stack
                    <Stack.Group>
                        {profile.role === 'Tenant' ? (
                            <Stack.Screen name="TenantApp" component={TenantStack} />
                        ) : !profile.verification_status ? (
                            <Stack.Screen name="LandlordVerification" component={LandlordVerificationScreen} />
                        ) : (
                            <Stack.Screen name="LandlordApp" component={LandlordStack} />
                        )}
                        {/* Shared Screens if any, or Modals */}
                        {/* Note: LandlordVerification is handled in logic above for flow.
                            If we need it accessible from LandlordApp stack, we need a LandlordStack too.
                            For now this logic handles the initial verification flow.
                        */}
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
