import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardCard from '../components/DashboardCard'
import Header from '../components/Header';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


const Dashboard = (props) => {
  const [name,setName] = useState(null);
  const [username,setUsername] = useState(null);
  const [totalLeads,setTotalLeads] = useState(null);

  useEffect(() => {
    getData();
    AsyncStorage.getItem("username").then((e) => {
        setUsername(e)
    }).catch((e)=>{alert(e)})
  }, [])

  const getData = async() => {
    
    await axios
    .get('http://206.189.129.191/backend/api/v1/getAllData')
    .then(function (response) {
      // console.log(JSON.stringify(response.data.data.farmers),"ffadfadf")
      let result = response.data.data.farmers[response.data.data.farmers.length - 1].farmer_name;
      let totalLeadsCount = response.data.data.farmers.length
      setTotalLeads(totalLeadsCount)
      setName(result);
       
      // result.forEach(element => {
      //   console.log(element,"========")
      //   // data.push(element);
      // });
      
    })
    .catch(function (error) {
      console.log('Error ===> ', error);
    });

  }
  return (
    <View>
      <Header addBtn={true} onPress={()=>{props.navigation.navigate('Form')}} />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.welcomeText}>{`Welcome ${username}`}</Text>
        <Text style={styles.lastUpdatedText}>Last updated: 5 Aug, 1:12PM</Text>
      </View>
      <View style={styles.dashboardCard}>
        <DashboardCard title={"Total Leads"} value={totalLeads !== null ? totalLeads : '40+'} />
        <DashboardCard title={"Camp attended"} value={'50+'} />
      </View>
      <View style={styles.dashboardCard}>
        <DashboardCard title={"Active Vet Camps"} value={'20+'} />
        <DashboardCard title={"Camp attended"} value={'80+'} />
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <Text style={styles.recentlyAddedHeading}>Recent leads added</Text>
        <TouchableOpacity style={styles.recentlyAddedTextContainer} onPress={()=>{props.navigation.navigate('AllLead')}}>
          <Text style={styles.recentlyAddedText}>{name}</Text>
          <View style={styles.recentlyAddedIcon}><Icon name="angle-right" size={14} color="#B4B4B4" /></View>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 35 }}>
        <Text style={{ color: '#707070', fontSize: 10, marginBottom: 15 }}>RECENT REPORT</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43, 98]
              },
              {
                data: [66, 55, 80, 58, 90, 43, 59]
              }
            ]
          }}
          width={350} // from react-native
          height={250}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#FFFFFF"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10
          }}
        />
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20,
    color: '#2E4CFF',
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#989898'
  },
  dashboardCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20
  },
  recentlyAddedHeading: {
    fontSize: 18,
    color: '#4A03FF'
  },
  recentlyAddedTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15
  },
  recentlyAddedText: {
    fontSize: 16,
    color: '#000000'
  },
  recentlyAddedIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }

})