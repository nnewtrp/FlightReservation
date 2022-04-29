import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import { getDatabase, ref, onValue, get, push, set } from 'firebase/database';

import Flight from './components/Flight';

export default class FlightListScreen extends React.Component {

  constructor(props) {
    super(props);
    const { user } = this.props.route.params;
    this.bookingRef = ref(getDatabase(), 'booking/');
    this.state = {
      bookingList: null,
      thisUserBooking: [],
      user: user,
    };
    this._readDB();
  }

  _readDB() {
    get(this.bookingRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.setState({bookingList: snapshot.val()})
        // console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getUserBooking() {
    const keys = this.state.bookingList ? Object.keys(this.state.bookingList) : [];
    const bookingCheck = keys.filter((key) => this.state.bookingList[key].passenger.email.includes(this.state.user.email)).reverse();
    for (var i=0; i < bookingCheck.length; i++) {
      this.state.thisUserBooking.push(this.state.bookingList[bookingCheck[i]])
    }
  }

  showBookingList() {
    if (this.state.thisUserBooking[0]){
      return (
        <ScrollView style={{flex:1}}>
          {this.state.thisUserBooking.map((res_data,i) => {
            return (
              <Flight
                key={i}
                res_data={res_data}
                navigation={this.props.navigation}
              />
            )
          })}
          <View style={{padding: 30}} />
        </ScrollView>
      )
    }
    else {
      return (
        <Text>No flight found</Text>
      )
    }
  }

  render() {
    if (this.state.bookingList) {this.getUserBooking();}
    return (
      <View style={styles.container}>
        {this.showBookingList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
});