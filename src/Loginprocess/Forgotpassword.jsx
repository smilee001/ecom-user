import React from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Forgotpassword = () => {
  return (
    <>
      <ImageBackground source={require('../../images/loginback.png')} style={style.main}>
        <View style={style.container}>
          <ScrollView contentContainerStyle={style.scroll}
            showsVerticalScrollIndicator={false}>

            <View style={style.row}>
              <Ionicons style={style.backicon} name='chevron-back-outline' />
              <Text style={style.toptxt}>Forgot Password</Text>
            </View>

            <Image style={style.image} source={require('../../images/lock.png')} />

            <Text style={style.detailed}>Please Enter Your Email Address To Recieve{"\n"}A Verification Code.</Text>

            <View style={style.inputcover}>
              <View style={style.innercover}>
                <Text style={style.inputheading}>Email Address</Text>
                <TextInput style={style.inputfield} placeholder='example000@gmail.com' placeholderTextColor={'#999999'} />
              </View>
            </View>

            <View style={style.chnageback}>
              <Text style={style.changetxt}>Try another Way</Text>
            </View>

            <View></View>

            <View style={style.btncover}>
              <Text style={style.btntxt}>Send</Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  )
}

const style = StyleSheet.create({

  main: {
    flex: 1,
    alignItems: 'center'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  scroll: {
    flexGrow: 1,
    gap: wp(10),
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: wp(5)
  },

  image: {
    width: wp(60),
    height: hp(28.5),
    borderRadius: wp(50),
    backgroundColor: '#023047'
  },

  row: {
    width: wp(92),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: wp(1)
  },

  backicon: {
    color: '#000',
    fontSize: wp(6.5)
  },

  toptxt: {
    flex: 1,
    textAlign: 'center',
    fontSize: wp(6),
    fontWeight: '500',
    fontFamily: 'Ubuntu-Medium',
    color: '#000'
  },

  detailed: {
    color: '#023047',
    fontSize: wp(4),
    textAlign: 'center',
    lineHeight: wp(8),
    fontFamily: 'Ubuntu-Medium'
  },

  inputcover: {
    width: wp(82)
  },

  innercover: {
    gap: wp(1)
  },

  inputheading: {
    color: '#111111',
    fontSize: wp(3.5),
    fontFamily: 'Ubuntu-Medium'
  },

  inputfield: {
    paddingLeft: 0,
    paddingVertical: wp(1),
    fontFamily: 'Ubuntu-Medium',
    fontSize: wp(4.5),
    fontWeight: '500',
    borderBottomWidth: wp(0.3),
    borderBottomColor: '#000',
  },

  chnageback: {},

  changetxt: {
    fontFamily: 'Ubuntu-Medium',
    color: '#023047',
    borderBottomColor: '#023047',
    borderBottomWidth: wp(0.4)
  },

  btncover: {
    width: wp(65),
    marginBottom: wp(3),
    backgroundColor: '#D1D9E3',
    paddingVertical: wp(3),
    borderWidth: 2,
    borderRadius: wp(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  btntxt: {
    color: '#000',
    fontSize: wp(4.5),
    fontFamily: 'Ubuntu-Medium'
  },


})

export default Forgotpassword;