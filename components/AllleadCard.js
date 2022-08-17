import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Pressable, FlatList, StatusBar, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import CheckBox from '@react-native-community/checkbox';
import ViewDetails from './ViewDetails';
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
    // let newData = data
    // newData.map((e) => {
    //   if (e._id === item.item._id) {
    //     e.isPresent = true
    //   }
    // })
    // setData([])
    // setRender(Math.random())
    // setData(newData)
    let payload = {
      "farmer": [`${item.item._id}`]
    }
    await axios
      .post('http://206.189.129.191/backend/api/v1/attendance', payload)
      .then(function (response) {
        let result = response.data.meta.message;
        alert(result)
        let newData = data
        newData.map((e) => {
          if (e._id === item.item._id) {
            e.isPresent = true
          }
        })
        setData([])
        setRender(Math.random())
        setData(newData)
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
    <ScrollView key={render} style={{marginBottom:20}}>
      <FlatList
        data={data}
        renderItem={(item, index) => {
          return (
            <>
              <View View style={styles.topContainer}>
                <View style={{ flexDirection: 'row', marginBottom: -20, }}>
                  <Checkbox
                    status={item.item.isChecked ? 'checked' : 'unchecked'}
                    // status={clearMark === true ? 'unchecked' : item.item.isChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setMarkItem(!markItem);
                      handleCheckboxItem(item.item._id)
                    }}
                  />

                  <Text style={styles.nameText}>
                    {item.item.farmer_name}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  {item.item.isPresent === false ?
                    <>
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
                    </>
                    :
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
                  }
                </View>
              </View>
              <View style={{ marginLeft: 45 }}>
                <Text
                  style={styles.phoneText}>
                  {item.item.farmer_contact}
                </Text>
                <View style={styles.flex_1_center}>
                  <Text style={styles.companyText}>
                    {item.item.camp_name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleViewDetails(item.item)}
                  >
                    <Text style={styles.viewDetail}>
                      {'View details'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Modal
                  animationType="none"
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <ViewDetails data={userData} />
                </Modal>
              </View>
            </>
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 7,
    justifyContent: 'space-between'
  },
  checkBox: {
    width: 20,
    height: 20,
    marginRight: 12
  },
  nameText: {
    fontSize: 14,
    marginLeft: 2,
    color: '#000'
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
    marginLeft: 10,
    color: '#000',
    marginBottom: 7,
  },
  flex_1_center: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  companyText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#000'
  },
  viewDetail: {
    fontSize: 14,
    marginRight: 35,
    color: '#2E4CFF'
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
