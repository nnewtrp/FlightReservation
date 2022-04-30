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
          <Text style={[styles.title, {fontWeight: 'bold', fontSize: 40}]}>Sign Up</Text>
        </View>
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
            <TouchableOpacity style={[styles.button, {backgroundColor: '#EA7838'}]}
              onPress={() => {this.doSignup();}}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <View style={styles.divider} />
            <Text style={[styles.title, {fontSize: 18, textAlign: 'center', marginBottom: 10, flex: 4, marginTop: 15}]}>
              Already have an account?
            </Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#48D0FB', marginTop: 0}]}
              onPress={() => {this.toggleShowLogin();}}>
              <Text style={styles.buttonText}>Go To Login Page</Text>
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
          <Text style={[styles.title, {fontWeight: 'bold', fontSize: 40}]}>TICKETA Login</Text>
        </View>
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
            <TouchableOpacity style={[styles.button, {backgroundColor: '#48D0FB'}]}
              onPress={() => {this.doLogin();}}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <View style={styles.divider} />
            <Text style={[styles.title, {fontSize: 18, textAlign: 'center', marginBottom: 10, flex: 4, marginTop: 15}]}>
              Already have an account?
            </Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#EA7838', marginTop: 0}]}
              onPress={() => {this.toggleShowSignup();}}>
              <Text style={styles.buttonText}>Go To Signup Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerLogin}>
        <ScrollView style={{flex:1}}>
          {this.state.showLogin ? this.showLogin() : this.showSignup()}
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
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    backgroundColor: '#E5E4E3',
    borderRadius: 5,
    borderWidth: 0,
  },
  title: {
    fontSize: 20
  },
  center: {
    alignItems: 'center'
  },
  divider: {
    flex: 1,
    width: Dimensions.get("window").width - 40,
    height: 1,
    backgroundColor: 'black',
    // marginBottom: 10,
    marginTop: 30
  },
});