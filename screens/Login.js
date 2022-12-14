import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={{height: windowHeight}}>
        <View style={styles.loginUpSec}>
          <Image
            source={require('../assets/loginbg3.jpg')}
            style={styles.loginUpSecImg}
          />
        </View>

        <View style={styles.loginBottomSec}>
          <View style={styles.loginFormGroup}>
            <Text
              style={styles.loginText}>
              Login
            </Text>
            <Text style={styles.loginTitle}>
              To login please enter your username and password
            </Text>

            <TextInput
              style={styles.usernameTextInputstyle}
              placeholder="Username"
            />

            <TextInput
              style={styles.passwordInputstyle}
              placeholder="Password"
            />
            <View
              style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.submitButtonStyle}>
                <Text
                  style={styles.submitButtonTextStyle}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    height: windowHeight
},   
  loginUpSec: {
    flexDirection: 'row',
    flex: 1,
  },
  loginUpSecImg: {
    resizeMode: 'cover',
    height: windowHeight / 1.5,
    width: windowWidth,
    flex: 1,
  },
  loginBottomSec: {
    zIndex: 999,
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: windowWidth,
  },
  loginFormGroup: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginText:{
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginTitle:{
    fontSize: 14,
    marginTop: 20,
    marginHorizontal:5,
    color:'#000000'
},
  usernameTextInputstyle:{
    borderWidth: 1,
    borderColor: '#F4F4F4',
    height: 40,
    width: 322,
    paddingBottom: 7,
    fontSize: 14,
    marginTop: 26,
    marginHorizontal: 5,
    paddingLeft: 20,
  },
  passwordInputstyle:{
    borderWidth: 1,
    borderColor: '#F4F4F4',
    height: 40,
    width: 322,
    paddingBottom: 7,
    fontSize: 14,
    marginTop: 20,
    marginHorizontal: 5,
    paddingLeft: 20,
  },
  submitButtonContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 35 
  },
  submitButtonStyle:{
    borderColor: '#2E4CFF',
    borderWidth: 1,
    backgroundColor: '#2E4CFF',
    width: 120,
    borderRadius: 8,
    paddingVertical: 6,
  },
  submitButtonTextStyle:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  }
});
