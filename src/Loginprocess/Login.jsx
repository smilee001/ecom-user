import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IpAddress from '../IP/ipaddress';

const Login = ({ navigation }) => {
    const [eyeon, setEyeon] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};

        if (!email) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(password)) newErrors.password = 'Password is invalid';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (validateFields()) {
            console.log('Login');

            try {
                const response = await axios.post(`http://${IpAddress}:5000/users/login`, {
                    email: email,
                    password: password
                });
                console.log(response.data);
                const { data } = response.data;
                const { userId, userName } = data;
                console.log(data);

                await AsyncStorage.setItem('userId', userId);

                navigation.navigate('BottomNavigation');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <>
            <View style={style.container}>
                <View>
                    <Text style={style.logintxt}>Login</Text>
                    <View style={style.inputbox}>
                        <View>
                            <View style={[style.innnerinputbox, { borderColor: errors.email ? 'red' : '#444444' }]}>
                                <Ionicons style={style.txticon} name='mail' />
                                <TextInput
                                    style={[style.txtinput, { flex: 1 }]}
                                    placeholder='Email address'
                                    placeholderTextColor={'#7B7A7D'}
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        setErrors({ ...errors, email: '' });
                                    }}
                                />
                            </View>
                            {errors.email && <Text style={style.errorText}>{errors.email}</Text>}
                        </View>

                        <View>
                            <View style={[style.innnerinputbox, { borderColor: errors.password ? 'red' : '#444444' }]}>
                                <Fontcons style={style.txticon} name='shield-lock-outline' />
                                <TextInput
                                    style={[style.txtinput, { flex: 1 }]}
                                    placeholder='Password'
                                    placeholderTextColor={'#7B7A7D'}
                                    secureTextEntry={eyeon}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setErrors({ ...errors, password: '' });
                                    }}
                                />
                                <Ionicons
                                    style={[style.txticon, { paddingRight: wp(1.5) }]}
                                    name={eyeon ? 'eye-sharp' : 'eye-off-sharp'}
                                    onPress={() => setEyeon(!eyeon)}
                                />
                            </View>
                            {errors.password && <Text style={style.errorText}>{errors.password}</Text>}
                        </View>
                    </View>
                    <Text style={style.forgottxt}>Forgot Password?</Text>
                    <TouchableOpacity style={style.btnview} onPress={handleLogin}>
                        <Text style={style.btntxt}>Login</Text>
                    </TouchableOpacity>
                    <View style={style.linerow}>
                        <View style={style.line}></View>
                        <Text style={style.txtline}>or sign in with</Text>
                        <View style={style.line}></View>
                    </View>
                    <View style={style.btnrow}>
                        <View style={style.imgbtnback}>
                            <Image style={style.btnimage} source={require('../../images/google.png')} />
                        </View>
                        <View style={style.imgbtnback}>
                            <Image style={style.btnimage2} source={require('../../images/apple.png')} />
                        </View>
                        <View style={style.imgbtnback}>
                            <Image style={style.btnimage} source={require('../../images/facebook.png')} />
                        </View>
                    </View>
                </View>
                <View style={style.lastrow}>
                    <Text style={style.lasttxt}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[style.lasttxt, { color: '#1E90FF', fontFamily: 'Roboto-Bold' }]}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
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
        marginTop: wp(40),
        color: '#FFFFFF',
        fontSize: wp(10),
    },
    inputbox: {
        marginTop: wp(5.4),
        gap: wp(5.8),
    },
    innnerinputbox: {
        display: 'flex',
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
        color: '#E5E5EA',
        fontSize: wp(4),
        paddingLeft: wp(3),
        fontFamily: 'Roboto-Medium',
    },
    errorText: {
        color: 'red',
        fontSize: wp(3.5),
        marginTop: wp(1),
        marginLeft: wp(1),
    },
    forgottxt: {
        fontFamily: 'Roboto-Bold',
        fontSize: wp(3.8),
        paddingHorizontal: wp(1),
        paddingVertical: wp(1.5),
        textAlign: 'right',
        color: '#6495ED',
    },
    btnview: {
        marginTop: wp(5.5),
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
    linerow: {
        marginTop: wp(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: wp(5),
    },
    line: {
        width: wp(10),
        height: hp(0.3),
        backgroundColor: '#7B7A7D',
    },
    txtline: {
        fontFamily: 'Roboto-Bold',
        fontSize: wp(3.8),
        color: '#7B7A7D',
    },
    btnrow: {
        marginTop: wp(10.5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imgbtnback: {
        width: wp(14.5),
        height: hp(7),
        borderRadius: wp(3),
        backgroundColor: '#2C2C2E',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 5,
    },
    btnimage: {
        width: wp(14.5),
        height: hp(7),
    },
    btnimage2: {
        width: wp(8.6),
        height: hp(5),
    },
    lastrow: {
        marginTop: wp(28),
        display: 'flex',
        flexDirection: 'row',
        gap: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    lasttxt: {
        fontSize: wp(3.9),
        color: '#7B7A7D',
        fontWeight: 'bold',
    },
});

export default Login;