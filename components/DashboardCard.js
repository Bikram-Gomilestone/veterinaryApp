import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const dashboardCard = (props) => {
  return (
    <View style={{ width: 160, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F7FC' }}>
      <Text style={{ fontSize: 20, color: '#4A03FF' }}>{props.value}</Text>
      <Text style={{ fontSize: 16, color: '#2E4CFF' }}>{props.title}</Text>
    </View>
  )
}

export default dashboardCard

const styles = StyleSheet.create({

})