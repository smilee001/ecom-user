import React, { useState } from 'react'
import { Image, ImageBackground, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/Entypo';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Cancelled from './orders/Cancelled';
import Completed from './orders/Completed';
import Ongoing from './orders/Ongoing';

const renderScene = SceneMap({
    first: Ongoing,
    second: Completed,
    third: Cancelled
});

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white', height: hp(0.3) }}
        style={{ backgroundColor: '#000' }}  // Change tab bar background color here
        renderLabel={({ route, focused, color }) => (
            <Text style={{ fontSize: hp(2.2), textTransform: 'none', fontFamily: 'Urbanist-SemiBold', marginBottom: hp(1), color: focused ? '#fff' : '#808080' }}>
                {route.title}
            </Text>
        )}
    />
);

const Order = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Ongoing' },
        { key: 'second', title: 'Completed' },
        { key: 'third', title: 'Cancelled' },
    ]);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: wp(3.6) }}>
                <View style={{ paddingVertical: hp(1.8), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3.4) }}>
                        <Image style={{ width: wp(9.5), height: hp(4.6), borderRadius: wp(10), borderWidth: 1 }} source={require('../../images/logo.jpg')} />
                        <Text style={{ fontFamily: 'Urbanist-Bold', fontSize: hp(3), color: '#fff' }}>My Orders</Text>
                    </View>
                    <Icon2 style={{ color: '#f1f1f7', fontSize: hp(4) }} name='dots-horizontal-circle-outline' />
                </View>

                <View style={{ flex: 1 }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: wp(100) }}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </View>
        </>
    )
}

export default Order;