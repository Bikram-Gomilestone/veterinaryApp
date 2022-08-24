import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ViewDetails = (props) => {
  const navigation = useNavigation();
  // console.log("view details", props.data.images);
  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <Header addBtn={false} hide={true} goBack={() => props.route.params.navigation.pop()}/>
      <ScrollView style={{ marginHorizontal: 10, }} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainHeading}>Farmer Details</Text>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 140, marginRight: 10, }}>
            <Text style={styles.modalText}>Name</Text>
            <Text style={styles.modalText}>:</Text>
          </View>
          <Text style={styles.modalSubText}>{props.route.params.data.farmer.farmerName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 140, marginRight: 10, }}>
            <Text style={styles.modalText}>Mobile Number</Text>
            <Text style={styles.modalText}>:</Text>
          </View>
          <Text style={styles.modalSubText}>{props.route.params.data.farmer.farmerContact}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 140, marginRight: 10, }}>
            <Text style={styles.modalText}>Vet Camp Name</Text>
            <Text style={styles.modalText}>:</Text>
          </View>
          <Text style={styles.modalSubText}>{props.route.params.data.camp.campName}</Text>
        </View>
        {props.route.params.data.details.map((item, index) => {
          return (

            <View style={{}}>

              {props.route.params.data.details.length > 1 && <Text>{`${index + 1} )`}</Text>}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 140, marginRight: 10, }}>
                  <Text style={styles.modalText}>Cattle Name</Text>
                  <Text style={styles.modalText}>:</Text>
                </View>
                <Text style={styles.modalSubText}>{item.cattleTypeId.typeName}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 140, marginRight: 10, }}>
                  <Text style={styles.modalText}>Breed Name</Text>
                  <Text style={styles.modalText}>:</Text>
                </View>
                <Text style={styles.modalSubText}>{item.cattleBreedId.categoryName}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, justifyContent: 'flex-start' }}>
                {item.images.split('[')[1].split(']')[0].split(',').map((e) => {
                  if (e !== null && e !== undefined && e !== '') {
                    return (
                      <TouchableOpacity onPress={() => props.route.params.navigation.navigate('FullImageView', { url: e })}>
                        <Image
                          source={{ uri: `${e}` }}
                          style={{ width: 100, height: 100, marginBottom: 13, marginRight: 13, borderRadius: 10, }}
                        />
                      </TouchableOpacity>
                    )
                  }
                })}
              </View>
            </View>
          )
        })}
        <TouchableOpacity style={styles.addLeadBtn} onPress={() => props.route.params.navigation.navigate('Dashboard')}>
          <Text style={styles.btnText}>
            <Icon name="home" size={14} color="#FFFFFF" style={{ marginRight: 10 }} /> Go To Dashboard
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default ViewDetails

const styles = StyleSheet.create({
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
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },

  modalSubText: {
    fontSize: 16,
    color: '#000000'
  },

  mainHeading: {
    fontSize: 24,
    color: '#000000',
    paddingVertical: 20,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  addLeadBtn: {
    borderWidth: 0,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#058cb2',
    backgroundColor: "#058cb2",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },


})