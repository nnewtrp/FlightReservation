import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import { Heading, SubHeading, Margin, RadioButton, RadioButtonItem } from 'react-native-sketchbook'

import { getDatabase, ref, onValue, get, push, set } from 'firebase/database';
import { getAuth } from "firebase/auth";

function FlightSearch(props) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState(new Date());
  const [airline, setAirline] = useState('');
  
  const [openDatePicker, setDatePicker] = useState(false);
  const [filterAirportFromList, setFilterAirportFromList] = useState([]);
  const [filterAirportToList, setFilterAirportToList] = useState([]);
  const [filterAirlineList, setFilterAirlineList] = useState([]);

  const changeSelectedDate = (event, selectedDate) => {
    if(selectedDate) {
      const currentDate = selectedDate;
      setDeparture(currentDate);
      setDatePicker(false);
    } else {
      setDeparture(departure);
      setDatePicker(false);
    }
  };

  const getAirportList = require("../data/airports_res.json").airports.filter(
                      (airport) => airport.hasOwnProperty("iata_code") && airport.hasOwnProperty("icao_code"));

  function searchAirportFrom(text) {
    if (text.length >= 3) {
      const airportList = getAirportList.map(({ iata_code: id, name: title }) => ({ id, title }));
      const List = airportList.filter((airport) => airport.title.includes(text));
      setFilterAirportFromList(List.slice(0,5));
    }
  };

  function searchAirportTo(text) {
    if (text.length >= 3) {
      const airportList = getAirportList.map(({ iata_code: id, name: title }) => ({ id, title }));
      const List = airportList.filter((airport) => airport.title.includes(text));
      setFilterAirportToList(List.slice(0,5));
    }
  };

  const getAirlineList = require("../data/airlines_res.json").airlines.filter(
    (airline) => airline.hasOwnProperty("iata_code") && airline.hasOwnProperty("icao_code"));

  function searchAirline(text) {
    if (text.length >= 3) {
      const airlineList = getAirlineList.map(({ iata_code: id, name: title }) => ({ id, title }));
      const List = airlineList.filter((airline) => airline.title.includes(text));
      setFilterAirlineList(List.slice(0,5));
    }
  };

  function _writeDB() {
    push(ref(getDatabase(), 'booking/'), {
      from: from,
      to: to,
      departureDate: moment(departure).format('DD/MM/YYYY').toString(),
      airline: airline,
      passenger: props.user
    })
    .then(() => {
      // Data saved successfully!
      console.log("Store data success")
    })
    .catch((error) => {
      // The write failed...
      console.log("Store Error")
    });
    setFrom('');
    setTo('');
    setDeparture(new Date());
    setAirline('');
  }

  function doConfirm() {
    if (from && to && departure && airline) {
      _writeDB()
      props.navigation.goBack()
    } else {
      alert("Please fill in the flight information");
    }
  }

  return (
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>From:</Text>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={false}
            useFilter={false}
            closeOnSubmit={false}
            onChangeText={(text) => searchAirportFrom(text)}
            emptyResultText="Nothing Found"
            onSelectItem={setFrom}
            dataSet={filterAirportFromList}
            textInputProps={{
              placeholder: "Type 3+ letters",
            }}
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>To:</Text>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={false}
            useFilter={false}
            closeOnSubmit={false}
            onChangeText={(text) => searchAirportTo(text)}
            emptyResultText="Nothing Found"
            onSelectItem={setTo}
            dataSet={filterAirportToList}
            textInputProps={{
              placeholder: "Type 3+ letters",
            }}
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
                minimumDate={new Date()}
              />
            )}
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Airline:</Text>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={false}
            useFilter={false}
            closeOnSubmit={false}
            onChangeText={(text) => searchAirline(text)}
            emptyResultText="Nothing Found"
            onSelectItem={setAirline}
            dataSet={filterAirlineList}
            textInputProps={{
              placeholder: "Type 3+ letters",
            }}
          />
        </View>
        <View style={styles.center}>
          <View style={styles.group}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#48D0FB'}]}
              onPress={() => {doConfirm()}}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
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
    borderWidth: 1,
    backgroundColor: '#e6edf3',
    borderRadius: 5,
    borderWidth: 0,
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