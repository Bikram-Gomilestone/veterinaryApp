import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';

import FormDropDown from '../components/FormDropDown';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';

let val = [];
let OfflineImageArray = [];
const options = {
  title: 'Select',
  quality: 0.2,
  includeBase64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

let pendingImages = [];
let FarmerInfoData = [];

const Form = props => {
  const [isFocus, setIsFocus] = useState(false);
  const [network, setNetwork] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState(false);
  const [netAvailable, setNetAvailable] = useState(false);
  const [formuid, setFormuid] = useState(Math.random());
  const [name, setName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);

  const [localBreedChoice, setLocalBreedChoice] = useState([]);
  const [localCattleChoice, setLocalCattleChoice] = useState([]);
  const [localCampChoice, setLocalCampChoice] = useState([]);

  const [cattleType, setCattleType] = useState([]);
  const [cattleBreed, setCattleBreed] = useState([]);
  const [campName, setCampName] = useState([]);

  const [reRender, setReRender] = useState(false);

  const [selectedCampName, setSelectedCampName] = useState(null);
  const [selectCattleType, setSelectCattleType] = useState(null);
  const [selectCattleBreed, setSelectCattleBreed] = useState(null);

  const [isUploaded, setIsUploaded] = useState(false);

  const [offlineImages, setOfflineImages] = useState([]);

  const [base64, setBase64] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [base64Array, setBase64Array] = useState([]);
  const [uploadImageUrl, setUploadImageUrl] = useState([]);
  const [pandingImage, setPandingImage] = useState([]);
  const [pandingImageUrl, setPandingImageUrl] = useState([]);
  const [farmerPendingInfo, setFarmerPendingInfo] = useState([]);
  const [showOfflineImg, setShowOfflineImg] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getCattleType();
    getCattleBreed();
    getCampName();
    // checkData();
  }, []);

  // useEffect(() => {
  //   getCattleType();
  //   getCattleBreed();
  //   getCampName();
  // }, [base64Array]);
  // const checkData = async () => {
  //   let farmerData = await AsyncStorage.getItem('FarmerData');
  //   console.log(
  //     farmerData,
  //     "let farmerData = await AsyncStorage.getItem('FarmerData');",
  //   );
    
  // };

  useEffect(() => {
    setInterval(() => {
      handleStatus();
    }, 2000);
    if (network) {
      // console.log('network back');
      checkInternetAvailability();
    } else {
      checkInternetAvailability();
      AsyncStorage.getItem('CattleBreed').then(result => {
        let breedChoice = JSON.parse(result);
        setLocalBreedChoice(breedChoice);
      });
      AsyncStorage.getItem('cattleType').then(result => {
        let cattleTypeChoice = JSON.parse(result);
        setLocalCattleChoice(cattleTypeChoice);
      });
      AsyncStorage.getItem('camps').then(result => {
        let campChoice = JSON.parse(result);
        setLocalCampChoice(campChoice);
      });
      // getPendingImageData();
    }
  }, [network]);

  // useEffect(() => {
  //   if (network) {
  //     getPendingData();
  //   }
  // }, [category]);

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
        console.log('response');
        // handle success
        setStatus(true);
        setNetAvailable(true);
        if (response.status === 200) {
          setNetAvailable(true);
          sendPendingImageData();
          //pendingDataPost();
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

  const getCattleBreed = async () => {
    let cattleBreed = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/cattleCategoriesType')
      .then(function (response) {
        let result = response.data.data.categoriestype;
        result.forEach(element => {
          cattleBreed.push(element.typeName);
        });
        setCattleBreed(cattleBreed);
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };
  const getCattleType = async () => {
    let cattleType = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/cattleCategories')

      .then(function (response) {
        let result = response.data.data.categories;
        // console.log(JSON.stringify(result))
        result.forEach(element => {
          cattleType.push(element.categoryName);
        });
        setCattleType(cattleType);
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };
  const getCampName = async () => {
    let campName = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/camps')
      .then(function (response) {
        let result = response.data.data.camps;
        // console.log(JSON.stringify(result));
        result.forEach(element => {
          campName.push(element.campName);
        });
        setCampName(campName);
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };

  // const getPendingImageData = async () => {
  //   let images = await AsyncStorage.getItem('pendingImage');
  //   if (images !== null && images !== undefined) {
  //     AsyncStorage.getItem('pendingImage').then(value => {
  //       let data = JSON.parse(value);
  //       AsyncStorage.setItem('pendingImage', JSON.stringify(data));
  //       console.log(data, 'get pending image data');

  //       setOfflineImages(data);
  //     });
  //   }
  // };

  // const handleOfflineData = async uniqueUrlArray => {
  //   console.log(uniqueUrlArray);
  //   let setUrl = uniqueUrlArray;
  //   //   let imagesUrl = unique
  //   let promiseArray = [];
  //   let payload = [];
  //   let urlArray = [];
  //   let PendingImages = await AsyncStorage.getItem('pendingImage');
  //   console.log(pendingImages, 'pending images');
  //   let farmerData = await AsyncStorage.getItem('FarmerData');
  //   console.log(farmerData, 'farmerData');
  //   if (
  //     PendingImages !== null &&
  //     PendingImages !== undefined &&
  //     farmerData !== undefined &&
  //     farmerData !== null
  //   ) {
  //     let farmerinfo = JSON.parse(farmerData);
  //     let imageData = JSON.parse(PendingImages);
  //     setUrl.forEach(element => {
  //       farmerinfo.forEach((item, key) => {
  //         if (element.farmerContact === item.farmerContact) {
  //           let url = `http://206.189.129.191/${element.url}`;

  //           // urlArray.length === 0 && urlArray.push(url);

  //           // urlArray.length >= 1 &&
  //           //   urlArray?.map(e => {
  //           //     alert(e);
  //           //     if (e != url) {
  //           //       urlArray.push(url);
  //           //     }
  //           //   });
  //           let pendingForm = {
  //             farmerName: item.farmerName,
  //             farmerContact: item.farmerContact,
  //             cattleType: item.cattleType,
  //             cattleBreed: item.cattleBreed,
  //             campName: item.campName,
  //             imagesUrl: JSON.stringify([url]).replaceAll('"', ''),
  //           };
  //           payload.push(pendingForm);
  //           console.log(payload.length, 'pandingImageUrl');
  //         }
  //       });
  //     });
  //     console.log(payload, '<=====payload');
  //     console.log(urlArray, '<=====urlArray');

  //     //  axios.post(
  //     //         'http://206.189.129.191/backend/api/v1/storefarmerdetails',
  //     //         payload,
  //     //       )
  //     //       .then((res)=>{
  //     //         if(res !== null ){
  //     //           console.log("response",res);
  //     //           if(payload.length > 0){
  //     //             console.log(payload,"after")
  //     //             AsyncStorage.removeItem('FarmerData');
  //     //             AsyncStorage.removeItem('pendingImage', () => {
  //     //               alert('Pending Data Send')
  //     //             });
  //     //           }
  //     //         }
  //     //       })
  //     //        .catch((err)=>{console.log(err)})
  //   }
  //   // promiseArray.push(apiRequest);
  //   // if(payload.length >= 0){
  //   //   payload.forEach(element => {
  //   //     let farmerData = [element]
  //   //     console.log(farmerData,"farmerData");
  //   //     var apiRequest = axios.post(
  //   //         'http://206.189.129.191/backend/api/v1/storefarmerdetails',
  //   //         farmerData,
  //   //       );
  //   //       promiseArray.push(apiRequest);
  //   //    });
  //   //   Promise.all(promiseArray)
  //   //  .then((res)=>{
  //   //   if(res !== null ){
  //   //     console.log("response",res);
  //   //     if(payload.length > 0){
  //   //       console.log(payload,"after")
  //   //       AsyncStorage.removeItem('FarmerData');
  //   //       AsyncStorage.removeItem('pendingImage', () => {
  //   //         alert('Pending Data Send')
  //   //       });
  //   //     }
  //   //   }
  //   // })
  //   //  .catch((err)=>{console.log(err)})
  //   //  }
  // };
  const getImageURL = async (payload, uid, farmerinfo) => {
    let apiRequest = await axios.post(
      'http://206.189.129.191/backend/api/v1/uploadImage',
      payload,
    );
    let tmp = `http://206.189.129.191/${apiRequest.data.url}`;
    return {url: tmp, payload, uid, farmerinfo};
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
            // console.log(element, 'element');
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
          // console.log('all done ........',res);
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
          cattleType: x.cattleType,
          cattleBreed: x.cattleBreed,
          campName: x.campName,
          imagesUrl: JSON.stringify(x.imageUrl).replace(/[" "]/g, ''),
        };
        payload.push(pendingForm);
      });
      console.log('Ready to upload ....', payload);
      setIsUploading(true);
      await axios
        .post(
          'http://206.189.129.191/backend/api/v1/storefarmerdetails',
          payload,
        )
        .then(res => {
          if (res !== null) {
            // console.log("response",res);
            if(payload.length > 0){
            console.log(payload, 'after');
            AsyncStorage.removeItem('FarmerData', () => {
              FarmerInfoData=[];
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

  // const getPendingFarmerInfo = async () => {
  //   let farmerData = await AsyncStorage.getItem('FarmerData');
  //   if (farmerData !== null && farmerData !== undefined) {
  //     AsyncStorage.getItem('FarmerData').then(value => {
  //       let data = JSON.parse(value);
  //       AsyncStorage.setItem('FarmerData', JSON.stringify(data));
  //       console.log(data, 'get farmer data');
  //       setFarmerPendingInfo(data);
  //       // setName('');
  //       // setModel('');
  //       // setPrice('');
  //       // setBase64('');
  //     });
  //   }
  // };

  const launchCamera = async () => {
    try {
      const res = await ImagePicker.launchCamera(options);
      setBase64(res.assets[0].base64);
      setImageUrl(res.assets[0].uri);
      let base64ArrayValue = res.assets[0].base64;

      val.push(base64ArrayValue);
      //   base64Array.push(base64ArrayValue);
      setBase64Array(prevState => {
        return [...prevState, res.assets[0].base64];
      });
      if (network) {
        let payload = {
          fileName: res.assets[0].fileName,
          base64Image: `data:image/jpeg;base64,${res.assets[0].base64}`,
        };
        await axios
          .post('http://206.189.129.191/backend/api/v1/uploadImage', payload)
          .then(function (response) {
            let baseurl = 'http://206.189.129.191/';
            let uri = baseurl + response.data.url;
            // let urilength=newuri.length;
            //   let uri=newuri.slice(0,urilength)
            //  console.log("newuri "+ uri);
            //  let pvalue=uploadImageUrl;
            //  pvalue.push(uri);
            //   setUploadImageUrl(pvalue);
            setUploadImageUrl(prevState => {
              return [...prevState, uri];
            });
          })
          .catch(function (error) {
            console.log('Error ===> ', error);
          });
      } else {
        let OfflineImage = res.assets[0];
        OfflineImage.farmer_contact = mobileNumber;
        OfflineImageArray.push(OfflineImage);

        setOfflineImages(prevState => {
          return [...prevState, res.assets[0]];
        });

        setShowOfflineImg(prevState => {
          return [...prevState, res.assets[0]];
        });
      }

      alert('Image was successfully Captured');
    } catch (error) {}
  };

  const launchGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      this.handleMediaResp(response);
    });
  };

  const deleteImage = item => {
    if (netAvailable) {
      let data = uploadImageUrl;
      data.map((e, i) => {
        if (item === e) {
          data.splice(i, 1);
        }
      });
      alert('Image was successfully deleted');
      setUploadImageUrl(data);
      setTimeout(() => {
        setReRender(false);
        setReRender(true);
        setReRender(false);
      }, 200);
    } else {
      let data = offlineImages;
      data.map((e, i) => {
        if (item.base64 === e.base64) {
          data.splice(i, 1);
        }
      });
      alert('Image was successfully deleted');
      setOfflineImages(data);
      setTimeout(() => {
        setReRender(false);
        setReRender(true);
        setReRender(false);
      }, 200);
    }
  };

  const savePendingImages_task = async (offlineImages, formuid) => {
    let previousImages = await AsyncStorage.getItem('pendingImage');
    if (previousImages) {
      previousImages = JSON.parse(previousImages);
      let obj = {
        formuid,
        images: offlineImages,
      };
      previousImages.push(obj);
    } else {
      previousImages = [];
      let obj = {
        formuid,
        images: offlineImages,
      };
      previousImages.push(obj);
    }
    AsyncStorage.setItem('pendingImage', JSON.stringify(previousImages));
    console.log('ALL IMAGES PENDING', previousImages);
  };

  const SaveOfflineData = (farmerData, offlineImages) => {
    offlineImages.forEach(x => {
      x.uid = formuid;
    });
    AsyncStorage.setItem('FarmerData', JSON.stringify(farmerData));
    //getPendingFarmerInfo();
    savePendingImages_task(offlineImages, formuid);
    // getPendingImageData();
    setName(null);
    setMobileNumber(null);
    setSelectedCampName(null);
    setSelectCattleType(null);
    setSelectCattleBreed(null);
    setShowOfflineImg([]);
    setOfflineImages([]);
    setFormuid(Math.random());
    alert('network Unavailable form stored in storage');
  };

  const handleSubmitButton = () => {
    if (name === null) {
      alert('Please enter a name');
      return;
    }
    if (mobileNumber === null) {
      alert('Please enter a mobile Number');
      return;
    }
    if (selectCattleType === null) {
      alert('Please enter a cattle Type');
      return;
    }
    if (selectCattleBreed === null) {
      alert('Please enter a Cattle Breed');
      return;
    }
    if (selectedCampName === null) {
      alert('Please enter a Camp Name');
      return;
    }
    if (network) {
      if (uploadImageUrl.length <= 0) {
        alert('Please upload an Image');
        return;
      }
    } else {
      if (offlineImages.length <= 0) {
        alert('Please upload an Image');
        return;
      }
    }

    //console.log(farmerData, 'data before');

    FarmerInfoData.push({
      farmerName: name,
      farmerContact: mobileNumber,
      cattleType: selectCattleType,
      cattleBreed: selectCattleBreed,
      campName: selectedCampName,
      formuid,
    });

    // console.log(farmerData, 'data after');

    if (!network) {
      SaveOfflineData(FarmerInfoData, offlineImages);
    } else {
      let agentDetails = [
        {
          farmerName: name,
          farmerContact: mobileNumber,
          cattleType: selectCattleType,
          cattleBreed: selectCattleBreed,
          campName: selectedCampName,
          imagesUrl: JSON.stringify(uploadImageUrl).replace(/[" "]/g, ''),
        },
      ];
      console.log(agentDetails, 'agentDetails');

      axios
        .post(
          'http://206.189.129.191/backend/api/v1/storefarmerdetails',
          agentDetails,
        )
        .then(function (response) {
          alert('Form Uploaded successfully');
          setName(null);
          setMobileNumber(null);
          setSelectedCampName(null);
          setSelectCattleType(null);
          setSelectCattleBreed(null);
          setUploadImageUrl([]);
          setFormuid(Math.random());

          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      {/* {console.log(farmerPendingInfo,"farmerPendingInfo")}
      {console.log(offlineImages,"pandingImageUrl")} */}
      <Header />
      <View style={{marginLeft: 20, marginRight: 33}}>
        <Text style={{fontSize: 14, color: '#4A03FF', marginBottom: 20}}>
          Please enter all the information of the farmer
        </Text>
        <TextInput
          style={styles.textInputBox}
          placeholder={'Enter name'}
          value={name}
          onChangeText={name => {
            setName(name);
          }}
        />
        <TextInput
          style={styles.textInputBox}
          keyboardType={'number-pad'}
          placeholder={'Mobile number'}
          value={mobileNumber}
          onChangeText={mobileNumber => {
            setMobileNumber(mobileNumber);
          }}
        />
        {netAvailable ? (
          <FormDropDown
            label={'Cattle type'}
            buttonTextStyle={styles.placeholderStyle}
            data={cattleType}
            selectedValue={selectCattleType}
            onValueChange={(e, i) => setSelectCattleType(e)}
          />
        ) : (
          <FormDropDown
            label={'Cattle type'}
            buttonTextStyle={styles.placeholderStyle}
            data={localCattleChoice}
            selectedValue={selectCattleType}
            onValueChange={(e, i) => setSelectCattleType(e)}
          />
        )}
        {netAvailable ? (
          <FormDropDown
            data={cattleBreed}
            buttonTextStyle={styles.placeholderStyle}
            label={'Cattle breed'}
            selectedValue={selectCattleBreed}
            onValueChange={(e, i) => setSelectCattleBreed(e)}
          />
        ) : (
          <FormDropDown
            data={localBreedChoice}
            buttonTextStyle={styles.placeholderStyle}
            label={'Cattle breed'}
            selectedValue={selectCattleBreed}
            onValueChange={(e, i) => setSelectCattleBreed(e)}
          />
        )}
        {netAvailable ? (
          <FormDropDown
            data={campName}
            buttonTextStyle={
              selectedCampName !== null
                ? styles.campNamePlaceholderStyle
                : styles.placeholderStyle
            }
            label={'Camp name'}
            selectedValue={selectedCampName}
            onValueChange={(e, i) => {
              setSelectedCampName(e);
            }}
          />
        ) : (
          <FormDropDown
            data={localCampChoice}
            buttonTextStyle={
              selectedCampName !== null
                ? styles.campNamePlaceholderStyle
                : styles.placeholderStyle
            }
            label={'Camp name'}
            selectedValue={selectedCampName}
            onValueChange={(e, i) => {
              setSelectedCampName(e);
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 33,
          marginTop: 25,
        }}>
        <Text style={{fontSize: 14, color: '#4A03FF', fontWeight: 'bold'}}>
          Upload images
        </Text>
        <TouchableOpacity
          style={styles.addLeadBtn}
          onPress={() => {
            launchCamera();
          }}>
          <Text style={styles.btnText}>
            <Icon name="plus" size={14} color="#2E4CFF" /> Add image
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        {network
          ? uploadImageUrl !== undefined &&
            uploadImageUrl.map((e, i) => {
              // console.log('==============>>>>', e);
              return (
                <>
                  <View
                    style={{
                      width: 108,
                      height: 76,
                      marginTop: 24,
                      marginLeft: 20,
                    }}>
                    <View style={{position: 'relative'}}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'flex-end',
                          top: 10,
                          left: 5,
                          zIndex: 2222,
                        }}
                        onPress={() => deleteImage(e)}>
                        <Text
                          style={{
                            position: 'relative',
                            textAlign: 'right',
                            backgroundColor: 'red',
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            padding: 1,
                            alignItems: 'center',
                          }}>
                          <AntDesign
                            name="close"
                            size={14}
                            color="black"
                            style={styles.icon}
                          />
                        </Text>
                      </TouchableOpacity>

                      <Image
                        source={{uri: e}}
                        //source={{uri: 'http://206.189.129.191/images/rn_image_picker_lib_temp_9ea27a20-c7b7-46aa-b7db-ed7cf4c382d9.jpg.jpeg'}}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                  </View>
                </>
              );
            })
          : offlineImages !== undefined &&
            offlineImages !== null &&
            offlineImages !== undefined &&
            offlineImages.length > 0 &&
            offlineImages.map((e, i) => {
              return (
                <>
                  <View
                    style={{
                      width: 108,
                      height: 76,
                      marginTop: 24,
                      marginLeft: 20,
                    }}>
                    <View style={{position: 'relative'}}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'flex-end',
                          top: 10,
                          left: 5,
                          zIndex: 2222,
                        }}
                        onPress={() => deleteImage(e)}>
                        <Text
                          style={{
                            position: 'relative',
                            textAlign: 'right',
                            backgroundColor: 'red',
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            padding: 1,
                            alignItems: 'center',
                          }}>
                          <AntDesign
                            name="close"
                            size={14}
                            color="black"
                            style={styles.icon}
                          />
                        </Text>
                      </TouchableOpacity>

                      <Image
                        source={{uri: `data:image/jpeg;base64,${e.base64}`}}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                  </View>
                </>
              );
            })}
      </View>
      <View style={{alignItems: 'center', marginVertical: 40}}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            handleSubmitButton();
          }}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  textInputBox: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    fontSize: 14,
    color: '#000000',
    paddingLeft: 22,
    paddingVertical: 4,
    marginBottom: 12,
  },
  addLeadBtn: {
    borderWidth: 1,
    width: 85,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2E4CFF',
    borderRadius: 5,
  },
  btnText: {
    color: '#2E4CFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  submitBtnText: {
    color: '#fff',
  },
  submitBtn: {
    borderWidth: 1,
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2E4CFF',
    borderRadius: 5,
    backgroundColor: '#2E4CFF',
  },
  placeholderStyle: {
    fontSize: 14,
    padding: 0,
    paddingVertical: 4,
    color: '#000000',
    left: 110,
  },
  campNamePlaceholderStyle: {
    fontSize: 14,
    padding: 0,
    paddingVertical: 4,
    color: '#000000',
    left: 80,
  },
  icon: {
    position: 'absolute',
    right: 1,
    top: 2,
    zIndex: 999,
  },
});
