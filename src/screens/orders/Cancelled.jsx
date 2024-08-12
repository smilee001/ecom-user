import React from 'react'
import { FlatList, Image, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Cancelled = () => {
    const data = [
        {
            id: '1',
            title: 'Mini Plastic Bag',
            address: '123 Main St, CityVille',
            price: '$485.00',
            status: 'Refunded',
            image: require('../../../images/bag.png')
        },
        {
            id: '2',
            title: 'Mini Plastic Bag',
            address: '123 Main St, CityVille',
            price: '$485.00',
            status: 'Refunded',
            image: require('../../../images/bag.png')
        },
        {
            id: '3',
            title: 'Mini Plastic Bag',
            address: '123 Main St, CityVille',
            price: '$485.00',
            status: 'Procced',
            image: require('../../../images/cart.png')
        },
        {
            id: '4',
            title: 'Mini Plastic Bag',
            address: '123 Main St, CityVille',
            price: '$485.00',
            status: 'Refunded',
            image: require('../../../images/bag.png')
        }
    ];

    return (
        <>
            <View style={{ flex: 1, paddingTop: hp(3), paddingHorizontal: wp(1.5) }}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={{ borderRadius: wp(5), backgroundColor: '#1f222a', overflow: 'hidden', marginBottom: hp(2.5) }}>
                            <View style={{ flexDirection: 'row', gap: wp(7), height: hp(13.9), borderRadius: wp(5), paddingVertical: wp(2), paddingHorizontal: wp(3) }}>
                                <Image
                                    style={{ width: wp(24), height: '100%', marginLeft: wp(2), borderRadius: wp(4.5), backgroundColor: '#000', overflow: 'hidden' }}
                                    source={item.image}
                                />
                                <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: hp(1) }}>
                                    <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(2.3), color: '#fff' }}>{item.title}</Text>
                                    <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(1.56), color: '#9a9b9d' }}>{item.address}</Text>
                                    <View style={{ flexDirection: 'row', gap: wp(4) }}>
                                        <Text style={{ fontFamily: 'Urbanist-Bold', color: '#e2e2e3', fontSize: hp(2.45) }}>{item.price}</Text>
                                        <Text style={{ backgroundColor: '#35383f', color: '#c9cacb', fontFamily: 'Urbanist-SemiBold', fontSize: hp(1.7), borderRadius: wp(1.5), paddingVertical: wp(1), paddingHorizontal: wp(4) }}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: wp(1.5), marginTop: hp(0.5), paddingVertical: hp(2), borderTopColor: '#424242', borderTopWidth: wp(0.4) }}>
                                <View style={{ paddingVertical: hp(1.2), borderRadius: wp(10), backgroundColor: '#000' }}>
                                    <Text style={{ fontFamily: 'Urbanist-SemiBold', color: '#e2e2e3', fontSize: hp(2.2), textAlign: 'center' }}>View</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />

            </View>
        </>
    )
}

export default Cancelled;