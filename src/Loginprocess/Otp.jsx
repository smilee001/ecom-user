import React, { useRef } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Otp = () => {

    const inputRefs = useRef([]);

    const focusInput = (index) => {
        if (inputRefs.current[index] && inputRefs.current[index].focus) {
            inputRefs.current[index].focus();
        }
    };

    const onChangeText = (text, index) => {
        if (text.length === 1 && index < inputRefs.current.length - 1) {
            focusInput(index + 1);
        }
    };

    return (
        <>
            <ImageBackground source={require('../../images/loginback.png')} style={style.main}>
                <View style={style.container}>
                    <ScrollView contentContainerStyle={style.scroll}
                        showsVerticalScrollIndicator={false}>

                        <View style={style.row}>
                            <Ionicons style={style.backicon} name='chevron-back-outline' />
                            <Text style={style.toptxt}>Verify Your Email</Text>
                        </View>

                        <Image style={style.image} source={require('../../images/email.png')} />

                        <Text style={style.detailed}>Please Enter The 4 Digit Code Sent To{"\n"}example000@gmail.com</Text>

                        <View style={style.otpInputContainer}>
                            {[0, 1, 2, 3].map((index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    style={style.otpInput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    onChangeText={(text) => onChangeText(text, index)}
                                    onFocus={() => focusInput(index)}
                                />
                            ))}
                        </View>

                        <View style={style.chnageback}>
                            <Text style={style.changetxt}>Resend Code</Text>
                        </View>

                        <View></View>

                        <View style={style.btncover}>
                            <Text style={style.btntxt}>Verify</Text>
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

    otpInputContainer: {
        flexDirection: 'row',
        gap: wp(5),
        marginBottom: wp(4)
    },

    otpInput: {
        width: wp(10),
        height: wp(12),
        backgroundColor: '#c0cbd8',
        borderBottomWidth: wp(0.75),
        borderColor: '#023047',
        textAlign: 'center',
        fontSize: wp(7),
        fontFamily: 'Ubuntu-Medium'
    },

    changetxt: {
        fontSize: wp(3.6),
        fontWeight: '500',
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

export default Otp;