import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getCampName();
    getCattleType();
    getCattleBreed();
  }, []);

  const backAction = () => {
    Alert.alert("Field Agent App!", "Are you sure you want to Exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
     

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])
  );

  const getCattleBreed = async () => {
    let cattleBreed = [];
    await axios

      .get('http://206.189.129.191/backend/api/v1/cattleCategoriesType')
      .then(function (response) {
        let result = response.data.data.categoriestype;
        result.forEach(element => {
          cattleBreed.push(element.typeName);
        });
        AsyncStorage.setItem('CattleBreed', JSON.stringify(cattleBreed));
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };
  const getCattleType = async () => {
    let cattleType = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/cattleCategories')

      .then(function (response) {
        let result = response.data.data.categories;
         console.log(JSON.stringify(result))
        result.forEach(element => {
          cattleType.push(element.categoryName);
        });
        AsyncStorage.setItem('cattleType', JSON.stringify(cattleType));
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };
  const getCampName = async () => {
    let campName = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/camps')
      .then(function (response) {
        let result = response.data.data.camps;
         console.log(JSON.stringify(result));
        result.forEach(element => {
          campName.push(element.campName);
        });
        AsyncStorage.setItem('camps', JSON.stringify(campName));
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };

  const handleSubmitButton = async () => {
    let payload = {
      username: username,
      password: password,
    };
    await axios
      .post('http://206.189.129.191/backend/api/v1/auth', payload)
      .then(function (response) {
        if (response.data.meta.message === 'Invalid Login credentials') {
          alert(response.data.meta.message);
        } else {
          AsyncStorage.setItem('login', 'true');
          AsyncStorage.setItem(
            'username',
            response.data.data.user[0].agentName,
          );
          getCampName();
          getCattleType();
          getCattleBreed();
          props.navigation.navigate('Dashboard');
        }
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden />
      <View style={{height: windowHeight}}>
        <View style={styles.loginUpSec}>
          <Image
            source={require('../assets/loginbg3.jpg')}
            style={styles.loginUpSecImg}
          />
        </View>

        <View style={styles.loginBottomSec}>
          <View style={styles.loginFormGroup}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.loginTitle}>
              Please enter your username and password
            </Text>

            <TextInput
              style={styles.usernameTextInputstyle}
              placeholder="Username"
              value={username}
              onChangeText={e => setUsername(e)}
            />

            <TextInput
              style={styles.passwordInputstyle}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={e => setPassword(e)}
            />
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.submitButtonStyle}
                onPress={handleSubmitButton}>
                <Text style={styles.submitButtonTextStyle}>Submit</Text>
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
  mainContainer: {
    flex: 1,
    height: windowHeight,
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
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: windowWidth,
  },
  loginFormGroup: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  loginText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: 15,
    marginTop: 20,
    marginHorizontal: 5,
    color: '#000000',
    textAlign:'center'
  },
  usernameTextInputstyle: {
    borderWidth: 1,
    borderColor: '#F4F4F4',
    height: 50,
    width: '100%',
    paddingBottom: 7,
    fontSize: 14,
    marginTop: 26,
    paddingLeft: 20,
    borderRadius:10,
  },
  passwordInputstyle: {
    borderWidth: 1,
    borderColor: '#F4F4F4',
    height: 50,
    width: '100%',
    paddingBottom: 7,
    fontSize: 14,
    marginTop: 20,
    paddingLeft: 20,
    borderRadius:10,
  },
  submitButtonContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  submitButtonStyle: {
    borderColor: '#058cb2',
    borderWidth: 0,
    backgroundColor: '#058cb2',
    width: 130,
    height:40,
    borderRadius: 10,
    paddingTop:8,
    marginBottom:10,
  },
  submitButtonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
