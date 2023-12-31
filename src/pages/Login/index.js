import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';


export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    telepon: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});





  const masuk = () => {


    if (kirim.telepon == null && kirim.password == null) {
      Alert.alert(MYAPP, 'telepon dan Password tidak boleh kosong !');
    } else if (kirim.telepon == null) {
      Alert.alert(MYAPP, 'telepon tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }
        });



    }




  }

  useEffect(() => {

    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background, position: 'relative' }}>




        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/logo.png')} style={{
            width: windowWidth,
            height: windowWidth / 2.5,
            resizeMode: 'contain'
          }} />

        </View>


        <View style={{
          padding: 20, flex: 1, margin: 20,
          borderRadius: 10,
        }}>
          <Text style={{
            fontSize: windowWidth / 14,
            fontFamily: fonts.primary[800],
            color: colors.primary,
          }}>Login</Text>
          <Text style={{
            fontSize: windowWidth / 28,
            fontFamily: fonts.primary[400],
            color: colors.primary,
            marginBottom: 10,
          }}>Silahkan login terlebih dahulu</Text>
          <MyInput keyboardType='phone-pad' label="Nomor Telepon" onChangeText={val => setKirim({
            ...kirim,
            telepon: val
          })}
            iconname="call" placeholder="Masukan nomor telepon" />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Kata Sandi"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <TouchableOpacity onPress={() => {
            let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
            Linking.openURL(urlWA)
          }} style={{
            marginTop: 10,
          }}>
            <Text style={{
              textAlign: 'right',
              fontFamily: fonts.secondary[600],
              color: colors.tertiary,
              size: 12
            }}>Lupa password ?</Text>
          </TouchableOpacity>
          <MyGap jarak={40} />
          {!loading &&




            <MyButton
              onPress={masuk}
              title="Masuk"


              Icons="log-in-outline"
            />


          }

        </View>


        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>}
      </ScrollView>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
        <View style={{
          padding: 10,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: windowWidth / 28,
            fontFamily: fonts.primary[400],
            textAlign: 'center',
            color: colors.tertiary
          }}>Belum memiliki Akun ? <Text style={{
            fontSize: windowWidth / 28,
            fontFamily: fonts.primary[600],
            textAlign: 'center',
            color: colors.primary
          }}>Daftar disini</Text></Text>
        </View>
      </TouchableWithoutFeedback>
      <Image source={require('../../assets/bottom.png')} style={{
        width: '100%',
        height: 50,
        resizeMode: 'cover'
      }} />
    </>
  );
}

const styles = StyleSheet.create({});
