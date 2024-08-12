import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IpAddress from '../IP/ipaddress';
import RazorpayCheckout from 'react-native-razorpay';

const imgURL = 'https://m.media-amazon.com/images/I/61L5QgPvgqL._AC_UF1000,1000_QL80_.jpg';
const RAZORPAY_KEY = 'rzp_test_UyMbTZyUs93AQS';

const Checkout = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [mobile, setMobile] = useState('');
    const [place, setPlace] = useState('');
    const [typeofdelivery, setTypeofDelivery] = useState('');
    const [errors, setErrors] = useState({});

    const [userId, setUserId] = useState('');
    const [cartId, setCartId] = useState('');

    const [orderId, setOrderId] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {

        if (route.params && route.params.cartId) {
            setCartId(route.params.cartId);
        } else {
            console.error('cartId is not defined in route.params');
        }

        const getUserIdFromStorage = async () => {
            try {
                const userid = await AsyncStorage.getItem('userId');
                if (userid) {
                    setUserId(userid);
                }
            } catch (error) {
                console.error('Error retrieving userId:', error);
            }
        };
        getUserIdFromStorage();
    }, []);

    useEffect(() => {
        console.log('checkout cartid :', cartId);
    }, [cartId])

    useEffect(() => {
        console.log('checkout userid :', userId);
    }, [userId])

    const validateFields = () => {
        const newErrors = {};

        if (!name) newErrors.name = 'Name is required';

        if (!addressOne) newErrors.addressOne = 'Address is required';

        if (!pinCode) newErrors.pinCode = 'Pin code is required';
        else if (!/^\d{6}$/.test(pinCode)) newErrors.pinCode = 'Pin code is invalid';

        if (!mobile) newErrors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Mobile number is invalid';

        if (!typeofdelivery) newErrors.typeofdelivery = 'Delivery method is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = async () => {
        if (validateFields()) {
            console.log('Checkout');

            try {
                const response = await axios.post(`http://${IpAddress}:5000/checkout/add-detail-of-checkout?userId=${userId}&cartId=${cartId}`, {
                    name: name,
                    addressone: addressOne,
                    addresstwo: addressTwo,
                    pincode: pinCode,
                    city: city,
                    state: state,
                    mobile: mobile,
                    place: place,
                    typeofdelivery: typeofdelivery
                });
                console.log(response.status);

                if (response.status == 200) {
                    console.log('okay');
                    try {
                        const response = await axios.post(`http://${IpAddress}:5000/checkout/createorderforallcart/${cartId}`);

                        console.log(response.data);
                        setOrderId(response.data.order.id)
                        setAmount(response.data.order.amount)
                        console.log(orderId);
                        console.log(amount);
                        onPressBuy();
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
                // navigation.navigate('Confirmation');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const onPressBuy = () => {
        //Order Api: Call POST api with body like (username, id, price etc) to create an Order and use order_id in below options object
        // const response = await .....

        let options = {
            description: 'Credits towards consultation',
            image: imgURL, //require('../../images.png')
            currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
            key: RAZORPAY_KEY,
            amount: amount,
            name: 'Acme Corp',
            order_id: orderId, //Replace this with an order_id(response.data.orderId) created using Orders API.
            prefill: {
                email: 'hasan@example.com',
                contact: mobile,
                name: name
            }, //if prefill is not provided then on razorpay screen it has to be manually entered.
            theme: { color: '#000' },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                // handle success
                console.log(`Success: ${data.razorpay_payment_id}`);
            })
            .catch(error => {
                // handle failure
                console.log(`Error: ${error.code} | ${error.description}`);
            });
    };

    useEffect(() => {
        console.log(`Name: ${name}, Address One: ${addressOne}, Address Two: ${addressTwo}, Pin Code: ${pinCode}, City: ${city}, State: ${state}, Mobile: ${mobile}, Place: ${place}, Type of Delivery: ${typeofdelivery}`);
        // console.log(typeofdelivery);
        setErrors({ ...errors, typeofdelivery: '' });
    }, [typeofdelivery]);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Cash On Dilivery', value: 'cash on delivery' },
        { label: 'Online Payment', value: 'online' }
    ]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.container}>
                <Text style={style.logintxt}>Checkout</Text>

                <View style={style.inputbox}>
                    <View>
                        <View style={[style.innnerinputbox, { borderColor: errors.name ? 'red' : '#444444' }]}>
                            <Ionicons style={style.txticon} name='person' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='Name'
                                placeholderTextColor={'#7B7A7D'}
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                    setErrors({ ...errors, name: '' });
                                }}
                            />
                        </View>
                        {errors.name && <Text style={style.errorText}>{errors.name}</Text>}
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: errors.addressOne ? 'red' : '#444444' }]}>
                            <Ionicons style={style.txticon} name='location' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='Address Line 1'
                                placeholderTextColor={'#7B7A7D'}
                                value={addressOne}
                                onChangeText={(text) => {
                                    setAddressOne(text);
                                    setErrors({ ...errors, addressOne: '' });
                                }}
                            />
                        </View>
                        {errors.addressOne && <Text style={style.errorText}>{errors.addressOne}</Text>}
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: '#444444' }]}>
                            <Ionicons style={style.txticon} name='location' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='Address Line 2'
                                placeholderTextColor={'#7B7A7D'}
                                value={addressTwo}
                                onChangeText={(text) => setAddressTwo(text)}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: errors.pinCode ? 'red' : '#444444' }]}>
                            <Ionicons style={style.txticon} name='locate' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='Pin Code'
                                placeholderTextColor={'#7B7A7D'}
                                value={pinCode}
                                keyboardType='number-pad'
                                maxLength={6}
                                onChangeText={(text) => {
                                    setPinCode(text);
                                    setErrors({ ...errors, pinCode: '' });
                                }}
                            />
                        </View>
                        {errors.pinCode && <Text style={style.errorText}>{errors.pinCode}</Text>}
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: '#444444' }]}>
                            <Ionicons style={style.txticon} name='business' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='City'
                                placeholderTextColor={'#7B7A7D'}
                                value={city}
                                onChangeText={(text) => setCity(text)}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: '#444444' }]}>
                            <Ionicons style={style.txticon} name='business' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='State'
                                placeholderTextColor={'#7B7A7D'}
                                value={state}
                                onChangeText={(text) => setState(text)}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: errors.mobile ? 'red' : '#444444' }]}>
                            <Ionicons style={style.txticon} name='call' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='Mobile No.'
                                placeholderTextColor={'#7B7A7D'}
                                value={mobile}
                                keyboardType='number-pad'
                                maxLength={10}
                                onChangeText={(text) => {
                                    setMobile(text);
                                    setErrors({ ...errors, mobile: '' });
                                }}
                            />
                        </View>
                        {errors.mobile && <Text style={style.errorText}>{errors.mobile}</Text>}
                    </View>

                    <View>
                        <View style={[style.innnerinputbox, { borderColor: '#444444' }]}>
                            <Ionicons style={style.txticon} name='locate' />
                            <TextInput
                                style={style.txtinput}
                                placeholder='Place'
                                placeholderTextColor={'#7B7A7D'}
                                value={place}
                                onChangeText={(text) => setPlace(text)}
                            />
                        </View>
                    </View>

                    <View>
                        <DropDownPicker
                            style={style.dropdown}
                            open={open}
                            value={typeofdelivery}
                            items={items}
                            setOpen={setOpen}
                            setValue={setTypeofDelivery}
                            setItems={setItems}
                            dropDownDirection="DOWN"
                            placeholder="Type Of Dilivery"
                            textStyle={{
                                color: '#7B7A7D',
                                fontSize: wp(4),
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: '#2C2C2E',
                                borderWidth: wp(0.6),
                                borderColor: '#444444'
                            }}
                        />
                        {errors.typeofdelivery && <Text style={style.errorText}>{errors.typeofdelivery}</Text>}
                    </View>

                </View>

                <TouchableOpacity style={[style.btnview, { marginTop: open ? hp(12) : hp(3) }]} onPress={handleCheckout}>
                    <Text style={style.btntxt}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: wp(100),
        paddingHorizontal: wp(8.5),
        backgroundColor: '#1C1C1E',
    },
    logintxt: {
        fontFamily: 'Ubuntu-Medium',
        marginTop: wp(10),
        color: '#FFFFFF',
        fontSize: wp(10),
    },
    inputbox: {
        marginTop: wp(5.4),
        gap: wp(5.8),
    },
    innnerinputbox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: wp(0.6),
        borderColor: '#444444',
        borderRadius: wp(3),
        paddingHorizontal: wp(2),
        paddingVertical: wp(1),
        backgroundColor: '#2C2C2E',
    },
    txticon: {
        color: '#9C9C9E',
        fontSize: wp(6),
    },
    txtinput: {
        flex: 1,
        color: '#E5E5EA',
        fontSize: wp(4),
        paddingLeft: wp(3),
        fontFamily: 'Roboto-Medium',
    },
    dropdown: {
        flex: 1,
        backgroundColor: '#2C2C2E',
        borderWidth: wp(0.6),
        borderColor: '#444444',
        borderRadius: wp(3),
        paddingHorizontal: wp(4),
        paddingVertical: wp(3.5)
    },
    errorText: {
        color: 'red',
        fontSize: wp(3.5),
        marginTop: wp(1),
        marginLeft: wp(1),
    },
    btnview: {
        marginBottom: hp(3.5),
        borderWidth: wp(0.5),
        borderColor: '#444444',
        borderRadius: wp(3),
        backgroundColor: '#1E90FF',
        paddingVertical: wp(3),
    },
    btntxt: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        fontSize: wp(6),
        color: '#FFFFFF',
    },
});

export default Checkout;
