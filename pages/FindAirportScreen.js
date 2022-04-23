import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';

import Airport from './components/Airport'

const RADIUS = 50;

export default class FindAirportScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isShowNearby: true,
      airportData: require('./data/airports_res.json'),
      searchResult: [],
    };
  }

  _computeDistance(lat1,lon1,lat2,lon2) {
    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2);
    lon2 = parseFloat(lon2);

    var toRadians = (deg) => {
      return deg * Math.PI/180;
    }
    // https://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371e3; // metres
    var phi1 = toRadians(lat1);
    var phi2 = toRadians(lat2);
    var delta_phi = toRadians((lat2-lat1));
    var delta_lambda = toRadians((lon2-lon1));
  
    var a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    var d = R * c;
  
    return d; // in metres
  }

  _isWithinRadius(lat, long) {
    var distance;
    lat = parseFloat(lat);
    long = parseFloat(long);

    // compute the distance from current location to latlong
    const { location } = this.props.route.params;
    if (location) {
      const currentLat = location.latitude;
      const currentLong = location.longitude;
      // console.log(currentLat, currentLong)
      distance = this._computeDistance(lat,long,currentLat,currentLong)
    }
    else {
      throw "location is not available yet"
    }

    if (distance <= RADIUS*1000)
      return true;
    else
      return false;
  }

  _onPressButton() {
    if(this.state.airportData) {
      const airportData = this.state.airportData.airports;
      var airportFound = [];

      const patt = new RegExp(this.state.searchText, 'i');

      for (let i = 0; i < airportData.length; i++){
        const res_name = airportData[i].name;
        var nameResult = this.state.searchText.length < 3 ? null : res_name.match(patt);
        if (nameResult) {
          // if result is not null, a match is found
          airportFound.push(airportData[i])
        }
      }
      this.setState({
        isShowNearby: false,
        searchResult: airportFound
      });
    }
  }

  showNearby() {
    if (this.state.airportData){
      const airportData = this.state.airportData.airports;
      var inCountryAirportData = airportData.filter((airport) => airport.country_code === "TH");
      var nearbyAirportData = inCountryAirportData.filter((airport) => this._isWithinRadius(airport.lat, airport.lng));
      return (
        <View style={styles.subContainer}>
          <ScrollView style={{flex:1}}>
            {nearbyAirportData.map((res_data,i) => {
              return (
                <Airport
                  key={i}
                  res_data={res_data}
                  navigation={this.props.navigation}
                />
              )
            })}
            {/* workaround for scrollview cutoff at the bottom */}
            <Image source={require('./images/bottom_filler.png')}/>
          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <View style={styles.subContainer}>
          <Text>Please Wait</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }

  showSearchResult() {
    if (this.state.searchResult[0]){
      return (
        <View style={styles.subContainer}>
          <ScrollView style={{flex:1}}>
            {this.state.searchResult.map((res_data,i) => {
              return (
                <Airport
                  key={i}
                  res_data={res_data}
                  navigation={this.props.navigation}
                />
              )
            })}
            {/* workaround for scrollview cutoff at the bottom */}
            <Image source={require('./images/bottom_filler.png')}/>
          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <Text>No airport found</Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchArea}>
          <TextInput
            style={{height: 20, width:300, fontSize: 20}}
            placeholder="Search"
            onChangeText={(text) => this.setState({searchText: text})}
          />
          <TouchableHighlight onPress={() => this._onPressButton()} underlayColor="white">
            <View style={styles.searchButton}>
              <Image
                style={{height:30, width:30}}
                source={require('./images/search_icon.png')}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View>
          {this.state.isShowNearby ? this.showNearby() : this.showSearchResult()}
        </View>
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
    padding: 20
  },
  searchArea: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#E5E4E3',
    borderRadius: 10,
    alignItems: 'center'
  },
  subContainer: {
    padding: 5,
    margin: 10,
    backgroundColor: '#E5E4E3',
    width: Dimensions.get("window").width - 20,
    flex:1
  },
});