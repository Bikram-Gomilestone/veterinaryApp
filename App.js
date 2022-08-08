import { StyleSheet } from 'react-native'
import React, {  } from 'react'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Form from './screens/Form';
import AllLead from './screens/AllLead';
// import AllLead from './screens/AllLead'
// import Form from './screens/Form'


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="AllLead" component={AllLead} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})