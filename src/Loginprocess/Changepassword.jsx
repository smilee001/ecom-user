import React from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Changepassword = () => {
    return (
        <>
            <ImageBackground source={require('../../images/loginback.png')} style={style.main}>
                <View style={style.container}>
                    <ScrollView contentContainerStyle={style.scroll}
                        showsVerticalScrollIndicator={false}>
                        <Text style={style.toptxt}>Create New Password</Text>

                        <Image style={style.image} source={require('../../images/lock.png')} />

                        <Text style={style.detailed}>Your New Password Must Be Differnt From Previously Used Password</Text>

                        <View style={style.inputcover}>
                            <View style={style.innercover}>
                                <Text style={style.inputheading}>New Password</Text>
                                <TextInput style={style.inputfield} placeholder='••••••••••••••••••••' placeholderTextColor={'#777777'} />
                            </View>
                            <View style={style.innercover}>
                                <Text style={style.inputheading}>Confirm Password</Text>
                                <TextInput style={style.inputfield} placeholder='••••••••••••••••••••' placeholderTextColor={'#777777'} />
                            </View>
                        </View>

                        <View style={style.chnageback}>
                            <Text style={style.changetxt}>Change Password</Text>
                        </View>

                        <View style={style.btncover}>
                            <Text style={style.btntxt}>Save</Text>
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

    toptxt: {
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
        width: wp(80),
        gap: wp(9)
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
        fontSize: wp(5),
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

export default Changepassword;