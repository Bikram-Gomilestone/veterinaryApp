import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';

const FormDropDown = props => {
  return (
    <View style={styles.dropDownContainer}>
      <Picker
        key={Math.random()}
        style={styles.dropdownStyle}
        prompt={props.prompt}
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}>
        <Picker.Item label={props.label} />
        {props.data.map(e => (
          <Picker.Item label={e} value={e} />
        ))}
      </Picker>
      {/* <Dropdown
        style={styles.dropdownStyle}
        data={props.data}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.icon}
        iconColor={"#4A03FF"}
        placeholder={props.placeholder}
        onChange={item => {
            props.onChange(item)
          }}
          labelField={props.labelField}
          valueField={props.valueField}
      /> */}
      {/* <SelectDropdown
        data={props.data}
        defaultButtonText={props.defaultButtonText}
        buttonStyle={styles.dropdownStyle}
        buttonTextStyle={props.buttonTextStyle}
        onSelect={props.onSelect}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      /> */}
    </View>
  );
};

export default FormDropDown;

const styles = StyleSheet.create({
  dropDownContainer: {
    marginBottom: 12,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#D5D5D5',
  },
  dropdownStyle: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#D5D5D5',
  },
  placeholderStyle: {
    fontSize: 14,
    padding: 0,
    paddingVertical: 4,
    color: '#000000',
    left: 120,
  },
  icon: {
    width: 18,
    height: 10,
    color: '#000000',
    top: 2,
    right: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 150,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
});
