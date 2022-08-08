import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';

import FormDropDown from '../components/FormDropDown';

const Form = () => {
  return (
    <View>
      <StatusBar hidden />
      <Header/>
      <View style={{marginLeft: 20, marginRight: 33}}>
        <Text style={{fontSize: 14, color: '#4A03FF', marginBottom: 20}}>
          Please enter all the information of the farmer
        </Text>
        <TextInput style={styles.textInputBox} placeholder={'Enter name'} />
        <TextInput style={styles.textInputBox} placeholder={'Mobile number'} />
        <FormDropDown placeholder={'Cattle type'}/>
        <FormDropDown placeholder={'Cattle breed'}/>
        <FormDropDown placeholder={'Camp name'}/>
      </View>
      <View>
        <Text styles={{fontSize: 14,color:'#4A03FF'}}>Upload images</Text>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  textInputBox: {
    width: 320,
    height: 40,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    fontSize: 14,
    color:'#000000',
    paddingLeft: 22,
    paddingVertical: 4,
    marginBottom:12,
  },
});
