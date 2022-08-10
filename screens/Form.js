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
let imageUri =[];
const options = {
  title: 'Select',
  quality: 0.2,
  includeBase64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Data = [
  {
    name: 'Cattle Type',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Rahul Sagar',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Sid',
    phoneNumber: '1234567890',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Bikram',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Manish',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Rahul Sagar',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Sid',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Rahul Sagar',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Sid',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Bikram',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Manish',
    phoneNumber: '9512346567',
    companyName: 'VET camp-Singhpura',
  },
  {
    name: 'Rahul Sagar',
    phoneNumber: '9501736242',
    companyName: 'VET camp-Singhpura',
  },
];

const Form = props => {
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [cattleType, setCattleType] = useState([]);
  const [cattleBreed, setCattleBreed] = useState([]);
  const [campName, setCampName] = useState([]);
  const [reRender,setReRender] = useState(false);

  const [selectedCampName, setSelectedCampName] = useState(null);
  const [selectCattleType, setSelectCattleType] = useState(null);
  const [selectCattleBreed, setSelectCattleBreed] = useState(null);

  const [isUploaded, setIsUploaded] = useState(false);

  const [base64, setBase64] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [base64Array, setBase64Array] = useState([]);
  const [uploadImageUrl, setUploadImageUrl] = useState([]);

  useEffect(() => {
    getCattleType();
    getCattleBreed();
    getCampName();
  }, []);

  useEffect(() => {
    getCattleType();
    getCattleBreed();
    getCampName();
  }, [base64Array]);

  const getCattleType = async () => {
    let cattleType = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/cattleCategoriesType')
      .then(function (response) {
        let result = response.data.data.categoriestype;
        result.forEach(element => {
          cattleType.push(element.typeName);
        });
        setCattleType(cattleType);
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  };
  const getCattleBreed = async () => {
    let cattleBreed = [];
    await axios
      .get('http://206.189.129.191/backend/api/v1/cattleCategories')
      .then(function (response) {
        let result = response.data.data.categories;
        // console.log(JSON.stringify(result))
        result.forEach(element => {
          cattleBreed.push(element.categoryName);
        });
        setCattleBreed(cattleBreed);
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

  const launchCamera = async () => {
    try {
      const res = await ImagePicker.launchCamera(options);
      //console.log("==============>>>>",res.assets[0]);
      setBase64(res.assets[0].base64);
      setImageUrl(res.assets[0].uri);
      //let base64ArrayValue = res.assets[0].base64;
      let base64ArrayValue = res.assets[0];
      base64ArrayValue.isUploaded = false;
      val.push(base64ArrayValue);
      //   base64Array.push(base64ArrayValue);
      setBase64Array(prevState => {
        return [...prevState, res.assets[0]];
      });
      alert('Image was successfully Captured');
    } catch (error) {}
  };

  const ImageUpload = async (item) => {
    
    let data= base64Array;
    data.map(async(e, i) => {
      if(item.base64 === e.base64){
        
        let payload={
          "fileName":e.fileName,
          "base64Image": `data:image/jpeg;base64,${e.base64}`
      }
        await axios
      .post('http://206.189.129.191/backend/api/v1/uploadImage',payload)
      .then(function (response) {
       let uri = response.data.url;
        console.log(uri)
        setUploadImageUrl(prevState =>{return [...prevState,uri] });
        e.isUploaded=true;
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
     }
    })
    setBase64Array(data);
    setTimeout(() => {
      setReRender(false);
      setReRender(true);
      setReRender(false);
    }, 200);
    
  }

  const launchGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      this.handleMediaResp(response);
    });
  };
  
  const deleteImage = (item) => {
   let data= base64Array;
    data.map((e, i) => {
      if(item.base64 === e.base64){
        data.splice(i, 1);
      }
    })
    alert('Image was successfully deleted');
    setBase64Array(data);
    setTimeout(() => {
      setReRender(false);
      setReRender(true);
      setReRender(false);
    }, 200);
    
  };

  const handleSubmitButton = () => {
    if(name === null){
      alert('Please enter a name');
      return ;
    }
    if(mobileNumber === null){
      alert('Please enter a mobile Number');
      return ;
    }
    if(selectCattleType === null){
      alert('Please enter a cattle Type');
      return ;
    }
    if(selectCattleBreed === null){
      alert('Please enter a Cattle Breed');
      return ;
    }
    if(selectedCampName === null){
      alert('Please enter a Camp Name');
      return ;
    }
    if(uploadImageUrl.length <= 0){
      alert('Please upload an Image');
      return ;
    }
    console.log(uploadImageUrl)
    // let data = uploadImageUrl;
    //   data.forEach(element => {
    //     alert(element.url)
    //   });
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
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
          placeholder={'Mobile number'}
          value={mobileNumber}
          onChangeText={mobileNumber => {
            setMobileNumber(mobileNumber);
          }}
        />

        <FormDropDown
          label={'Cattle type'}
          buttonTextStyle={styles.placeholderStyle}
          data={cattleType}
          selectedValue={selectCattleType}
          onValueChange={(e, i) => setSelectCattleType(e)}
        />
        <FormDropDown
          data={cattleBreed}
          buttonTextStyle={styles.placeholderStyle}
          label={'Cattle breed'}
          selectedValue={selectCattleBreed}
          onValueChange={(e, i) => setSelectCattleBreed(e)}
        />
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
        {base64Array !== undefined && 
          base64Array.map((e, i) => {
           
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
                  {!e.isUploaded ?
                    <TouchableOpacity style={{alignItems:'flex-end',top:10,left:5,zIndex:2222}} onPress={()=> deleteImage(e)}>
                      <Text style={{position: 'relative',textAlign:'right',backgroundColor: 'red',width:16,height:16,borderRadius:8,padding:1,alignItems:'center'}}><AntDesign
                        name="close"
                        size={14}
                        color="black"
                        style={styles.icon}
                      /></Text>
                    </TouchableOpacity>
                    :null}
                    {/* <TouchableOpacity style={{alignItems:'center',zIndex:2222,position:'absolute'}} onPress={()=> deletedeleteImage(e)}>
                      <Text style={{backgroundColor: 'blue',width:80,height:16,borderRadius:8,alignItems:'center',top:55,left:48}}>
                        <AntDesign
                        name="close"
                        size={14}
                        color="black"
                       // style={styles.icon}
                      />
                      Upload
                      </Text>
                    </TouchableOpacity> */}


                    <Image
                      source={{uri: `data:image/jpeg;base64,${e.base64}`}}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <TouchableOpacity style={{borderWidth:1,width: '70%',backgroundColor:!e.isUploaded?'#4A03FF':'green',borderRadius:5,marginHorizontal:16,bottom:10}} onPress={()=>ImageUpload(e)}>
                     <Text style={{textAlign: 'center',fontSize:14,color:'#fff'}}>{!e.isUploaded?'Upload':'done'}</Text>
                  </TouchableOpacity>
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
