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
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <FlightSearch />
    );
  }
}