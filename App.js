import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']); // https://github.com/firebase/firebase-js-sdk/issues/1847
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initializeApp } from 'firebase/app';

import { firebase_apiKey, firebase_authDomain, firebase_databaseURL, firebase_projectId,
  firebase_storageBucket, firebase_messagingSenderId, firebase_appId, firebase_measurementId } from "@env";

const firebaseConfig = {
  apiKey: firebase_apiKey,
  authDomain: firebase_authDomain,
  databaseURL: firebase_databaseURL,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_messagingSenderId,
  appId: firebase_appId,
  measurementId: firebase_measurementId
};

initializeApp(firebaseConfig);

import HomeScreen from './pages/HomeScreen'
import FindAirportScreen from './pages/FindAirportScreen';
import FindAirlineScreen from './pages/FindAirlineScreen';
import AirportDetailScreen from './pages/AirportDetailScreen';
import AirlineDetailScreen from './pages/AirlineDetailScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'TICKETA Flight Booking',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="FindAirport"
            component={FindAirportScreen}
            options={{
              title: 'Airport Search',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AirportDetail"
            component={AirportDetailScreen}
            options={ ({ route }) => ({
              title: route.params.res_data.name,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }) }
          />
          <Stack.Screen
            name="FindAirline"
            component={FindAirlineScreen}
            options={{
              title: 'Airline Search',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="AirlineDetail"
            component={AirlineDetailScreen}
            options={ ({ route }) => ({
              title: route.params.res_data.name,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }) }
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});