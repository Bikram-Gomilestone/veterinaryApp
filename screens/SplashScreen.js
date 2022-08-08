import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = (props) => {

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem("login").then((value) => {
        if (value != '' && value != undefined && value != null && value === 'true') {
          props.navigation.navigate('Dashboard')
        } else {
          props.navigation.navigate('Login')
        }
      })
    }, 2500);
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F7FC' }}>
      <Image source={require('../assets/mainlogo.png')} />
      <Text style={{ fontSize: 40, marginTop: 35,color:'#000000' }}>Veterinary App</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})