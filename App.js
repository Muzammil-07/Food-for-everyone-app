import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View ,ImageBackground} from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/SignUp';
import RsignUp from './components/RsignUp';
import Rhome from './components/Rhome';
import Home from './components/Home';
import MLogin from './components/MLogin';
import Uhome from './components/Uhome';
import Map from './components/Map';
import Requestfood from './components/Requestfood';
import Qr from './components/Qr'
import Mdash from './components/Mdash';



const Stack = createNativeStackNavigator();
export default function App() {

  return (
 <NavigationContainer>
<Stack.Navigator >
  <Stack.Screen name="LogIn" component={Login} options={{ headerShown: false }}/>
<Stack.Screen name="Mdash" component={Mdash} options={{ headerShown: false }}/>
  <Stack.Screen name="Uhome" component={Uhome} options={{ headerShown: false }}/>
  <Stack.Screen name = "Map" component={Map} options={{ headerShown: false }}/>
<Stack.Screen name="Qr" component={Qr} options={{ headerShown: false }}/>
  <Stack.Screen name = "Requestfood" component={Requestfood} options={{ headerShown: false }}/>
  <Stack.Screen name="MLogin" component={MLogin} options={{ headerShown: false }}/>
  <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
</Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
