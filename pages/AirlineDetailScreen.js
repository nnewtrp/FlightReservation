import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Margin } from 'react-native-sketchbook';
import { SliderBox } from "react-native-image-slider-box";

import AirHexAPI from './api/AirHexAPI';

export default class AirlineDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      airlineData: {},
      image: [],
    };
  }

  // componentDidMount() {
  //   this._getAirlineImage;
  // }

  _getAirlineImage() {
    const { res_data } = this.props.route.params;
    const logoURI = res_data.hasOwnProperty("icao_code") && !res_data.icao_code.includes("*")
                  ? "https://content.airhex.com/content/logos/airlines_" + res_data.icao_code + "_300_150_r.png?proportions=keep"
                  : "https://content.airhex.com/content/logos/airlines_" + res_data.iata_code + "_300_150_r.png?proportions=keep";

    this.state.image.push(logoURI);
    console.log(logoURI);
  }

  // _getLogoURI() {
  //   const { res_data } = this.props.route.params;
  //   const codeType = res_data.hasOwnProperty("icao_code") && !res_data.icao_code.includes("*") ? "icao" : "iata";
  //   const airlineCode = res_data.hasOwnProperty("icao_code") && !res_data.icao_code.includes("*")
  //                       ? res_data.icao_code : res_data.iata_code;
  //   const logo = null;
  //   AirHexAPI(codeType, airlineCode).then((data) => {
  //     logo = data.hasOwnProperty("logo_rectangle") ? data.logo_rectangle : require("./images/image_not_found_logo.png")
  //   });
  //   this.state.image.push(logo);
  // }

  render() {
    this._getAirlineImage()
    const { res_data } = this.props.route.params;                
    const iata_code = res_data.hasOwnProperty("iata_code") ? res_data.iata_code : "-";
    const icao_code = res_data.hasOwnProperty("icao_code") ? res_data.icao_code : "-";

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <SliderBox images={this.state.image} autoplay={true} circleLoop={true} />
        </View>
        <View style={styles.subContainer}>
          <ScrollView style={{flex:1}}>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Name: &ensp;</Text>
              {res_data.name}
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
    resizeMode: "stretch",
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
});