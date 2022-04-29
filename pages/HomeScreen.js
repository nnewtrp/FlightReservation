import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import { getDatabase, ref, onValue, get, push, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import Constants from 'expo-constants';
import * as Location from 'expo-location';

import SignupLogin from './Auth'
import UserInfo from './UserInfo'

import OpenWeatherMapAPI from './api/OpenWeatherMapAPI';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.UserInfoRef = ref(getDatabase(), 'userinfo/');
    this.state = {
      location: {
        latitude: null,
        longitude: null,
      },
      country: null,
      city: null,
      errorMessage: null,
      isLoggedIn: false,
      haveUserInfo: false,
      UserInfoData: null,
      thisUserInfo: null,
      thisUserName: '',
    };
    // this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.submitSuccess = this.submitSuccess.bind(this);
    this._readDB();
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

    OpenWeatherMapAPI(lat, lon).then((data) => {
      this.setState({
        country: data[0].country,
        city: data[0].state,
      })
      console.log(this.state.country, this.state.city)
    });
  };

  _readDB() {
    get(this.UserInfoRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.setState({UserInfoData: snapshot.val()})
        // console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  showHome() {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hi, {this.state.thisUserName}</Text>
          <Text style={styles.currentPlace}>{this.state.city}, {this.state.country}</Text>
        </View>
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor='#BBBBBB'
            onPress={() => this.props.navigation.navigate('FlightSearch',{user: this.state.thisUserInfo})}
            style={[styles.button, {backgroundColor: '#1EB8FA'}]}
          >
            <View style={styles.buttonRow}>
              <Image style={styles.buttonImage} source={require('./images/booking_button.jpg')} />
              <Text style={[styles.buttonTitle, {paddingVertical: 25}]}>New Booking</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#BBBBBB'
            onPress={() => this.props.navigation.navigate('FlightList',{user: this.state.thisUserInfo})}
            style={[styles.button, {backgroundColor: '#EA7838'}]}>
            <View style={styles.buttonRow}>
              <Image style={styles.buttonImage} source={require('./images/history_button.webp')} />
              <Text style={styles.buttonTitle}>History</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.subContainer}>
            <TouchableHighlight
              underlayColor='#BBBBBB'
              onPress={() => this.props.navigation.navigate('FindAirport',{location: this.state.location, country: this.state.country})}
              style={[styles.subButton,{backgroundColor: '#2F80ED'}]}
            >
              <View style={styles.subButtonColumn}>
                <Image style={styles.subButtonImage} source={require('./images/airport_button.jpg')} />
                <Text style={styles.subButtonTitle}>Find Airports</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#BBBBBB'
              onPress={() => this.props.navigation.navigate('FindAirline',{location: this.state.location, country: this.state.country})}
              style={[styles.subButton,{backgroundColor: '#27AE60'}]}
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
      <SignupLogin loginCB={this.loginSuccess} />
    )
  }

  showUserInfo() {
    return (
      <UserInfo submitCB={this.submitSuccess} />
    )
  }

  submitSuccess(bool) {
    this.setState({
      haveUserInfo: bool
    })
  }

  showAfterLoggedIn() {
    return (
      this.state.haveUserInfo ? this.showHome() : this.showUserInfo()
    )
  }

  loginSuccess() {
    this.setState({
      isLoggedIn: true,
    })
    const keys = this.state.UserInfoData ? Object.keys(this.state.UserInfoData) : [];
    const userInfoCheck = keys.filter((key) => this.state.UserInfoData[key].email.includes(getAuth().currentUser.email));
    console.log(userInfoCheck);
    if (userInfoCheck[0]) {
      this.submitSuccess(true);
      this.setState({
        thisUserInfo: this.state.UserInfoData[userInfoCheck[0]],
        thisUserName: this.state.UserInfoData[userInfoCheck[0]].firstname
      });
      console.log(this.state.thisUserInfo);
    } else {
      this.submitSuccess(false);
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.isLoggedIn ? this.showAfterLoggedIn() : this.showLogin()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Title
  titleContainer: {
    marginHorizontal: 24,
    marginVertical: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },
  currentPlace: {
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
    marginTop: 4
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
    borderRadius: 10
  },
  buttonRow : {
    flexDirection: 'row',
    height: 100,
    flex: 1
  },
  buttonImage: {
    flex: 3,
    height: 160,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 40,
    flex: 5,
    padding: 20,
    textAlign: 'center',
    paddingVertical: 50,
    fontWeight: 'bold',
    color: 'white'
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
    flex: 1,
  },
  subButton: {
    width: (Dimensions.get("window").width - 20)/2 - 10,
    height: 160,
    marginVertical: 5,
    borderRadius: 10,
  },
  subButtonImage: {
    flex: 4,
    width: (Dimensions.get("window").width - 20)/2 - 10,
    borderRadius: 10,
  },
  subButtonTitle: {
    fontSize: 20,
    flex: 1,
    paddingHorizontal: 20,
    // borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 2,
    fontWeight: 'bold',
    color: 'white'
  },
});