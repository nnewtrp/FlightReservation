import React from 'react';
import { Platform, StyleSheet, Text, View, 
  TouchableHighlight, TextInput, Image, Alert,
  ScrollView, Dimensions, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default class SignupLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      showLogin: true,
    };
  }

  toggleShowLogin() {
    this.setState({
      showLogin: true
    })
  }

  toggleShowSignup() {
    this.setState({
      showLogin: false
    })
  }

  doLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password).then( () => {
      console.log("login successful");
      console.log(auth.currentUser.email);
      this.props.loginCB();
      // const keys = this.props.UserData ? Object.keys(this.props.UserData) : [];
      // const userInfoCheck = keys.filter((key) => this.props.UserData[key].email.includes(auth.currentUser.email));
      // console.log(userInfoCheck);
      // if (userInfoCheck[0]) {
      //   this.props.submitCB(true);
      // } else {
      //   this.props.submitCB(false);
      // }
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
      // ...
    })
  }

  doSignup() {
    // https://firebase.google.com/docs/auth/web/password-auth

    // check if the two password fields match
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password === confirmPassword){
      // do signup
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then( () => {
        console.log("created new user successful");
        this.doLogin(); // switch to login page
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

  showSignup() {
    return (
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>Email</Text>
          <TextInput style={styles.input}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Confirm Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
        </View>
        <View style={styles.center}>
          <View style={styles.group}>
            <TouchableOpacity onPress={() => {this.toggleShowLogin();}}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={styles.button}
              onPress={() => {this.doSignup()}}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  showLogin() {
    return (
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>Email</Text>
          <TextInput style={styles.input}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.center}>
          <View style={styles.group}>
            <TouchableOpacity onPress={() => {this.toggleShowSignup();}}>
              <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={styles.button}
              onPress={() => {this.doLogin();}}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerLogin}>
        {this.state.showLogin ? this.showLogin() : this.showSignup()}
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
    fontSize: 20,
    padding: 10,
  },
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
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
  title: {
    fontSize: 20
  },
  center: {
    alignItems: 'center'
  },
  signupText : {
    fontSize: 20,
    color: 'blue'
  }
});