import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import Airline from './components/Airline'

export default class FindAirlineScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isShowRecommend: true,
      airlineData: require('./data/airlines_res.json'),
      searchResult: [],
    };
  }

  _onPressButton() {
    if(this.state.airlineData) {
      const airlineData = this.state.airlineData.airlines;
      var airlineFound = [];

      const patt = new RegExp(this.state.searchText, 'i');

      for (let i = 0; i < airlineData.length; i++){
        const res_name = airlineData[i].name;
        var nameResult = this.state.searchText.length < 3 ? null : res_name.match(patt);
        if (nameResult) {
          // if result is not null, a match is found
          airlineFound.push(airlineData[i])
        }
      }
      this.setState({
        isShowRecommend: false,
        searchResult: airlineFound
      });
    }
  }

  showRecommend() {
    if (this.state.airlineData){
      const recommendListCode = ["QTR", "ETD", "DLH", "THA", "KLM", "JAL", "UAE"];
      const airlineData = this.state.airlineData.airlines;
      var recommendAirlineData = airlineData.filter((airline) => recommendListCode.includes(airline.icao_code));
      return (
        <View style={styles.subContainer}>
          <ScrollView style={{flex:1}}>
            {recommendAirlineData.map((res_data,i) => {
              return (
                <Airline
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
                <Airline
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
        <Text>No airline found</Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchArea}>
          <TextInput
            style={{height: 20, width: 300, fontSize: 20}}
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
          {this.state.isShowRecommend ? this.showRecommend() : this.showSearchResult()}
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