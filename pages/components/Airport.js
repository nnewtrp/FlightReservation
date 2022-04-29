import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';

function Airport(props) {
  const flagURI = props.res_data.hasOwnProperty("country_code")
                  ? "https://flagpedia.net/data/flags/h120/" + props.res_data.country_code.toLowerCase() + ".png"
                  : "https://flagpedia.net/data/org/h120/un.png";
  return (
    <TouchableHighlight
      onPress={()=>{
        props.navigation.navigate('AirportDetail',{
          res_data: props.res_data,
        });
      }}
      underlayColor='#BBBBBB'
      style={styles.button}
    >
      <View style={styles.buttonRow}>
        <Image style={styles.buttonImage} source={{uri: flagURI}} />
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
    borderRadius: 10,
  },
  buttonRow : {
    flexDirection: 'row',
    height: 50,
    flex: 1
  },
  buttonImage: {
    height: 60,
    width: 80,
    resizeMode: "stretch",
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 18,
    marginHorizontal: 10,
    textAlign: 'left',
    flexShrink: 1,
  },
});

export default Airport;