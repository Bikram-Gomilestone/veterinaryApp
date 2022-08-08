import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const FormDropDown = (props) => {
  return (
    <View style={{marginBottom:12}}>
      <Dropdown
        style={styles.dropdownStyle}
        data={props.data}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.icon}
        iconColor={"#4A03FF"}
        placeholder={props.placeholder}
        onChange={item => {
            props.onChange(item)
          }}
      />
    </View>
  )
}

export default FormDropDown

const styles = StyleSheet.create({
    dropdownStyle:{
        width:320,
        height:40,
        borderWidth: 1,
        borderColor: '#D5D5D5'
    },
    placeholderStyle:{
        fontSize: 14 , 
        paddingLeft: 22,
        paddingVertical: 4,
        color:'#000000'
    },
    icon:{
        width: 18,
        height:10,
        color:'#000000',
        top:2,
        right:16
    },
})