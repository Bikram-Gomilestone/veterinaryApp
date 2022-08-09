import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';

const AllleadCard = (props) => {
  return (
    <ScrollView>
      <View View style={styles.topContainer}>
        <View style={{flexDirection:'row'}}>

        <CheckBox
          //value={isSelected}
          //onValueChange={setSelection}
          style={styles.checkBox}
        />
        <Text style={styles.nameText}>
          {props.name}
        </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.Iconchecked}>
            <Icon
              name="check"
              size={14}
              color="#fff"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 16,
              width: 16,
              backgroundColor: '#ff0000',
              marginLeft: 12,
            }}>
            <AntDesign
              name="close"
              size={14}
              color="#fff"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginLeft: 45}}>
        <Text
          style={styles.phoneText}>
          {props.phoneNumber}
        </Text>
        <View style={styles.flex_1_center}>
          <Text style={styles.companyText}>
           {props.companyName}
          </Text>
          <Text style={styles.viewDetail}>
            {'View details'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AllleadCard;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 7,
    justifyContent:'space-between'
  },
  checkBox:{
    width: 14, 
    height: 15, 
    marginRight: 12
  },
  nameText:{
    fontSize: 14, 
    marginLeft: 10, 
    color: '#000'
  },
  buttonContainer:{
    flexDirection: 'row', 
     
    marginRight: 10
  },
  Iconchecked:{
    height: 16, 
    width: 16, 
    backgroundColor: '#00c946'
  },
  icon:{
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
  },
  phoneText:{
    fontSize: 14,
    marginLeft: 10,
    color: '#000',
    marginBottom: 7,
  },
  flex_1_center:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  companyText:{
    fontSize: 14, 
    marginLeft: 10, 
    color: '#000'
  },
  viewDetail:{
    fontSize: 14, 
    marginRight: 35, 
    color: '#2E4CFF'
  },

});
