
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../uikit/theme';

import DashboardScreen from '../screens/Landlord/DashboardScreen';
import MyPropertiesScreen from '../screens/Landlord/MyPropertiesScreen';
import LandlordBookingsScreen from '../screens/Landlord/LandlordBookingsScreen';
import LandlordProfileScreen from '../screens/Landlord/LandlordProfileScreen';

const Tab = createBottomTabNavigator();

const LandlordTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Properties') {
                        iconName = focused ? 'business' : 'business-outline';
                    } else if (route.name === 'Bookings') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: colors.border,
                    backgroundColor: colors.white,
                    height: 60,
                    paddingBottom: 5,
                }
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Properties" component={MyPropertiesScreen} />
            <Tab.Screen name="Bookings" component={LandlordBookingsScreen} />
            <Tab.Screen name="Profile" component={LandlordProfileScreen} />
        </Tab.Navigator>
    );
};

export default LandlordTabNavigator;
