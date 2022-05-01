import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { Heading, SubHeading, Margin, RadioButton, RadioButtonItem } from 'react-native-sketchbook'

import { getDatabase, ref, onValue, get, push, set } from 'firebase/database';
import { getAuth } from "firebase/auth";

function UserInfo(props) {
  const [titlename, setTitlename] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [DOB, setDOB] = useState(new Date());
  const [nationality, setNationality] = useState('');
  const [openDatePicker, setDatePicker] = useState(false);

  const changeSelectedDate = (event, selectedDate) => {
    if(selectedDate) {
      const currentDate = selectedDate;
      setDOB(currentDate);
      setDatePicker(false);
    } else {
      setDOB(DOB);
      setDatePicker(false);
    }
  };

  function _writeDB() {
    push(ref(getDatabase(), 'userinfo/'), {
      email: getAuth().currentUser.email,
      titlename: titlename,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      DOB: moment(DOB).format('DD/MM/YYYY').toString(),
      nationality: nationality,
    })
    .then(() => {
      // Data saved successfully!
      console.log("Store data success")
    })
    .catch((error) => {
      // The write failed...
      console.log("Store Error")
    });
    setTitlename('');
    setFirstname('');
    setLastname('');
    setPhone('');
    setDOB(new Date());
    setNationality('');
  }

  function doSubmit() {
    if (titlename && firstname && lastname && phone && DOB && nationality) {
      _writeDB()
      props.submitCB(true);
    } else {
      alert("Please fill in your information");
    }
  }

  return (
    <View style={styles.containerForm}>
      <ScrollView style={{flex:1}}>
        <View>
          <Heading style={{color:'black'}}>Fill In Your Information</Heading>
          <View style={styles.group}>
            <View style={{flexDirection: 'row'}}>
              <SubHeading style={styles.title}>Title Name:</SubHeading>
              <RadioButton.Group value={titlename} onValueChange={(titlename) => setTitlename(titlename)}>
                <View style={styles.radio}>
                  <RadioButtonItem value="Mr." label="Mr.    "/>
                  <RadioButtonItem value="Ms." label="Ms.    "/>
                  <RadioButtonItem value="Mrs." label="Mrs.    "/>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={styles.group}>
            <SubHeading style={styles.title}>First Name:</SubHeading>
            <TextInput style={styles.input}
              placeholder="Ex. John"
              value={firstname}
              onChangeText={(firstname) => setFirstname(firstname)}
            />
          </View>
          <View style={styles.group}>
            <SubHeading style={styles.title}>Last Name:</SubHeading>
            <TextInput style={styles.input}
              placeholder="Ex. Doe"
              value={lastname}
              onChangeText={(lastname) => setLastname(lastname)}
            />
          </View>
          <View style={styles.group}>
            <SubHeading style={styles.title}>Phone No:</SubHeading>
            <TextInput style={styles.input}
              placeholder="Ex. 089XXXXXXX"
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
            />
          </View>
          <View style={styles.group}>
            <SubHeading style={styles.title}>Date of Birth:</SubHeading>
            <View style={{flexDirection: 'row'}}>
              <TextInput style={[styles.input, {flex: 2}]}
                placeholder="Tab a button to select DOB"
                value={moment(DOB).format('DD/MM/YYYY').toString()}
              />
              <TouchableOpacity style={styles.DOBButton} onPress={() => setDatePicker(true)}>
                <Text style={styles.DOBText}>Select Date</Text>
              </TouchableOpacity>
              {openDatePicker && (
                <DateTimePicker
                  value={DOB}
                  mode={openDatePicker}
                  display="default"
                  onChange={changeSelectedDate}
                  maximumDate={new Date()}
                />
              )}
            </View>
          </View>
          <View style={styles.group}>
            <SubHeading style={styles.title}>Nationality:</SubHeading>
            <TextInput style={styles.input}
              placeholder="Ex. Thai"
              value={nationality}
              onChangeText={(nationality) => setNationality(nationality)}
            />
          </View>
          <View style={styles.center}>
            <View style={styles.group}>
              <TouchableOpacity style={styles.button} onPress={() => {doSubmit()}}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{padding: 30}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  containerForm: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20
  },
  group: {
    marginTop: 20
  },
  button: {
    marginTop: 10,
    backgroundColor: '#48D0FB',
    padding: 15,
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    backgroundColor: '#E5E4E3',
    borderRadius: 5,
    borderWidth: 0,
  },
  radio: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
    marginLeft: 20
  },
  center: {
    alignItems: 'center'
  },
  DOBButton: {
    backgroundColor: '#EA7838',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5
  },
  DOBText: {
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  }
});

export default UserInfo;