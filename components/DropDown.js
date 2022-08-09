import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const DropDown = props => {
  return (
    <View>
      <Dropdown
        data={props.data}
        style={styles.container}
        placeholderStyle={{fontSize: 10}}
        placeholder={props.placeholder}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
    container:{
        height: 20,
        width: 72,
        borderWidth: 1,
        borderColor: '#D5D5D5',
        marginRight: 10,
        borderRadius: 4,
        fontSize: 10,
        color: '#000',
        paddingLeft: 10,
        paddingVertical: 4,
      }
});
