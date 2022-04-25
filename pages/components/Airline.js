import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';

import AirHexAPI from '../api/AirHexAPI';

function Airline(props) {
  const logoURI = props.res_data.hasOwnProperty("icao_code") && !props.res_data.icao_code.includes("*")
                  ? "https://content.airhex.com/content/logos/airlines_" + props.res_data.icao_code + "_200_200_s.png?proportions=keep"
                  : "https://content.airhex.com/content/logos/airlines_" + props.res_data.iata_code + "_200_200_s.png?proportions=keep";

  // const codeType = props.res_data.hasOwnProperty("icao_code") && !props.res_data.icao_code.includes("*") ? "icao" : "iata";
  // const airlineCode = props.res_data.hasOwnProperty("icao_code") && !props.res_data.icao_code.includes("*")
  //                     ? props.res_data.icao_code : props.res_data.iata_code;
  // var logoURI;
  // AirHexAPI(codeType, airlineCode).then((data) => {
  //   logoURI = data;
  //   console.log(data);
  // });

  // const logo = await logoURI[0].logo_square ? {uri: logoURI[0].logo_square} : require("../images/image_not_found_logo.png");

  return (
    <TouchableHighlight
      onPress={()=>{
        props.navigation.navigate('AirlineDetail',{
          res_data: props.res_data,
        });
      }}
      underlayColor='#BBBBBB'
      style={styles.button}
    >
      <View style={styles.buttonRow}>
        <Image style={styles.buttonImage} source={{uri: logoURI}} />
        <Text style={styles.buttonTitle}>{props.res_data.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  // Title
  button: {
    width: Dimensions.get("window").width - 30,
    height: 60,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  buttonRow : {
    flexDirection: 'row',
    height: 50,
    flex: 1
  },
  buttonImage: {
    height: 60,
    width: 60,
    resizeMode: "stretch",
  },
  buttonTitle: {
    fontSize: 18,
    marginHorizontal: 10,
    textAlign: 'left',
    flexShrink: 1,
  },
});

export default Airline;