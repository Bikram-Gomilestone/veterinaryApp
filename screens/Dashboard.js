import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardCard from '../components/DashboardCard'
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <View>
      <Header />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, color: '#2E4CFF' }}>Welcome Ajit</Text>
        <Text style={{ fontSize: 12, color: '#989898' }}>Last updated: 5 Aug, 1:12PM</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
        <DashboardCard title={"Total Leads"} value={'40+'} />
        <DashboardCard title={"Camp attended"} value={'50+'} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
        <DashboardCard title={"Active Vet Camps"} value={'20+'} />
        <DashboardCard title={"Camp attended"} value={'80+'} />
      </View>
      <View style={{ marginHorizontal: 20,marginTop: 30 }}>
        <Text style={{ fontSize: 18, color: '#4A03FF' }}>Recent leads added</Text>
        <View style={{flexDirection:'row', justifyContent: 'space-between',height: 40,backgroundColor: '#F4F4F4',alignItems: 'center',paddingHorizontal: 20,marginTop: 15}}>
          <Text style={{ fontSize: 16,color:'#000000'}}>Rahul</Text>
          <View style={{width:20,height: 20,backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center',borderRadius: 50}}><Icon name="angle-right" size={14} color="#B4B4B4" /></View>
        </View>
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({


})