import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import IpAddress from '../IP/ipaddress';

const ItemView = ({ navigation, route }) => {

    const { itemId } = route.params;

    useEffect(() => {
        console.log('id :', itemId);
    }, [])

    useEffect(() => {
        getUserIdFromStorage();
    }, [])

    const [userId, setUserId] = useState('');

    const getUserIdFromStorage = async () => {
        try {
            var userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
            console.log('UserId:', userId);
        } catch (error) {
            console.error('Error retrieving userId:', error);
        }
    };

    const [data, setData] = useState([]);

    const AddtoCart = async () => {
        console.log('add to cart');
        if (userId === '') {
            console.log('UserId Not Found');
            navigation.navigate('Login');
        }
        else {
            console.log('userId :', userId);
            try {
                const response = await axios.post(`http://${IpAddress}:5000/cart/addtocart?userId=${userId}&productId=${itemId}`);
                console.log(response.data);
                navigation.navigate('Cart');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    useEffect(() => {
        try {
            axios.get(`http://${IpAddress}:5000/admin/getsingleproduct/${itemId}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    }, []);

    useEffect(() => {
        console.log('data :', data.title);
    }, [data])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#000', position: 'relative' }}>

                <View style={{ width: '100%', position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', top: hp(3.5), paddingHorizontal: wp(4), zIndex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                        <Icon style={{ color: '#141318', fontSize: hp(4) }} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: wp(1.5), alignItems: 'center' }}>
                        <Icon style={{ color: '#141318', fontSize: hp(4) }} name='heart-outline' />
                        <Icon style={{ color: '#141318', fontSize: hp(3.2) }} name='share-social' />
                    </View>
                </View>

                <View style={{ width: '100%', height: hp(44), backgroundColor: '#000' }}>
                    {data.image && data.image.length > 0 ? (
                        <Swiper
                            paginationStyle={{ bottom: hp(1), gap: wp(1) }}
                            dot={<Icon name="ellipse" style={{ fontSize: hp(1.7), color: '#cccccc' }} />}
                            activeDot={<Icon name="ellipse" style={{ fontSize: hp(2), color: '#000' }} />}
                        >
                            {data.image.map((imgUrl, index) => (
                                <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: wp(100), height: hp(44) }} source={{ uri: imgUrl }} />
                                </View>
                            ))}
                        </Swiper>
                    ) : null}
                </View>

                <View style={{ paddingHorizontal: wp(3.5), paddingTop: hp(2) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(4), color: '#fff' }}>{data.title}</Text>
                        <Icon style={{ color: '#fff', fontSize: hp(4), marginRight: wp(1) }} name='heart-outline' />
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: hp(1.5), borderBottomWidth: wp(0.2), borderBottomColor: '#1e1e1e' }}>
                        <Text style={{ backgroundColor: '#35383f', color: '#c9cacb', fontFamily: 'Urbanist-SemiBold', fontSize: hp(1.7), borderRadius: wp(1), paddingVertical: wp(1.2), paddingHorizontal: wp(2.4) }}>6321 sold</Text>
                        <Icon style={{ color: '#fff', fontSize: hp(2.2), marginHorizontal: wp(5) }} name='star-half-outline' />
                        <Text style={{ color: '#959699', fontFamily: 'Urbanist-Regular', fontSize: hp(2), marginLeft: wp(-2) }}>4.8 (4,749 reviews)</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: wp(3.5), paddingTop: hp(1), gap: hp(1) }}>
                    <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.45), color: '#fff' }}>Description</Text>
                    <Text style={{ fontFamily: 'Urbanist-Regular', fontSize: hp(1.8), color: '#909090' }}>{data.discription}</Text>
                </View>

                <View style={{ width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row', gap: wp(4), alignItems: 'center', paddingHorizontal: wp(5), paddingVertical: hp(2.3), backgroundColor: '#000' }}>
                    <View style={{ flexDirection: 'column', gap: hp(1) }}>
                        <Text style={{ fontFamily: 'Urbanist-Bold', color: '#959595', fontSize: hp(1.6) }}>Total Price</Text>
                        <Text style={{ fontFamily: 'Urbanist-Bold', color: '#fff', fontSize: hp(3.18), marginBottom: hp(0.4) }}>${data.price}.00</Text>
                    </View>

                    <TouchableOpacity style={{ flex: 1 }} onPress={AddtoCart}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: wp(3), alignItems: 'center', justifyContent: 'center', paddingVertical: hp(2.3), borderRadius: wp(10), backgroundColor: '#fff' }}>
                            <Icon style={{ color: '#181820', fontSize: hp(3) }} name='bag-handle' />
                            <Text style={{ fontFamily: 'Urbanist-Bold', color: '#181820', fontSize: hp(2.5) }}>Add To Cart</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        </>
    )
}

export default ItemView;