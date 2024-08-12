import React from 'react'
import { FlatList, Image, ImageBackground, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/Entypo';

const Wallet = () => {

    const data = [
        {
            id: '1',
            name: 'Daniel Austin',
            date: 'Dec 20, 2024 | 10:00 AM',
            amount: 14,
            type: 'withdrawal', // 'deposit' or 'withdrawal'
        },
        {
            id: '2',
            name: 'Sophia Brown',
            date: 'Dec 18, 2024 | 08:30 AM',
            amount: 30,
            type: 'deposit',
        },
        {
            id: '3',
            name: 'John Doe',
            date: 'Dec 17, 2024 | 05:15 PM',
            amount: 22,
            type: 'withdrawal',
        },
        {
            id: '4',
            name: 'Jane Smith',
            date: 'Dec 16, 2024 | 11:00 AM',
            amount: 45,
            type: 'deposit',
        },
        {
            id: '5',
            name: 'Michael Johnson',
            date: 'Dec 15, 2024 | 02:30 PM',
            amount: 50,
            type: 'withdrawal',
        },
        {
            id: '6',
            name: 'Emily Davis',
            date: 'Dec 14, 2024 | 09:45 AM',
            amount: 60,
            type: 'deposit',
        },
    ];

    return (
        <>

            <ImageBackground style={{ flex: 1 }}
                source={require('../../images/wallet.jpg')}
            >
                <View style={{ flex: 1, paddingHorizontal: wp(3.6), backgroundColor: '#000' }}>
                    <View style={{ paddingVertical: hp(1.8), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3.4) }}>
                            <Image style={{ width: wp(9.5), height: hp(4.6), borderRadius: wp(10), borderWidth: 1 }} source={require('../../images/logo.jpg')} />
                            <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(3), color: '#fff' }}>My Wallet</Text>
                        </View>
                        <Icon2 style={{ color: '#f1f1f7', fontSize: hp(4) }} name='dots-horizontal-circle-outline' />
                    </View>

                    <ImageBackground style={{
                        height: hp(28.5), borderRadius: wp(10), overflow: 'hidden', marginHorizontal: wp(0.8), marginTop: hp(0.4), paddingHorizontal: wp(4.6), paddingVertical: hp(3),
                        justifyContent: 'space-between', shadowColor: '#fff', elevation: 10
                    }}
                        source={require('../../images/card.jpg')}
                    >
                        <View style={{ gap: hp(1) }}>
                            <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(3), color: '#fff' }}>Andrew Ainsley</Text>
                            <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(1.8), color: '#fff' }}>**** **** **** ****</Text>
                        </View>

                        <View style={{ gap: hp(0.5) }}>
                            <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(3), color: '#bfbfbf' }}>Your Balance</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(5), color: '#fff' }}>$ 95.75</Text>

                                <View style={{ marginTop: hp(0.4), paddingHorizontal: wp(7.2), paddingVertical: hp(1.4), borderRadius: wp(5), flexDirection: 'row', gap: wp(2), alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <Icon style={{ fontSize: hp(2.5), color: '#17181a' }} name='download' />
                                    <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.2), color: '#17181a' }}>Top Up</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{ marginTop: hp(2.2), paddingHorizontal: wp(0.5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#fefefe', fontFamily: 'Urbanist-Bold', fontSize: hp(2.78) }}>Letest Transaction</Text>
                        <Text style={{ color: '#fefefe', fontFamily: 'Urbanist-Bold', fontSize: hp(2.5) }}>See All</Text>
                    </View>

                    <FlatList
                        style={{ marginTop: hp(3) }}
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            const isDeposit = item.type === 'deposit';
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(2), paddingHorizontal: wp(1) }}>
                                    <View style={{ flexDirection: 'row', gap: wp(3.5), justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Image style={{ width: wp(15), height: hp(7.3), borderRadius: isDeposit ? wp(0) : wp(10), backgroundColor: '#000' }}
                                            source={isDeposit ? require('../../images/deposited.png') : require('../../images/user.png')}
                                        />
                                        <View style={{ gap: hp(1) }}>
                                            <Text style={{ color: '#ececec', fontFamily: 'Urbanist-Bold', fontSize: hp(2.2) }}>{isDeposit ? 'Top Up Wallet' : item.name}</Text>
                                            <Text style={{ color: '#717171', fontFamily: 'Urbanist-Bold' }}>{item.date}</Text>
                                        </View>
                                    </View>
                                    <View style={{ gap: hp(0.1), justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#bfbfbf', fontFamily: 'Urbanist-ExtraBold', fontSize: hp(2) }}>${item.amount}</Text>
                                        <Icon2 style={{ color: isDeposit ? 'royalblue' : 'tomato', fontSize: hp(2.5), marginTop: hp(0.5), marginHorizontal: wp(-0.5) }} name={isDeposit ? 'arrow-down-bold-box' : 'arrow-up-bold-box'} />
                                    </View>
                                </View>
                            );
                        }}
                    />

                </View >

            </ImageBackground >
        </>
    )
}

export default Wallet;