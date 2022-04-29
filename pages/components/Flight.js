import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';

function Flight(props) {
  const [onError, setOnError] = useState(false);
  const airline = require("../data/airlines_res.json").airlines.filter((airline) => airline.hasOwnProperty("iata_code")
                  && airline.iata_code.includes(props.res_data.airline.id))
  const logoURI = airline[0].hasOwnProperty("icao_code") && !airline[0].icao_code.includes("*")
                  ? "https://content.airhex.com/content/logos/airlines_" + airline[0].icao_code + "_200_200_t.png?proportions=keep"
                  : "https://content.airhex.com/content/logos/airlines_" + airline[0].iata_code + "_200_200_t.png?proportions=keep";

  return (
    <TouchableHighlight
      onPress={()=>{
        props.navigation.navigate('FlightDetail',{
          res_data: props.res_data,
          onError: onError,
        });
        console.log(onError);
      }}
      underlayColor='#BBBBBB'
      style={styles.button}
    >
      <View style={styles.buttonRow}>
        <View style={{flex:1}}>
          {!onError
            ? <Image style={styles.buttonImage} source={{uri: logoURI}} onError={() => {setOnError(true)}} />
            : <Image style={styles.buttonImage} source={require("../images/image_not_found_logo.png")} />
          }
        </View>
        <View style={{flexDirection: 'column', flex: 4}}>
          <View style={styles.textGroup}>
            <Text style={styles.buttonTitle}>Route:</Text>
            <Text style={styles.buttonTitle}>{props.res_data.from.id}</Text>
            <View style={styles.divider} />
            <Text style={styles.buttonTitle}>{props.res_data.to.id}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.buttonTitle}>Departure Date:</Text>
            <Text style={styles.buttonTitle}>{props.res_data.departureDate}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  // Title
  button: {
    width: Dimensions.get("window").width - 30,
    height: 100,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#EA7838',
  },
  buttonRow : {
    flexDirection: 'row',
    height: 50,
    flex: 1,
    marginVertical: 5
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
    fontWeight: 'bold'
  },
  textGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: 'black',
    marginBottom: 10,
    marginTop: 10
  }
});

export default Flight;