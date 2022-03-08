import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import UpdateProfile from '../modules/update profile/UpdateProfile'
import Feedback from '../modules/feedback/Feedback';
import Maps from '../modules/map/Maps'
import Users from '../modules/map/Users'
import UserMap from '../modules/map/UserMap'
import Tabscreen from './Tabscreen'
import UpdatePassword from '../modules/reset password/UpdatePassword';
import AppConfigColors from '../config/AppConfig';
import NFCscreen from '../modules/nfc/NFCscreen';
import NFCwrite from '../modules/nfc/NFCwrite';

const Stack = createStackNavigator();


const StackScreen = () =>{
    const [Colors]=AppConfigColors()
    return (
    <Stack.Navigator  >
        <Stack.Screen options={{ headerShown: false }} name="home" component={Tabscreen} />
        <Stack.Screen
            options={{
                title: 'Update Profile', headerStyle: { backgroundColor: Colors.Primary, }, headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="Update_profile" component={UpdateProfile} />
        <Stack.Screen
            options={{
                title: 'Feedback',
                headerStyle: {
                    backgroundColor: Colors.Primary,
                },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="Feedback" component={Feedback} />
        <Stack.Screen
            options={{
                title: 'Maps', headerStyle: { backgroundColor: Colors.Primary, },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="Maps" component={Maps} />
        <Stack.Screen
            options={{
                title: 'Employee List', headerStyle: { backgroundColor: Colors.Primary, },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="users" component={Users} />
        <Stack.Screen
            options={({ route, navigation })=>({
                title: `${(route.params.item.UserFname).toUpperCase()}`, headerStyle: { backgroundColor: Colors.Primary, },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })}
            name="usermap" component={UserMap} />
        <Stack.Screen
            options={{
                title: 'Update Password',
                headerStyle: {
                    backgroundColor: Colors.Primary,
                },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="Update_password" component={UpdatePassword} />
        <Stack.Screen
            options={{
                title: 'NFC',
                headerStyle: {
                    backgroundColor: Colors.Primary,
                },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="NFC" component={NFCscreen} />
        <Stack.Screen
            options={{
                title: 'NFC Edit',
                headerStyle: {
                    backgroundColor: Colors.Primary,
                },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            name="NFCedit" component={NFCwrite} />


    </Stack.Navigator>
)};

export default StackScreen;