import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import IpAddress from '../IP/ipaddress';
import { useIsFocused } from '@react-navigation/native';

const Cart = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');
    const [cartId, setCartId] = useState('');

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getUserIdFromStorage();
        }
    }, [isFocused]);

    const getUserIdFromStorage = async () => {
        try {
            setUserId('');
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
        } catch (error) {
            console.error('Error retrieving userId:', error);
        }
    };

    useEffect(() => {
        if (userId !== '') {
            fetchData();
        }
    }, [userId, isFocused]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://${IpAddress}:5000/cart/getalldataofcart/${userId}`);
            setData(response.data.addtocartdata.user.product);
            setCartId(response.data.addtocartdata.cartId)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log('Cart : ', cartId);
    }, [cartId])

    useEffect(() => {
        console.log(data);
    }, [data])

    const popularitems = ['All', 'Clothes', 'Shoes', 'Bags', 'Electronics', 'Watch', 'Jewelry', 'Bags', 'Toys'];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>

            <View style={{ flex: 1, backgroundColor: '#000' }}>

                <View style={{ paddingVertical: hp(1.8), paddingHorizontal: wp(3.6), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3.4) }}>
                        <Image style={{ width: wp(9.5), height: hp(4.6), borderRadius: wp(10), borderWidth: 1 }} source={require('../../images/logo.jpg')} />
                        <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(3), color: '#fff' }}>My Cart</Text>
                    </View>
                    <Icon style={{ color: '#f1f1f7', fontSize: hp(4) }} name='search-outline' />
                </View>

                <View style={{ marginTop: hp(0.2), height: hp(5.8), paddingHorizontal: wp(4) }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', marginTop: hp(0.2), height: hp(5.6) }}>
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
                                        marginRight: isLastItem ? 0 : wp(2.8),
                                    }}
                                >
                                    <Text style={{ color: '#fdfdfd', textAlign: 'center', fontFamily: 'Urbanist-SemiBold', fontSize: hp(2) }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={{ flex: 1, marginTop: hp(3) }}>

                    <FlatList
                        style={{ paddingHorizontal: wp(4) }}
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item, index }) => (
                            <View key={item._id} style={{ flexDirection: 'row', height: hp(15), borderRadius: wp(5), paddingVertical: wp(1.5), marginBottom: wp(3.5), backgroundColor: '#1f222a' }}>
                                <Image
                                    style={{ width: wp(27), height: '100%', marginLeft: wp(2), borderRadius: wp(4.5), backgroundColor: '#000', overflow: 'hidden' }}
                                    source={{ uri: item.productImage[0] }}
                                />
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: wp(3.8) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                        <Text style={{ flex: 1, fontFamily: 'Urbanist-Bold', fontSize: hp(2.3), paddingTop: hp(0.2), color: '#fff' }}>{item.productTitle}</Text>
                                        <Icon2 style={{ fontSize: hp(3), marginTop: hp(0.4), color: '#bc4749' }} name="delete-outline" />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: wp(-1.5) }}>
                                        <Text style={{ fontFamily: 'Urbanist-Bold', color: '#e2e2e3', fontSize: hp(2.15) }}>$ {item.productPrice}</Text>
                                        <View style={{ backgroundColor: '#35383f', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: wp(25), paddingVertical: hp(0.8), borderRadius: wp(10) }}>
                                            <Icon2 style={{ fontSize: hp(2.2), color: '#e2e2e3' }} name="minus" />
                                            <Text style={{ fontSize: hp(2.2), fontFamily: 'Urbanist-Bold', color: '#e2e2e3' }}>{item.productQty}</Text>
                                            <Icon2 style={{ fontSize: hp(2.2), color: '#e2e2e3' }} name="plus" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />

                    <View style={{ flexDirection: 'row', gap: wp(4), alignItems: 'center', paddingHorizontal: wp(5), paddingVertical: hp(2.3), backgroundColor: '#000', borderTopRightRadius: wp(10), borderTopLeftRadius: wp(10), borderWidth: wp(0.5), borderBottomWidth: wp(0), borderColor: 'silver' }}>
                        <View style={{ flexDirection: 'column', gap: hp(1) }}>
                            <Text style={{ fontFamily: 'Urbanist-Bold', color: '#959595', fontSize: hp(1.6) }}>Total Price</Text>
                            <Text style={{ fontFamily: 'Urbanist-Bold', color: '#fff', fontSize: hp(3.18), marginBottom: hp(0.4) }}>$320.00</Text>
                        </View>

                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.navigate('Checkout', { cartId }) }}>
                            <View style={{ flex: 1, flexDirection: 'row', gap: wp(3), alignItems: 'center', justifyContent: 'center', paddingVertical: hp(2.3), borderRadius: wp(10), backgroundColor: '#fff' }}>
                                <Text style={{ fontFamily: 'Urbanist-Bold', color: '#181820', fontSize: hp(2.5) }}>Checkout</Text>
                                <Icon2 style={{ color: '#181820', fontSize: hp(3) }} name='cart-arrow-right' />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </>
    )
}

export default Cart;