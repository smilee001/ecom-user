import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Cart from './Cart';
import Order from './Order';
import Wallet from './Wallet';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'bag-handle' : 'bag-handle-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Wallet') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={hp(3)} color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarStyle: {
                    height: hp(7.5),
                    paddingTop: hp(0.8),
                    backgroundColor: '#000',
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    paddingBottom: hp(0.8),
                    fontFamily: 'Urbanist-Regular',
                    fontSize: hp(1.8)
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Orders"
                component={Order}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Wallet"
                component={Wallet}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}