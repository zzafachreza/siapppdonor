import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'menu').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 8,
            color: colors.secondary,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background,
      position: 'relative'
    }}>






      {/* header */}
      <Image source={require('../../assets/top.png')} style={{
        width: '100%',
        height: 50,
        resizeMode: 'cover'
      }} />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
      }}>

        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 15,
            color: colors.white
          }}>Selamat datang,  </Text>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 15,
            color: colors.white
          }}>{user.nama_lengkap}</Text>
        </View>
        <Image source={require('../../assets/icon.png')} style={{
          width: 60,
          height: 60,
        }} />
      </View>
      {/* header */}

      <MyCarouser />
      <View style={{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Icon type='ionicon' name='menu' color={colors.primary} />
        <Text style={{
          left: 5,
          color: colors.primary,
          fontFamily: fonts.secondary[800],
          fontSize: windowWidth / 25
        }}>Menu</Text>
        <View style={{
          borderWidth: 1,
          marginTop: 5,
          width: windowWidth / 3,
          borderColor: colors.primary,
          marginLeft: 10,
        }} />
      </View>
      <View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'space-around'

      }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pendonor', user)}>
          <View style={{
            flex: 1,
            marginVertical: 10,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Image source={require('../../assets/a1.png')} style={{
              width: windowWidth / 5,
              height: windowWidth / 5,
              resizeMode: 'contain'
            }} />
            <Text style={{
              flex: 1,
              textAlign: 'center',
              color: colors.white,
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 14
            }}>Pendonor</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Caridarah', user)}>
          <View style={{
            flex: 1,
            marginVertical: 10,
            padding: 10,
            backgroundColor: colors.secondary,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
          }}>
            <Image source={require('../../assets/a2.png')} style={{
              width: windowWidth / 5,
              height: windowWidth / 5,
              resizeMode: 'contain'
            }} />
            <Text style={{
              flex: 1,
              textAlign: 'center',
              color: colors.white,
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 14
            }}>Cari Darah</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>


      {/* navigation bottom */}
      <View style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.primary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home' color={colors.white} size={20} />


        </TouchableOpacity>





        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person' color={colors.white} size={20} />
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})