import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Pressable, FlatList, StatusBar, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import CheckBox from '@react-native-community/checkbox';
import ViewDetails from '../screens/ViewDetails';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';

// import CheckBoxList from 'rn-checkbox-list';
// import CheckBox from 'react-native-check-box'

let allData = [{ id: 1, name: 'Green Book' }, { id: 2, name: 'Bohemian Rhapsody' }];;
const AllleadCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState('');
  const [markItem, setMarkItem] = useState(false)
  const [reRender, setReRender] = useState(false);
  const [data, setData] = useState(props.data);
  const [clearMark, setClearMark] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHideMark, setShowHide] = useState(false);
  const [render, setRender] = useState(Math.random());

  const handleViewDetails = (item) => {
    props.data.map((e) => {
      if (e._id === item._id) {
        setUserData(item)
      }
    })
    setShowModal(true)
  }


  useEffect(() => {
    // {console.log("props.data =====>",props.data.farmers);}
    setData(props.data)
    setClearMark(props.clearMark)
    setTimeout(() => {
      setReRender(false);
      setReRender(true);
      setReRender(false);
    }, 200);
  }, [props.data, props.clearMark])


  const handleCheckboxItem = (item) => {
    let propsData = props.data
    const index = propsData.findIndex(x => x._id === item)
    propsData[index].isChecked = !propsData[index].isChecked

    setData(propsData)
    props.handleclicked(propsData);

  }

  const handleMarkPresent = async (item) => {
    let attData = {
      "farmerId": `${item.item.farmer._id}`,
      "campId": `${item.item.camp._id}`
    }
    let payload = {
      "farmer": [attData]
    }
    await axios
      .post('http://206.189.129.191/backend/api/v1/attendance', payload)
      .then(function (response) {
        let result = response.data.meta.message;
        alert(result)
        props.getData()
      })
      .catch(function (error) {
        console.log('Error ===> ', error);
      });
  }

  const handleMarkAbsent = async (item) => {
    // alert(JSON.stringify(item.item._id))
    let payload = {
      "farmer": `${item.item._id}`
    }
    alert(JSON.stringify(payload))
    // await axios
    //   .post('http://206.189.129.191/backend/api/v1/attendance', payload)
    //   .then(function (response) {
    //     let result = response.data.meta.message;
    //     alert(result)
    //     // arrayOfIds = [];
    //     // setIsPresent('')
    //     // setClearMark(true)
    //   })
    //   .catch(function (error) {
    //     console.log('Error ===> ', error);
    //   });
  }

  return (
    <ScrollView key={render} style={{ marginTop: 15 }}>
      <FlatList
        data={data}
        renderItem={(item, index) => {
          return (
            <View style={styles.leadsContainer}>
              <View style={styles.leadsContainer1}>
                <Checkbox
                  status={item.item.isChecked ? 'checked' : 'unchecked'}
                  // status={clearMark === true ? 'unchecked' : item.item.isChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setMarkItem(!markItem);
                    handleCheckboxItem(item.item._id)
                  }}
                />
              </View>
              <View style={styles.leadsContainer2}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.nameText}>
                    {item.item.farmer.farmerName}
                  </Text>
                  {item.item.isPresent === true ?
                    <TouchableOpacity
                      // onPress={() => handleMarkPresent(item)}
                      style={styles.Iconchecked}>
                      <Icon
                        name="check"
                        size={14}
                        color="#fff"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    : null}
                </View>

                <Text
                  style={styles.phoneText}>
                  {item.item.farmer.farmerContact}
                </Text>
                <Text style={styles.companyText}>
                  {item.item.camp.campName}
                </Text>
              </View>
              <View style={styles.leadsContainer3}>
                {item.item.isPresent === false ?

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => handleMarkPresent(item)}
                      style={styles.Iconchecked}>
                      <Icon
                        name="check"
                        size={14}
                        color="#fff"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() => handleMarkAbsent(item)}
                      style={{
                        height: 16,
                        width: 16,
                        backgroundColor: '#ff0000',
                        marginLeft: 12,
                      }}>
                      <AntDesign
                        name="close"
                        size={14}
                        color="#fff"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  :
                  null
                }
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('ViewDetails', { data: item.item, navigation: props.navigation })}
                  // onPress={() => alert(JSON.stringify(item.item))}
                  style={{ backgroundColor: '#058cb2', display: 'flex', flexDirection: 'row', width: 100, alignItems: 'center', justifyContent: 'space-between', height: 25, marginTop: 10, paddingHorizontal: 10, borderRadius: 5, }}
                >
                  <Text style={styles.viewDetail}>
                    {'View details'}
                  </Text>
                  <Icons name="angle-right" size={14} color="#ffffff" />
                </TouchableOpacity>
                {/* <Modal
                    animationType="none"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                      setShowModal(!showModal);
                    }}
                  >
                    <ViewDetails data={userData}  goBack={() => { setShowModal(!showModal);}} />
                  </Modal> */}
              </View>
            </View>
          )

        }}
        keyExtractor={item => item._id}
      />
    </ScrollView>
  );
};

export default AllleadCard;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 25,
    marginBottom: 7,
    justifyContent: 'space-between',
  },

  leadsContainer: {
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  leadsContainer1: {
    flex: 1,
    justifyContent: 'center',
  },

  leadsContainer2: {
    flex: 4,
  },

  leadsContainer3: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkBox: {
    width: 20,
    height: 20,
    marginRight: 12
  },
  nameText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 24,
    paddingRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',

    marginRight: 10
  },
  Iconchecked: {
    height: 16,
    width: 16,
    backgroundColor: '#00c946'
  },
  icon: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
  },
  phoneText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 24,
  },
  flex_1_center: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  companyText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 24,
  },
  viewDetail: {
    fontSize: 12,
    color: '#ffffff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
