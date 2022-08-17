import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const dashboardCard = props => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.cardValue}>{props.value}</Text>
        <Text style={styles.cardTitle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default dashboardCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    height: 60,
    alignItems: 'flex-start',
    backgroundColor: '#F1F7FC',
  },
  cardValue: {
    marginTop: 5,
    fontSize: 20,
    color: '#4A03FF',
  },
  cardTitle: {
    fontSize: 16,
    color: '#2E4CFF',
    marginTop: 5,
  },
});
