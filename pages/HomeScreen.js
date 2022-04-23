import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';

import SignupLogin from './Auth'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.restaurantRef = ref(getDatabase(), 'restaurant/');
    this.state = {
      location: {
        latitude: null,
        longitude: null,
      },
      errorMessage: null,
      isLoggedIn: false,
    };
    // this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    // this._readDB();
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });

    let lat = this.state.location.latitude;
    let lon = this.state.location.longitude;

    console.log(lat, lon);

    if (this.state.errorMessage) { console.log(this.state.errorMessage) }

  };

  showHome() {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hi, Teerapat</Text>
        </View>
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor='#BBBBBB'
            onPress={() => console.log("Booking")}
            style={styles.button}
          >
            <View style={styles.buttonRow}>
              <Image style={styles.buttonImage} source={require('./images/booking_button.jpg')} />
              <Text style={[styles.buttonTitle, {paddingVertical: 25}]}>New Booking</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#BBBBBB'
            onPress={() => console.log("History")}
            style={styles.button}>
            <View style={styles.buttonRow}
          >
              <Image style={styles.buttonImage} source={require('./images/history_button.webp')} />
              <Text style={styles.buttonTitle}>History</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.subContainer}>
            <TouchableHighlight
              underlayColor='#BBBBBB'
              onPress={() => this.props.navigation.navigate('FindAirport',{location: this.state.location})}
              style={styles.subButton}
            >
              <View style={styles.subButtonColumn}>
                <Image style={styles.subButtonImage} source={require('./images/airport_button.jpg')} />
                <Text style={styles.subButtonTitle}>Find Airports</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#BBBBBB'
              onPress={() => console.log("Find Airlines")}
              style={styles.subButton}
            >
              <View style={styles.subButtonColumn}>
                <Image style={styles.subButtonImage} source={require('./images/airline_button.png')} />
                <Text style={styles.subButtonTitle}>Find Airlines</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </>
    )
  }

  showLogin() {
    return (
      <SignupLogin loginCB={this.loginSuccess}/>
    )
  }

  loginSuccess() {
    this.setState({
      isLoggedIn: true
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.isLoggedIn ? this.showHome() : this.showLogin()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Title
  titleContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  // Button
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20
  },
  button: {
    width: Dimensions.get("window").width - 40,
    height: 160,
    marginVertical: 5,
    backgroundColor: "#DDDDDD",
  },
  buttonRow : {
    flexDirection: 'row',
    height: 100,
    flex: 1
  },
  buttonImage: {
    flex: 3,
    height: 160,
  },
  buttonTitle: {
    fontSize: 40,
    flex: 5,
    padding: 20,
    // borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 50,
  },
  // Sub Button
  subContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subButtonColumn : {
    flexDirection: 'column',
    height: 100,
    flex: 1
  },
  subButton: {
    width: (Dimensions.get("window").width - 20)/2 - 10,
    height: 160,
    marginVertical: 5,
    backgroundColor: "#DDDDDD",
  },
  subButtonImage: {
    flex: 4,
    width: (Dimensions.get("window").width - 20)/2 - 10,
  },
  subButtonTitle: {
    fontSize: 20,
    flex: 1,
    paddingHorizontal: 20,
    // borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 2,
  },
});