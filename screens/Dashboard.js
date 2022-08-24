import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import NetInfo from '@react-native-community/netinfo';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Dashboard = props => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [totalLeads, setTotalLeads] = useState(null);
  const [campCount, setCampCount] = useState(null);
  const [network, setNetwork] = useState(false);
  const [netAvailable, setNetAvailable] = useState(false);
  const [status, setStatus] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getData();
    getCampName();
    let listener = EventRegister.addEventListener('getData', () => getData());
    AsyncStorage.getItem('username')
      .then(e => {
        setUsername(e);
      })
      .catch(e => {
        alert(e);
      });
    return () => {
      // unsubscribe event1
      EventRegister.removeEventListener(listener);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      handleStatus();
    }, 2000);
    if (network) {
      // console.log('network back');
      checkInternetAvailability();
    }
  }, [network]);

  const handleStatus = () => {
    NetInfo.fetch().then(state => {
      setNetwork(state.isConnected);
      //   console.log("Connection type", state.type);
      //   console.log("Is connected?", state.isConnected);
    });
  };

  const checkInternetAvailability = () => {
    axios
      .get('https://www.google.com/')
      .then(function (response) {
        //console.log('response', response);
        // handle success
        setStatus(true);
        setNetAvailable(true);
        if (response.status === 200) {
          setNetAvailable(true);
          sendPendingImageData();
        }
      })
      .catch(function (error) {
        // handle error
        console.log('NO Internet Access Available');
        setNetAvailable(false);
        //alert(error.message, +'sdfhdfh');
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  };

  const getImageURL = async (payload, uid, farmerinfo) => {
    let apiRequest = await axios.post(
      'http://206.189.129.191/backend/api/v1/uploadImage',
      payload,
    );
    let tmp = `http://206.189.129.191/${apiRequest.data.url}`;
    return { url: tmp, payload, uid, farmerinfo };
  };

  const handleOfflineImageUpload = async (forms, uid, farmerinfo, payload) => {
    var farmerinfo = farmerinfo;
    // console.log(uid,'iiiiiiiiiii')
    let jobs = [];
    Object.keys(forms).forEach(key => {
      let x = forms[key];
      jobs.push({
        data: x,
      });
    });

    jobs.forEach(job => {
      let x = job.data;
      let urls = [];
      x.forEach(z => {
        urls.push(z.url);
        uid = z.uid;
        // console.log(uid,z,'ooooo>>>>')
      });
      let images = urls;
      let activefarm = {};
      // if(farmerinfo.imageUrl != undefined)

      //    images = farmerinfo.imageUrl;

      farmerinfo?.forEach(x => {
        if (x.formuid == uid) activefarm = x;
      });
      activefarm.imageUrl = images;

      farmerinfo?.forEach(x => {
        if (x.formuid == uid) x = activefarm;
      });
    });

    await AsyncStorage.setItem('FarmerData', JSON.stringify(farmerinfo));
    // imagesUrl: JSON.stringify(uploadImageUrl).replaceAll('"', ''),

    // console.log(farmerinfo,'======');
    return true;
  };

  const sendPendingImageData = async () => {
    let promiseArray = [];
    let PendingImages = await AsyncStorage.getItem('pendingImage');
    let farmerData = await AsyncStorage.getItem('FarmerData');
    console.log(JSON.parse(PendingImages), 'PendingImages');
    console.log(JSON.parse(farmerData), 'farmerData');
    if (
      PendingImages !== null &&
      PendingImages !== undefined &&
      farmerData !== undefined &&
      farmerData !== null
    ) {
      let imageData = JSON.parse(PendingImages);
      let farmerinfo = JSON.parse(farmerData);

      imageData.forEach(element => {
        farmerinfo.forEach((item, key) => {
          if (element.formuid === item.formuid) {
            //console.log(element, 'element');
            // console.log(item, 'item');
            element.images.forEach(i => {
              // console.log(i.base64,"IIIIIII")
              let payload = {
                farmerContact: item.farmerContact,
                fileName: i.fileName,
                base64Image: `data:image/jpeg;base64,${i.base64}`,
              };
              // console.log(payload);
              let res = getImageURL(payload, item.formuid, farmerinfo); // handleOfflineImageUpload(payload, item.formuid,farmerinfo);
              promiseArray.push(res);
            });
            // var apiRequest = axios.post(
            //   'http://206.189.129.191/backend/api/v1/uploadImage',
            //   payload,
            // );
            // promiseArray.push(apiRequest);
          }
        });
      });
      Promise.all(promiseArray)
        .then(async res => {
          //console.log('all done =====>>>',JSON.stringify(res));
          let urls = [];
          let payload;
          let uid;
          let farmerinfo;
          res.forEach(x => {
            payload = x.payload;
            uid = x.uid;
            farmerinfo = x.farmerinfo;
          });

          var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };

          let forms = groupBy(res, 'uid');
          await handleOfflineImageUpload(forms, uid, farmerinfo, payload);
          SyncOfflineData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const SyncOfflineData = async () => {
    if (isUploading) return false;
    let pendingData = await AsyncStorage.getItem('FarmerData');
    console.log(JSON.parse(pendingData), '====>farmerData');
    let payload = [];
    if (pendingData) {
      let jobs = JSON.parse(pendingData);
      jobs.forEach(x => {
        console.log(x);
        let pendingForm = {
          farmerName: x.farmerName,
          farmerContact: x.farmerContact,
          cattleTypeId: x.cattleTypeId,
          cattleBreedId: x.cattleBreedId,
          campId: x.campId,
          imagesUrl: JSON.stringify(x.imageUrl).replace(/[" "]/g, ''),
        };
        payload.push(pendingForm);
      });
      console.log('Ready to upload ====>', payload);
      setIsUploading(true);
      await axios
        .post('http://206.189.129.191/backend/api/v1/storeleaddetails', payload)
        .then(res => {
          if (res !== null) {
            // console.log("response",res);
            if (payload.length > 0) {
              console.log(payload, 'after');
              AsyncStorage.removeItem('FarmerData', () => {
                getData();
              });
              AsyncStorage.removeItem('pendingImage', () => {
                alert('Pending Data Send');
              });
              setIsUploading(false);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getCampName = async () => {
    await axios
      .get('http://206.189.129.191/backend/api/v1/camps')
      .then(function (response) {
        let result = response.data.data.camps;
        //console.log("======>>>",JSON.stringify(result.length));
        setCampCount(result.length);
        // result.forEach(element => {
        //   campName.push(element.campName);
        // });
        // setCampName(campName);
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };

  const backAction = () => {
    Alert.alert('Field Agent App!', 'Are you sure you want to Exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );

  const getData = async () => {
    await axios
      .get('http://206.189.129.191/backend/api/v1/getAllData')
      .then(function (response) {
        console.log(
          JSON.stringify(response.data.data.farmers[0].farmer.farmerName),
          'ffadfadf',
        );
        let result = response.data.data.farmers[0].farmer.farmerName;
        let totalLeadsCount = response.data.data.farmers.length;
        setTotalLeads(totalLeadsCount);
        setName(result);

        // result.forEach(element => {
        //   console.log(element,"========")
        //   // data.push(element);
        // });
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <Header
        addBtn={true}
        onPress={() => {
          props.navigation.navigate('Form', {callApi: getData()});
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.welcomeText}>{`Welcome, ${username} !`}</Text>
          <Text style={styles.lastUpdatedText}>
            Last updated: 5 Aug, 1:12PM
          </Text>
        </View>
        <View style={styles.dashboardCard}>
          <DashboardCard
            title={'Total Leads'}
            value={totalLeads !== null ? totalLeads : 'NA'}
            onPress={() => {
              props.navigation.navigate('AllLead');
            }}
          />
          <DashboardCard title={'Camp attended'} value={'50+'} />
        </View>
        <View style={styles.dashboardCard}>
          <DashboardCard
            title={'Active Vet Camps'}
            value={campCount !== null ? campCount : 'NA'}
          />
          <DashboardCard title={'Camp attended'} value={'80+'} />
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 30 }}>
          <Text style={styles.recentlyAddedHeading}>Recent leads added</Text>
          <TouchableOpacity
            style={styles.recentlyAddedTextContainer}
            onPress={() => {
              props.navigation.navigate('AllLead');
            }}>
            <Text style={styles.recentlyAddedText}>{name}</Text>
            <View style={styles.recentlyAddedIcon}>
              <Icon name="angle-right" size={14} color="#058cb2" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
          <Text style={styles.recentlyAddedHeading}>Recent Report</Text>
          <BarChart
            data={{
              labels: [
                '1 Jan',
                '2 Jan',
                '3 Jan',
                '4 Jan',
                '5 Jan',
                '6 Jan',
                '7 Jan',
              ],
              datasets: [
                {
                  data: [55, 45, 28, 80, 99, 80, 180],
                  colors: [
                    (opacity = 1) => '#058cb2',
                    (opacity = 1) => '#058cb2',
                    (opacity = 1) => '#058cb2',
                    (opacity = 1) => '#058cb2',
                    (opacity = 1) => '#058cb2',
                    (opacity = 1) => '#058cb2',
                    (opacity = 1) => '#058cb2',
                  ],
                },
                // ,
                // {
                //   data: [66, 55, 80, 58, 90, 43, 59]
                // }
              ],
            }}
            width={340} // from react-native
            height={270}
            withInnerLines={false}
            propsForVerticalLabels={10}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            fromZero={true}
            withCustomBarColorFromData={true}
            flatColor={true}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#f2f2f2',
              backgroundGradientTo: '#f2f2f2',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.5,

              style: {
                // borderRadius: 16
                // marginLeft: 100
              },
              propsForDots: {
                r: '0',
                strokeWidth: '0',
                stroke: 'red',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 10,
              padding: 0,
              paddingRight: 40,
              paddingTop: 25,
              paddingBottom: 50,
              marginTop: -15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Righteous-Regular',
  },
  lastUpdatedText: {
    fontSize: 13,
    color: '#989898',
  },
  dashboardCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  recentlyAddedHeading: {
    fontSize: 18,
    color: '#000000',
  },
  recentlyAddedTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#058cb2',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  recentlyAddedText: {
    fontSize: 16,
    color: '#ffffff',
  },
  recentlyAddedIcon: {
    width: 25,
    height: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  icon: {
    width: '100%',
    height: 180,
    marginVertical: 8,
    elevation: 5,
  },
});
