import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import { Heading, SubHeading, Margin, RadioButton, RadioButtonItem } from 'react-native-sketchbook'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default class UserInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      titlename: '',
      firstname: '',
      lastname: '',
      phone: '',
      DOB: '',
      nationality: '',
      openDatePicker: false,
    };
  }

  doSignup() {
    // https://firebase.google.com/docs/auth/web/password-auth

    // check if the two password fields match
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password === confirmPassword){
      // do signup
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.state.username, this.state.password).then( () => {
        console.log("created new user successful");
        this.toggleShowLogin(); // show login page
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
    }
    else {
      alert("Password do not match !!!");
    }
  }

  render() {
    return (
      <View style={styles.containerForm}>
        <ScrollView style={{flex:1}}>
          <View>
            <Heading style={{color:'black'}}>Fill in your information</Heading>
            <View style={styles.group}>
              <View style={{flexDirection: 'row'}}>
                <SubHeading style={styles.title}>Title Name:</SubHeading>
                <RadioButton.Group value={this.state.titlename} onValueChange={(value) => this.setState({ titlename: value })}>
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
                value={this.state.firstname}
                onChangeText={(firstname) => this.setState({firstname: firstname})}
              />
            </View>
            <View style={styles.group}>
              <SubHeading style={styles.title}>Last Name:</SubHeading>
              <TextInput style={styles.input}
                value={this.state.lastname}
                onChangeText={(lastname) => this.setState({lastname: lastname})}
              />
            </View>
            <View style={styles.group}>
              <SubHeading style={styles.title}>Phone No:</SubHeading>
              <TextInput style={styles.input}
                value={this.state.phone}
                onChangeText={(phone) => this.setState({phone: phone})}
              />
            </View>
            <View style={styles.group}>
              <SubHeading style={styles.title}>Date of Birth:</SubHeading>
              <View style={{flexDirection: 'row'}}>
                <TextInput style={[styles.input, {flex: 2}]}
                  editable = {false}
                  placeholder="Tab a button to select DOB"
                  value={this.state.DOB}
                  onChangeText={(DOB) => this.setState({DOB: DOB})}
                />
                <TouchableOpacity style={styles.DOBButton} onPress={() => console.log("DOB")}>
                  <Text style={styles.DOBText}>Select Date</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.group}>
              <SubHeading style={styles.title}>Nationality:</SubHeading>
              <TextInput style={styles.input}
                value={this.state.nationality}
                onChangeText={(nationality) => this.setState({nationality: nationality})}
              />
            </View>
            <View style={styles.center}>
              <View style={styles.group}>
                <TouchableOpacity style={styles.button} onPress={() => {this.doSignup()}}>
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{padding: 30}} />
        </ScrollView>
      </View>
    );
  }
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
    backgroundColor: 'lightblue',
    padding: 15,
    borderWidth: 1,
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1
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
    borderWidth:1,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5
  },
  DOBText: {
    marginVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});