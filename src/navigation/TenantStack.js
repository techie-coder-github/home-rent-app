
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TenantTabNavigator from './TenantTabNavigator';
import PropertyDetailsScreen from '../screens/Tenant/PropertyDetailsScreen';
// Import other screens later as needed

const Stack = createNativeStackNavigator();

const TenantStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TenantTabs" component={TenantTabNavigator} />
            <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
        </Stack.Navigator>
    );
};

export default TenantStack;
