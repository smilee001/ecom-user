import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import IpAddress from '../IP/ipaddress';

const Home = ({ navigation }) => {

    const items = ['Clothes', 'Shoes', 'Bags', 'Electronics', 'Watch', 'Jewelry', 'Bags', 'Toys'];
    const popularitems = ['All', 'Clothes', 'Shoes', 'Bags', 'Electronics', 'Watch', 'Jewelry', 'Bags', 'Toys'];

    const [activeIndex, setActiveIndex] = useState(0);

    const [data, setData] = useState([]);

    useEffect(() => {
        getUserIdFromStorage();
    }, [])

    const getUserIdFromStorage = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            // console.log('UserId:', userId);
        } catch (error) {
            console.error('Error retrieving userId:', error);
        }
    };

    useEffect(() => {
        try {
            axios.get(`http://${IpAddress}:5000/admin/getallproduct`)
                .then((response) => {
                    setData(response.data.productData);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    }, []);

    // useEffect(() => {
    //     console.log(data);
    // }, [data])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp(1.3), paddingLeft: wp(4.2), paddingRight: wp(3.1) }}>

                    <View style={{ flexDirection: 'row', gap: wp(3.8) }}>
                        <Image style={{ width: wp(13.1), height: hp(6.5), borderRadius: wp(10), backgroundColor: '#000' }}
                            source={require('../../images/Home.jpg')} />

                        <View style={{ paddingVertical: hp(0.3), gap: wp(1.3) }}>
                            <Text style={{ fontFamily: 'Urbanist-Medium', fontSize: hp(1.63), color: '#737373' }}>Good Morning</Text>
                            <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(2.7), color: '#fff' }}>Andrew Ainsley</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: wp(1.5), alignItems: 'center' }}>
                        <Icon style={{ color: '#fff', fontSize: hp(3.2) }} name='notifications-outline' />
                        <Icon style={{ color: '#fff', fontSize: hp(4) }} name='heart-outline' />
                    </View>

                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ paddingHorizontal: wp(4.2), paddingVertical: hp(0.6) }}>
                        <View style={{ flexDirection: 'row', gap: wp(1), alignItems: 'center', paddingHorizontal: wp(4.5), paddingVertical: hp(0.7), borderRadius: wp(2.5), backgroundColor: '#1f222b' }}>
                            <Icon style={{ color: '#95979c', fontSize: hp(3.2) }} name='search-outline' />
                            <TextInput style={{ flex: 1, fontFamily: 'Urbanist-Medium', fontSize: hp(2.5) }}></TextInput>
                            <Icon style={{ color: '#fff', fontSize: hp(3.2) }} name='options-outline' />
                        </View>

                        <View style={{ position: 'relative', backgroundColor: '#000', height: hp(22.8), marginTop: hp(2.5), borderRadius: wp(8), overflow: 'hidden' }}>
                            <Swiper paginationStyle={{ bottom: hp(1), gap: wp(1) }}
                                dot={<Icon name="ellipse" style={{ fontSize: hp(1.7), color: '#cccccc' }} />}
                                activeDot={<Icon name="ellipse" style={{ fontSize: hp(2), color: '#1a191f' }} />}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: wp(100), height: hp(22.8) }} source={require('../../images/offer1.jpg')} />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: wp(100), height: hp(22.8) }} source={require('../../images/offer2.jpg')} />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: wp(100), height: hp(22.8) }} source={require('../../images/offer3.jpg')} />
                                </View>
                            </Swiper>
                        </View>

                        <View style={{ marginTop: hp(2.5) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: '#fefefe', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.5) }}>Categories</Text>
                                <Text style={{ color: '#fefefe', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.2) }}>See all</Text>
                            </View>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: hp(2) }}>
                                {items.map((item, index) => (
                                    <View key={index} style={{ width: wp(22.9), marginBottom: hp(1.8), alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#363940', alignItems: 'center', justifyContent: 'center', width: wp(15), height: hp(7.3), borderRadius: 50 }}>
                                            <Icon style={{ color: '#fff', fontSize: hp(3.2) }} name='aperture' />
                                        </View>
                                        <Text style={{ textAlign: 'center', color: '#fdfdfd', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2), marginTop: hp(1) }}>{item}</Text>
                                    </View>
                                ))}
                            </View>

                        </View>

                        <View style={{ marginTop: hp(2) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: '#fefefe', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.5) }}>Most Popular</Text>
                                <Text style={{ color: '#fefefe', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.2) }}>See all</Text>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', paddingTop: hp(2.8) }}>
                                {popularitems.map((item, index) => {
                                    const isActive = activeIndex === index;
                                    const isLastItem = index === popularitems.length - 1;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setActiveIndex(index)}
                                            style={{
                                                backgroundColor: isActive ? '#363940' : 'transparent',
                                                borderWidth: isActive ? 0 : wp(0.4),
                                                borderColor: '#363940',
                                                paddingVertical: wp(2.6),
                                                paddingHorizontal: wp(3),
                                                borderRadius: wp(10),
                                                marginRight: isLastItem ? 0 : wp(3.8),
                                            }}
                                        >
                                            <Text style={{ color: '#fdfdfd', textAlign: 'center', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2) }}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>

                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(3), marginBottom: hp(1.5) }}>

                                <FlatList
                                    data={data}
                                    keyExtractor={item => item._id}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('ItemView', { itemId: item._id })}>
                                            <View style={{ position: 'relative', width: wp(42.5), borderRadius: wp(4), padding: wp(2), backgroundColor: '#1f222a', marginBottom: hp(1.5) }}>
                                                <Image style={{ width: '100%', height: hp(19), borderRadius: wp(2), backgroundColor: 'red' }} source={{ uri: item.image[0] }} />
                                                <View style={{ position: 'absolute', top: hp(2), right: wp(3.8), backgroundColor: '#101010', padding: wp(1.3), borderRadius: wp(10), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon style={{ color: '#fff', fontSize: hp(2.5) }} name='heart-outline' />
                                                </View>
                                                <Text style={{ fontFamily: 'Urbanist-Bold', color: '#fff', fontSize: hp(2.4), marginTop: hp(0.7) }}>{item.title}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(1) }}>
                                                    <Icon style={{ color: '#fff', fontSize: hp(1.8) }} name='star-half-outline' />
                                                    <Text style={{ color: '#959699', fontFamily: 'Urbanist-SemiBold', fontSize: hp(1.7), marginLeft: wp(0.6) }}>4.5</Text>
                                                    <View style={{ height: hp(1.5), width: wp(0.4), backgroundColor: '#959699', marginHorizontal: wp(1.5) }}></View>
                                                    <Text style={{ backgroundColor: '#35383f', color: '#c9cacb', fontFamily: 'Urbanist-SemiBold', fontSize: hp(1.7), borderRadius: wp(1.5), marginLeft: wp(1), paddingVertical: wp(1.2), paddingHorizontal: wp(2.4) }}>$ {item.discount} off</Text>
                                                </View>
                                                <Text style={{ fontFamily: 'Urbanist-Bold', color: '#fff', fontSize: hp(2.4), marginTop: hp(0.7), marginBottom: hp(0.4) }}>$ {item.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />

                            </View>
                        </View>

                    </View>

                </ScrollView>

            </View>
        </>
    )
}

export default Home;