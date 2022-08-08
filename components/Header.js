import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';

const Header = (props) => {
  return (
    <View style={styles.topContainer}>
    <Image source={require('../assets/mainlogo.png')} style={styles.icon} />
    {props.addBtn ?
    <TouchableOpacity style={styles.addLeadBtn} onPress={props.onPress}>
      <Text style={styles.btnText}>
        <Icon name="plus" size={14} color="#2E4CFF" /> Add Lead
      </Text>
    </TouchableOpacity>
    :null
    }
  </View>
  )
}

export default Header

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
      icon: {
        width: 40,
        height: 40,
        marginVertical: 8,
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
      btnText: {
        color: '#2E4CFF',
        fontSize: 18,
      },
})