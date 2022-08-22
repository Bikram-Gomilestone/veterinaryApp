import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(145, 230, 253, 0.3)' }}>
      <StatusBar hidden />
      <View style={{backgroundColor:'#fff',padding:2,borderRadius:100,elevation:20}}>
      <Image source={require('../assets/mainlogo.png')} style={{width:120,height:120,}}/>
      </View>
      <Text style={{ fontSize: 40, marginTop: 40, color:'#000' }}>Field Agent App</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})