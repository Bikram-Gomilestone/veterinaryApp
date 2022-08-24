import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const FullImageView = (props) => {
  return (
    <>
      <TouchableOpacity style={{ zIndex: 1 }} onPress={() => { props.navigation.pop()}}>
        <AntDesign
          name="close"
          size={34}
          color="red"
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
        <Image
          source={{ uri: `${props.route.params.url}` }}
          style={{ width: '95%', height: '95%', borderRadius: 10, resizeMode: 'cover' }}
        />
      </View>
    </>
  )
}

export default FullImageView

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
  }
})