import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Register = ({ navigation }) => {
    const [eyeon, setEyeon] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const passwordErrors = [];
        if (password.length < 8) {
            passwordErrors.push('Minimum 8 characters required for password.\n');
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push('Need at least one uppercase letter.\n');
        }
        if (!/[a-z]/.test(password)) {
            passwordErrors.push('Include at least one lowercase character.\n');
        }
        if (!/\d/.test(password)) {
            passwordErrors.push('At least one number is required.\n');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            passwordErrors.push('Include a special character (!@#$%^&*).');
        }
        if (/\s/.test(password)) {
            passwordErrors.push('\nPassword must not contain spaces.');
        }
        return passwordErrors;
    };

    const validateFields = () => {
        const newErrors = {};

        if (!firstName) newErrors.firstName = 'First name is required';

        if (!lastName) newErrors.lastName = 'Last name is required';

        if (!email) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';

        if (!password) newErrors.password = 'Password is required';
        else {
            const passwordValidationErrors = validatePassword(password);
            if (passwordValidationErrors.length > 0) {
                newErrors.password = passwordValidationErrors;
            }
        }

        if (!mobileNo) newErrors.mobileNo = 'Mobile number is required';
        else if (!/^\d{10}$/.test(mobileNo)) newErrors.mobileNo = 'Mobile number is invalid';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validateFields()) {
            console.log('Register');

            try {
                await axios.post(`http://${IpAddress}:5000/users/sign-up`, {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    number: mobileNo
                });
                navigation.navigate('Login');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const [field1, setField1] = useState(false);
    const [field2, setField2] = useState(false);
    const [field3, setField3] = useState(false);
    const [field4, setField4] = useState(false);
    const [field5, setField5] = useState(false);

    useEffect(() => {
        setField1(!!firstName);
        setField2(!!lastName);
        setField3(!!email && /\S+@\S+\.\S+/.test(email));
        setField4(!!password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(password));
        setField5(!!mobileNo && /^\d{10}$/.test(mobileNo));
    }, [firstName, lastName, email, password, mobileNo]);

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.container}>
                    <View>
                        <Text style={style.logintxt}>Register</Text>

                        <View style={style.inputbox}>

                            <View>
                                <View style={[style.innnerinputbox, { borderColor: errors.firstName ? 'red' : '#444444' }]}>
                                    <Ionicons style={style.txticon} name='person' />
                                    <TextInput
                                        style={style.txtinput}
                                        placeholder='First Name'
                                        placeholderTextColor={'#7B7A7D'}
                                        value={firstName}
                                        onChangeText={(text) => {
                                            setFirstName(text);
                                            setErrors({ ...errors, firstName: '' });
                                        }}
                                    />
                                </View>
                                {errors.firstName && <Text style={style.errorText}>{errors.firstName}</Text>}
                            </View>

                            <View>
                                <View style={[style.innnerinputbox, { borderColor: errors.lastName ? 'red' : '#444444' }]}>
                                    <Ionicons style={style.txticon} name='person' />
                                    <TextInput
                                        style={style.txtinput}
                                        placeholder='Last Name'
                                        placeholderTextColor={'#7B7A7D'}
                                        value={lastName}
                                        onChangeText={(text) => {
                                            setLastName(text);
                                            setErrors({ ...errors, lastName: '' });
                                        }}
                                    />
                                </View>
                                {errors.lastName && <Text style={style.errorText}>{errors.lastName}</Text>}
                            </View>

                            <View>
                                <View style={[style.innnerinputbox, { borderColor: errors.email ? 'red' : '#444444' }]}>
                                    <Ionicons style={style.txticon} name='mail' />
                                    <TextInput
                                        style={style.txtinput}
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
                                        style={style.txtinput}
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

                            <View>
                                <View style={[style.innnerinputbox, { borderColor: errors.mobileNo ? 'red' : '#444444' }]}>
                                    <Ionicons style={style.txticon} name='call' />
                                    <TextInput
                                        style={style.txtinput}
                                        placeholder='Mobile No.'
                                        placeholderTextColor={'#7B7A7D'}
                                        value={mobileNo}
                                        keyboardType='number-pad'
                                        maxLength={10}
                                        onChangeText={(text) => {
                                            setMobileNo(text);
                                            setErrors({ ...errors, mobileNo: '' });
                                        }}
                                    />
                                </View>
                                {errors.mobileNo && <Text style={style.errorText}>{errors.mobileNo}</Text>}
                            </View>
                        </View>

                        <View style={style.prolinesrow}>
                            <View style={[style.proline, { backgroundColor: field1 ? '#1E90FF' : 'silver' }]}></View>
                            <View style={[style.proline, { backgroundColor: field2 ? '#1E90FF' : 'silver' }]}></View>
                            <View style={[style.proline, { backgroundColor: field3 ? '#1E90FF' : 'silver' }]}></View>
                            <View style={[style.proline, { backgroundColor: field4 ? '#1E90FF' : 'silver' }]}></View>
                            <View style={[style.proline, { backgroundColor: field5 ? '#1E90FF' : 'silver' }]}></View>
                        </View>

                        <TouchableOpacity style={style.btnview} onPress={handleRegister}>
                            <Text style={style.btntxt}>Register</Text>
                        </TouchableOpacity>

                        <View style={style.linerow}>
                            <View style={style.line}></View>
                            <Text style={style.txtline}>or sign up with</Text>
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
                        <Text style={style.lasttxt}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[style.lasttxt, { color: '#1E90FF', fontFamily: 'Roboto-Bold' }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: wp(100),
        paddingHorizontal: wp(8.5),
        backgroundColor: '#1C1C1E',
    },
    logintxt: {
        fontFamily: 'Ubuntu-Medium',
        marginTop: wp(20),
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
    errorText: {
        color: 'red',
        fontSize: wp(3.5),
        marginTop: wp(1),
        marginLeft: wp(1),
    },
    prolinesrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: wp(4.5),
    },
    proline: {
        width: wp(15),
        height: hp(0.4),
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
        marginTop: hp(5),
        marginBottom: hp(3.5),
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

export default Register;