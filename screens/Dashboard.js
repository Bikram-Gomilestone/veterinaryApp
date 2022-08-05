import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardCard from '../components/DashboardCard'

const Dashboard = () => {
  return (
    <View>
      <StatusBar hidden />
      <View style={styles.topContainer}>
        <Image source={require("../assets/mainlogo.png")} style={styles.icon} />
        <TouchableOpacity style={styles.addLeadBtn}>
          <Text style={styles.btnText}><Icon name="plus" size={14} color="#2E4CFF" /> Add Lead</Text>
        </TouchableOpacity>
      </View>
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
          <Icon name="plus" size={14} color="#2E4CFF" />
        </View>
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#F1F7FC',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 22
  },
  icon: {
    width: 40,
    height: 40,
    marginVertical: 8
  },
  addLeadBtn: {
    borderWidth: 1,
    width: 130,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2E4CFF',
    borderRadius: 5,
  },
  btnText: {
    color: '#2E4CFF',
    fontSize: 18,
  },

})