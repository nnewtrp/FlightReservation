import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { Heading, SubHeading, Margin, RadioButton, RadioButtonItem } from 'react-native-sketchbook'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function FlightSearch(props) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setdeparture] = useState(new Date());
  
  const [openDatePicker, setDatePicker] = useState(false);

  const changeSelectedDate = (event, selectedDate) => {
    if(selectedDate) {
      const currentDate = selectedDate;
      setdeparture(currentDate);
      setDatePicker(false);
    } else {
      setdeparture(departure);
      setDatePicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>From:</Text>
          <TextInput style={styles.input}
            value={from}
            onChangeText={(from) => setFrom(from)}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>To:</Text>
          <TextInput style={styles.input}
            value={to}
            onChangeText={(to) => setTo(to)}
            />
        </View>
        <View style={styles.group}>
          <SubHeading style={styles.title}>Departure Date:</SubHeading>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={[styles.input, {flex: 2}]}
              placeholder="Tab a button to select Date"
              value={moment(departure).format('DD/MM/YYYY').toString()}
            />
            <TouchableOpacity style={styles.dateButton} onPress={() => setDatePicker(true)}>
              <Text style={styles.dateText}>Select Date</Text>
            </TouchableOpacity>
            {openDatePicker && (
              <DateTimePicker
                value={departure}
                mode={openDatePicker}
                is24Hour={true}
                display="default"
                onChange={changeSelectedDate}
              />
            )}
          </View>
        </View>
        <View style={styles.center}>
          <View style={styles.group}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#48D0FB'}]}
              onPress={() => {console.log('search')}}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20
  },
  group: {
    marginTop: 20
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1
  },
  center: {
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    padding: 15,
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  dateButton: {
    backgroundColor: '#EA7838',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5
  },
  dateText: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});

export default FlightSearch;