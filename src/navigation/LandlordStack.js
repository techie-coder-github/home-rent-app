
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandlordTabNavigator from './LandlordTabNavigator';
import AddPropertyScreen from '../screens/Landlord/AddPropertyScreen';
// import PropertyDetailsScreen if we want to reuse it or have a Landlord version

const Stack = createNativeStackNavigator();

const LandlordStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandlordTabs" component={LandlordTabNavigator} />
            <Stack.Screen
                name="AddProperty"
                component={AddPropertyScreen}
                options={{ headerShown: true, title: 'Add New Property' }}
            />
        </Stack.Navigator>
    );
};

export default LandlordStack;
