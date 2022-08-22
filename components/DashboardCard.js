import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const dashboardCard = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContainerLeft}>
          <Text style={styles.cardValue}>{props.value}</Text>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </View>
        <View style={styles.cardContainerRight}>
        <Icon  name="angle-right" size={18} color="#FFFFFF" />
        </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default dashboardCard;

const styles = StyleSheet.create({
  cardContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  cardContainerLeft:{
    backgroundColor: 'rgba(5, 140, 178, 0.8)',
    padding:10,
    width: 130,
    height:80,
    borderWidth:0,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    
  },

  cardContainerRight:{
    backgroundColor: 'rgba(5, 140, 178, 0.9)',
    padding:10,
    width:30,
    height:80,
    borderWidth:0,
    marginLeft:-1,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    justifyContent:'center',

  },

  cardValue: {
    marginTop: 5,
    fontSize: 20,
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 13,
    color: '#ffffff',
    marginTop: 5,
  },
});
