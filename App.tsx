import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import BottomNavigation from './src/screens/BottomNavigation';
import ItemView from './src/screens/ItemView';
import Login from './src/Loginprocess/Login';
import Register from './src/Loginprocess/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkout from './src/screens/Checkout';

const Stack = createNativeStackNavigator();

const App = () => {
  const [homepage, setHomepage] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const userid = await AsyncStorage.getItem('userId');
        if (userid) {
          setUserId(userid);
        }
      } catch (error) {
        console.error('Error retrieving userId:', error);
      }
    };

    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      setHomepage(true);
    } else {
      setHomepage(false);
    }
  }, [userId]);

  return (
    <NavigationContainer>
      {homepage ? (
        <Stack.Navigator initialRouteName="BottomNavigation">
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="ItemView" component={ItemView} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;