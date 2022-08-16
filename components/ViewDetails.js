import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ViewDetails = (props) => {
  // console.log("view details", props.data.images);
  return (
    <View style={[styles.centeredView, { height: 200 + StatusBar.currentHeight }]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.modalText}>Name : </Text>
        <Text style={styles.modalText}>{props.data.farmer_name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.modalText}>Mobile Number :</Text>
        <Text style={styles.modalText}>{props.data.farmer_contact}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.modalText}>Vet Camp Name :</Text>
        <Text style={styles.modalText}>{props.data.camp_name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.modalText}>Cattle Name :</Text>
        <Text style={styles.modalText}>{props.data.cattle_type}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.modalText}>Breed Name :</Text>
        <Text style={styles.modalText}>{props.data.cattle_breed}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row' }}>
          {props.data.images.split('[')[1].split(']')[0].split(',').map((e) => {
            if (e !== null && e !== undefined && e !== '') {
              return (
                <Image
                  source={{ uri: `${e}` }}
                  style={{ width: 330, height: 250, marginHorizontal: 15, marginBottom: 15 }}
                />
              )
            } else {
              return <Text style={{ fontSize: 30, color: 'red', marginTop: 35, paddingLeft: 30 }}>No Images Uploaded</Text>
            }
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default ViewDetails

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 55
  },
  modalView: {
    // margin: 20,
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
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: 'bold',
  }

})