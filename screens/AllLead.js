import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import DropDown from '../components/DropDown';
import AllleadCard from '../components/AllleadCard';
import Header from '../components/Header';
import axios from 'axios';
import FormDropDown from '../components/FormDropDown';


const Data = [{
  name: "Rahul Sagar",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Sid",
  phoneNumber: "1234567890",
  companyName: "VET camp-Singhpura"
},
{
  name: "Bikram",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Manish",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Rahul Sagar",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Sid",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Rahul Sagar",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Sid",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Bikram",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
{
  name: "Manish",
  phoneNumber: "9512346567",
  companyName: "VET camp-Singhpura"
},
{
  name: "Rahul Sagar",
  phoneNumber: "9501736242",
  companyName: "VET camp-Singhpura"
},
]
let allData = [];

const MARK_AS = [
  'Present',
  'Absent'
]

let arrayOfIds = [];

const AllLead = (props) => {

  const [data, setData] = useState([]);
  const [Alldata, setAllData] = useState([]);
  const [name, setName] = useState(null);
  const [campNames, setCampNames] = useState([]);
  const [campname, setCampname] = useState('');
  const [markItem, setMarkItem] = useState(false)
  const [attendenceArray, setAttendenceArray] = useState([]);
  const [isPresent, setIsPresent] = useState('')
  const [clearMark, setClearMark] = useState(false)

  useEffect(() => {
    getData();
    getCampName();
  }, [])

  const getData = async () => {
    let data = []
    let newData = []
    await axios
      .get('http://206.189.129.191/backend/api/v1/getAllData')
      .then(function (response) {
        // console.log(JSON.stringify(response.data.data.farmers), "ffadfadf")
        let result = response.data.data.farmers;

        result.forEach(element => {
          element.isChecked = false;
          data.push(element);
        });
        result.forEach(element => {
          element.isPresent = false;
          newData.push(element);
        });
        allData.push(data)
        setData(data);
        setAllData(newData);
        // console.log("Data =====> ", data);

      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });

  }

  const getCampName = async () => {
    let campName = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/camps')
      .then(function (response) {
        let result = response.data.data.camps;
        result.forEach(element => {
          campName.push(element.campName);
        });
        // console.log("Camp Name ===>", campName);
        setCampNames(campName);
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };

  const handleSearchItem = (item) => {
    // console.log(data, 'data')
    // let originalData = allData;
    if (item !== '') {
      if (isNaN(item)) {
        let Data = Alldata.filter(
          (e) => {
            if (e.farmerName != null) {
              return e.farmerName.toLowerCase().includes(item.toLowerCase());
            }
          },
        );
        setAllData(Data);
      } else {
        let Data = Alldata.filter(
          (e) => {
            if (e.farmerContact != null) {
              return e.farmerContact.includes(item);
            }
          },
        );
        setAllData(Data);
      }

    } else {
      setAllData(data)

    }


  }
  const handleCampNameFilter = (item) => {
    // let place =item
    let originalData = data;
    if (item !== '' && item !== undefined) {
      let Data = originalData.filter((e) => {
        if (e.campName === item) {
          return e
        }
      })
      setAllData(Data);
      setCampname(item)

    } else {
      setAllData(originalData)
      setCampname("Filter")
    }
  }

  // const empty = arr => arr.length = 0;

  const handleMarkAs = async (item, markas) => {

    if (markas !== undefined) {
      item.map((e) => {
        if (e.isChecked === true) {
          arrayOfIds.push(e._id)
        }
      })
    }
    let payload = {
      "farmer": arrayOfIds
    }

    // setMarkItem(false)
    // data.map((e) => {
    //   if (e.isChecked === true) {
    //     e.isChecked = false;
    //   }
    // })
    if (payload.farmer.length > 0) {
      await axios
        .post('http://206.189.129.191/backend/api/v1/attendance', payload)
        .then(function (response) {
          let result = response.data.meta.message;
          alert(result)
          arrayOfIds = [];
          // empty(arrayOfIds)
          setIsPresent('')
          setClearMark(true)
        })
        .catch(function (error) {
          console.log('Error ===> ', error);
        });
    }
  }

  // const handleCheckbox = (item) => {
  // item.map((e) => {
  //   if (e.isChecked === true) {
  //     alert(JSON.stringify(e))
  //   }
  // })
  //   console.log(item);
  // }



  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <StatusBar hidden />
      <Header addBtn={false} hide={true} goBack={() => { props.navigation.navigate('Dashboard') }} />
      <View style={styles.middleContainer}>
        <Text style={styles.allLeadText}>
          All Leads
        </Text>

        <View style={styles.positionRelative}>
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search"
            placeholderTextColor={'#000000'}
            value={name}
            onChangeText={(value) => {
              setName(value);
              handleSearchItem(value);
            }}
          />
          <Icon
            name="search"
            size={18}
            color="#058cb2"
            style={styles.searchIcon}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.flexRow}>
          <CheckBox
            value={markItem}
            onValueChange={() => {

              setMarkItem((prevState) => !prevState);
              data.map((e) => {
                e.isChecked = !markItem;
              })
            }
            }
            style={styles.checkbox}
          />
          <Text style={styles.selectAllText}>
            All
          </Text>
        </View>
        <View style={styles.dropdownContainer}>
          <FormDropDown
            data={campNames}
            buttonTextStyle={styles.placeholderStyle}
            label={'Filter'}
            selectedValue={campname}
            onValueChange={(e, i) => handleCampNameFilter(e)}
            clear={true}
          />
        </View>
        <View style={styles.dropdownContainername}>
          <FormDropDown
            data={MARK_AS}
            buttonTextStyle={styles.placeholderStyle}
            label={'Mark As'}
            selectedValue={isPresent}
            onValueChange={(e, i) => {
              setIsPresent(e)
              handleMarkAs(data, e)
            }}
          />
        </View>
      </View>
      <AllleadCard
        value={markItem}
        data={Alldata}
        clearMark={clearMark}
        handleclicked={(item) => handleMarkAs(item)}
        navigation={props.navigation}
      />
    </View>
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
    paddingHorizontal: 10,
    // marginBottom: 22,
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
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingTop:20,

  },
  allLeadText: {
    fontSize: 24,
    color: '#000000',
    marginLeft: 10
  },
  positionRelative: {
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  searchIcon: {
    position: 'absolute',
    right: 25,
    top: 10
  },
  searchTextInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    marginRight: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
    paddingLeft: 10,
    paddingVertical: 4,
  },
  bottomContainer: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: 'center'
  },

  flexRow: {
    flex: 1,
    flexDirection: 'row'
  },

  dropdownContainer: {
    flex: 2,
    marginRight: 10,
    height:40,
  },

  dropdownContainername: {
    flex: 2,
    height:40,
  },

  checkbox: {
    width: 20,
    height: 15,
    marginRight: 12,
    marginLeft:7,
  },
  selectAllText: {
    fontSize: 13,
    marginLeft: 2,
    color: '#000'
  },

  placeholderStyle: {
    fontSize: 14,
    padding: 0,
    paddingVertical: 4,
    color: '#000000',
    // left: 11,
  },
});
