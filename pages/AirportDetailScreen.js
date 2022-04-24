import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Margin } from 'react-native-sketchbook';
import { SliderBox } from "react-native-image-slider-box";

import AirportDataAPI from './api/AirportDataAPI';
import UnsplashAPI from './api/UnsplashAPI';

export default class AirportDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      airportData: {},
      image: [],
    };
  }

  componentDidMount() {
    this._getAirportData();
    this._getAirportImage();
  }

  _getAirportData() {
    const { res_data } = this.props.route.params;
    const codeType = res_data.hasOwnProperty("iata_code") ? "iata" : "icao";
    const airportCode = res_data.hasOwnProperty("iata_code") ? res_data.iata_code : res_data.icao_code;
    AirportDataAPI(codeType, airportCode).then((data) => {
      this.setState({
        airportData: data,
      })
      console.log(data)
    });
  }

  _getAirportImage() {
    const { res_data } = this.props.route.params;
    if (!res_data.iata_code) {
      this.setState({
        image: [require("./images/airport2.webp")],
      })
    } else if (!res_data.icao_code) {
      this.setState({
        image: [require("./images/airport1.webp")],
      })
    } else {
      UnsplashAPI(res_data.name).then((data) => {
        const image = [data.results[0].urls.full, data.results[1].urls.full];
        this.setState({
          image: image,
        })
        console.log(data.results[0].urls.full, data.results[1].urls.full, data.results[2].urls.full)
      });
    }
  }

  getCountryName(country_code) {
    const countryList = require('./data/country_code.json');
    const country = country_code ? countryList[country_code.toLowerCase()] : "-";
    return country
  }

  render() {
    const { res_data } = this.props.route.params;
    const flagURI = res_data.hasOwnProperty("country_code")
                    ? "https://flagpedia.net/data/flags/h120/" + res_data.country_code.toLowerCase() + ".png"
                    : "https://flagpedia.net/data/org/h120/un.png";

    const location = this.state.airportData.hasOwnProperty("location") && this.state.airportData.location
                    ? this.state.airportData.location : "-";
                    
    const iata_code = res_data.hasOwnProperty("iata_code") ? res_data.iata_code : "-";
    const icao_code = res_data.hasOwnProperty("icao_code") ? res_data.icao_code : "-";
    const airportName = this.state.airportData.hasOwnProperty("name") ? this.state.airportData.name : res_data.name;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <SliderBox images={this.state.image} autoplay={true} circleLoop={true} />
        </View>
        <View style={styles.subContainer}>
          <ScrollView style={{flex:1}}>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Name: &ensp;</Text>
              {airportName}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Country: &ensp;</Text>
              {this.getCountryName(res_data.country_code)} &nbsp;
              <Image source={{uri:flagURI}} style={styles.countryFlag}></Image>
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Location: &ensp;</Text>
              {location}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>IATA Code: &ensp;</Text>
              {iata_code}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>ICAO Code: &ensp;</Text>
              {icao_code}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    flex: 1,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  subContainer: {
    padding: 5,
    width: Dimensions.get("window").width,
    flex: 3,
  },
  detailText: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  countryFlag: {
    width: 32,
    height: 24,
    resizeMode: "contain",
  },
});