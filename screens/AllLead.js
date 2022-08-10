import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import DropDown from '../components/DropDown';
import AllleadCard from '../components/AllleadCard';
import Header from '../components/Header';
import axios from 'axios';

const Data = [{
  name:"Rahul Sagar",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Sid",
  phoneNumber:"1234567890",
  companyName:"VET camp-Singhpura"
},
{
  name:"Bikram",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Manish",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Rahul Sagar",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Sid",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Rahul Sagar",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Sid",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Bikram",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
{
  name:"Manish",
  phoneNumber:"9512346567",
  companyName:"VET camp-Singhpura"
},
{
  name:"Rahul Sagar",
  phoneNumber:"9501736242",
  companyName:"VET camp-Singhpura"
},
]
let allData =[];

const AllLead = (props) => {

  const [data,setData] = useState([]);
  const [name,setName] = useState(null);
   
  useEffect(() => {
    getData();
  
  }, [])
  
  const getData = async() => {
    let data=[]
    await axios
    .get('http://206.189.129.191/backend/api/v1/getAllData')
    .then(function (response) {
      console.log(JSON.stringify(response.data.data.farmers),"ffadfadf")
      let result = response.data.data.farmers;
       
      result.forEach(element => {
        data.push(element);
      });
      allData.push(data)
      setData(data);
    })
    .catch(function (error) {
      console.log('Error ===> ', error);
    });

  }
 
  const handleSearchItem = (item) => {
    console.log(data,'data')
    // let originalData = allData;
    if(item !== ''  ){
      if(isNaN(item)){
        let Data = data.filter(
          (e) => {
              if(e.farmer_name != null)
              {
                return e.farmer_name.toLowerCase().includes(item.toLowerCase());
              }
          },
        );
        setData(Data);
      }else{
        let Data = data.filter(
          (e) => {
              if(e.farmer_contact != null)
              {
                return e.farmer_contact.includes(item);
              }
          },
        );
        setData(Data);
      }
      
    }else{
      setData(allData[0])
      
    }
  
        
  }

  return (
    <View>
      <StatusBar hidden />
      <Header addBtn = {true} onPress={()=>{props.navigation.navigate('Form')}}/>
      <View style={styles.middleContainer}>
        <Text style={styles.allLeadText}>
          All Leads
        </Text>

        <View style={styles.positionRelative}>
          <Icon
            name="search"
            size={14}
            color="#D5D5D5"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search"
            value={name}
            onChangeText={(value)=>{
              setName(value);
              handleSearchItem(value);
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.flexRow}>
          <CheckBox
            //value={isSelected}
            //onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.selectAllText}>
            Select All
          </Text>
        </View>
        <View style={styles.dropdownContainer}>
          <DropDown placeholder="Filter" />
          <DropDown placeholder="Mark as" />
        </View>
      </View>
      {/* <View style={{marginBottom: 20}}> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 55}}>
      {data.map((item,index)=>{
        {console.log(item)}
        return(
        <View style={{marginBottom:15}}>
         <AllleadCard key={index} name={item.farmer_name} phoneNumber={item.farmer_contact} companyName={item.camp_name}/>
      </View>
    )})}
    </ScrollView>
    </View>
    // </View>
  );
};

export default AllLead;

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
    marginBottom: 22,
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
  icon: {
    width: 40,
    height: 40,
    marginVertical: 8,
  },
  btnText: {
    color: '#2E4CFF',
    fontSize: 18,
  },
  middleContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  allLeadText:{
    fontSize: 16, 
    color: '#4A03FF', 
    marginLeft: 20
  },
  positionRelative:{
    position: 'relative'
  },
  searchIcon:{
    position: 'absolute', 
    top: 2, 
    left: 3
  },
  searchTextInput:{
    height: 20,
    width: 72,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    marginRight: 20,
    borderRadius: 4,
    fontSize: 10,
    color: '#000',
    paddingLeft: 22,
    paddingVertical: 4,
  },bottomContainer:{
    flexDirection: 'row', 
    marginTop: 20, 
    marginLeft: 20
  },
  checkbox:{
    width: 14, 
    height: 15, 
    marginRight: 12
  },
  selectAllText:{
    fontSize: 13, 
    marginLeft: 10, 
    color: '#000'
  },
  dropdownContainer:{
    flexDirection: 'row', 
    marginLeft: 110, 
    marginRight: 10
  },
  flexRow:{
    flexDirection: 'row'
  },
});
