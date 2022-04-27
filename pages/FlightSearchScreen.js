import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { Heading, SubHeading, Margin, RadioButton, RadioButtonItem } from 'react-native-sketchbook'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import FlightSearch from './components/FlightSearch';

export default class FlightSearchScreen extends React.Component {
  constructor(props){
    super(props);
    const { user } = this.props.route.params;
    this.state = {
      user: user,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <View style={styles.group}>
            <Text style={styles.title}>One-Way Flight Search</Text>
          </View>
          <FlightSearch user={this.state.user} />
          <View style={{padding: 30}} />
        </ScrollView>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  group: {
    marginTop: 15
  },
});