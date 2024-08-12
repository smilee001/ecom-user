import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Text, View, Switch, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/Entypo';

const Profile = () => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    const data = [
        { id: '1', label: 'My Cart', icon: 'cart-outline' },
        { id: '2', label: 'Inbox', icon: 'email-outline' },
        { id: '3', label: 'My Notification', icon: 'bell-outline' },
        { id: '4', label: 'Address', icon: 'map-marker-outline' },
        { id: '5', label: 'Edit Profile', icon: 'account-edit-outline' },
        { id: '6', label: 'Notification', icon: 'bell-outline' },
        { id: '7', label: 'Payment', icon: 'credit-card-outline' },
        { id: '8', label: 'Security', icon: 'shield-lock-outline' },
        { id: '9', label: 'Language', icon: 'translate' },
        { id: '10', label: 'Dark Mode', icon: 'theme-light-dark' },
        { id: '11', label: 'Privacy Policy', icon: 'lock-outline' },
        { id: '12', label: 'Help Center', icon: 'help-circle-outline' },
        { id: '13', label: 'Invite Friends', icon: 'account-multiple-plus-outline' },
        { id: '14', label: 'Logout', icon: 'logout' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{ paddingVertical: hp(1.8), paddingHorizontal: wp(3.6), flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3.4) }}>
                    <Image style={{ width: wp(9.5), height: hp(4.6), borderRadius: wp(10), borderWidth: 1 }} source={require('../../images/logo.jpg')} />
                    <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(3), color: '#fff' }}>Profile</Text>
                </View>
                <Icon2 style={{ color: '#f1f1f7', fontSize: hp(4) }} name='dots-horizontal-circle-outline' />
            </View>

            <View style={{ alignItems: 'center', paddingTop: hp(0.8), paddingBottom: hp(2.7), borderBottomColor: '#494949', borderBottomWidth: wp(0.4), marginHorizontal: wp(4) }}>
                <View style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Image style={{ height: hp(16.2), width: wp(32.5), borderRadius: wp(50) }} source={require('../../images/user.png')} />
                    <Icon3 style={{ position: 'absolute', bottom: wp(3), fontSize: hp(3), color: '#101010' }} name='square-pen' />
                </View>

                <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.45), marginTop: hp(1.5), color: '#f9f9ff' }}>Nathalie Erneson</Text>

                <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.15), marginTop: hp(0.5), color: '#f9f9ff' }}>nathalie_erneson@gmail.com</Text>
            </View>

            <View style={{ flex: 1, paddingHorizontal: wp(5), paddingTop: hp(3.2) }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: hp(3.2) }}>
                            <View style={{ flexDirection: 'row', gap: wp(3) }}>
                                <Icon2 style={{ color: index === data.length - 1 ? 'red' : '#f1f1f7', fontSize: hp(3.5) }} name={item.icon} />
                                <Text style={{ fontFamily: 'Urbanist-SemiBold', fontSize: hp(2.45), color: index === data.length - 1 ? 'red' : '#f9f9ff' }}>
                                    {item.label}
                                </Text>
                            </View>
                            {index === data.length - 1 ? null : item.label === 'Dark Mode' ? (
                                <Switch
                                    trackColor={{ false: "#767577", true: "#767577" }}
                                    thumbColor={isDarkModeEnabled ? "#81b0ff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setIsDarkModeEnabled(previousState => !previousState)}
                                    value={isDarkModeEnabled}
                                />
                            ) : (
                                <Icon4 style={{ color: '#f1f1f7', fontSize: hp(2.5) }} name='chevron-thin-right' />
                            )}
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

export default Profile;
