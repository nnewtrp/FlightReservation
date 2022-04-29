import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import { Margin } from 'react-native-sketchbook';
import { SliderBox } from "react-native-image-slider-box";

export default class AirlineDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      airlineData: {},
      image: [],
    };
  }

  componentDidMount() {
    const { onError } = this.props.route.params;
    if (onError) {
      this.state.image.push(require("./images/image_not_found_logo_long.png"));
    }
  }

  _getAirlineImage() {
    const { res_data } = this.props.route.params;
    const airline = require("./data/airlines_res.json").airlines.filter((airline) => airline.hasOwnProperty("iata_code")
                  && airline.iata_code.includes(res_data.airline.id))
    const logoURI = airline[0].hasOwnProperty("icao_code") && !airline[0].icao_code.includes("*")
                  ? "https://content.airhex.com/content/logos/airlines_" + airline[0].icao_code + "_300_150_r.png?proportions=keep"
                  : "https://content.airhex.com/content/logos/airlines_" + airline[0].iata_code + "_300_150_r.png?proportions=keep";

    this.state.image.push(logoURI);
  }

  render() {
    const { onError } = this.props.route.params;
    if (!onError) { this._getAirlineImage() }
    const { res_data } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <SliderBox images={this.state.image} resizeMethod={'resize'} resizeMode={'contain'} autoplay={true} circleLoop={true} />
        </View>
        <View style={styles.subContainer}>
          <ScrollView style={{flex:1}}>
            <Text style={[styles.detailText, {fontWeight:'bold' ,fontSize: 26}]}>
              Flight Information
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Airline: &ensp;</Text>
              {res_data.airline.title}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Departure Date: &ensp;</Text>
              {res_data.departureDate}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>From: &ensp;</Text>
              {res_data.from.title} ({res_data.from.id})
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>To: &ensp;</Text>
              {res_data.to.title} ({res_data.to.id})
            </Text>
            <View style={{marginVertical: 10}} />
            <Text style={[styles.detailText, {fontWeight:'bold' ,fontSize: 26}]}>
              Passenger Information
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Name: &ensp;</Text>
              {res_data.passenger.titlename} {res_data.passenger.firstname} {res_data.passenger.lastname}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Nationality: &ensp;</Text>
              {res_data.passenger.nationality}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Date of Birth: &ensp;</Text>
              {res_data.passenger.DOB}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Email: &ensp;</Text>
              {res_data.passenger.email}
            </Text>
            <Text style={styles.detailText}>
              <Text style={{fontWeight:'bold'}}>Phone No: &ensp;</Text>
              {res_data.passenger.phone}
            </Text>
            <View style={{padding: 30}} />
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
    backgroundColor: '#fff',
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
});