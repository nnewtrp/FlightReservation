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
    const logoURI = res_data.hasOwnProperty("icao_code") && !res_data.icao_code.includes("*")
                  ? "https://content.airhex.com/content/logos/airlines_" + res_data.icao_code + "_300_150_r.png?proportions=keep"
                  : "https://content.airhex.com/content/logos/airlines_" + res_data.iata_code + "_300_150_r.png?proportions=keep";

    this.state.image.push(logoURI);
  }

  render() {
    const { onError } = this.props.route.params;
    if (!onError) { this._getAirlineImage() }
    const { res_data } = this.props.route.params;                
    const iata_code = res_data.hasOwnProperty("iata_code") ? res_data.iata_code : "-";
    const icao_code = res_data.hasOwnProperty("icao_code") ? res_data.icao_code : "-";

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <SliderBox images={this.state.image} resizeMethod={'resize'} resizeMode={'contain'} autoplay={true} circleLoop={true} />
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