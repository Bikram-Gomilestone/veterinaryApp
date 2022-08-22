import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
  return (
    <View style={styles.topContainer}>
      <Image source={require('../assets/mainlogo.png')} style={styles.icon} />
      {props.addBtn ?
        <TouchableOpacity style={styles.addLeadBtn} onPress={props.onPress}>
          <Text style={styles.btnText}>
            <Icon name="plus" size={14} color="#FFFFFF" /> Add Lead
          </Text>
        </TouchableOpacity>
        :

        props.hide ?
          <TouchableOpacity style={styles.addBackBtn} onPress={props.goBack}>
            <FontIcon name="long-arrow-left" size={14} color="#FFFFFF" />
            <Text style={styles.btnText}>
               Back
            </Text>
          </TouchableOpacity>
          : null

      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 75,
    backgroundColor: '#F1F7FC',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    elevation: 5,
    backgroundColor: '#ffffff',

  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 8,
  },
  addLeadBtn: {
    borderWidth: 0,
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#058cb2',
    backgroundColor: "#058cb2",
    borderRadius: 5,
  },

  addBackBtn: {
    borderWidth: 0,
    width: 100,
    height: 40,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
    borderColor: '#058cb2',
    backgroundColor: "#058cb2",
    borderRadius: 5,
  },


  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
})