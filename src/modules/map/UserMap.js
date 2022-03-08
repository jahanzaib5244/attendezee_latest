import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import database from '@react-native-firebase/database';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfigColors from '../../config/AppConfig'


export default function UserMap({ route, navigation }) {
    const [Colors]= AppConfigColors()
    const { item, value } = route.params;
    console.log(value, 'item');


    const [location2, setlocation2] = useState([])
    const [showdatepicker, setshowdatepicker] = useState(false)
    const [SelectedDate, setSelectedDate] = useState('')
    const [loading, setloading] = useState(false)



    const getdatabase = async () => {
        console.log('getting user data')
        setloading(true)

        const BusinessID = await AsyncStorage.getItem('BussinessID')
        console.log(SelectedDate, BusinessID)

        await database().ref(`${value}/locationHistory/${item.UserID}/${SelectedDate}/`).orderByValue('time').once("value", snapshot => {
            console.log(snapshot.exists());
            if (snapshot.exists()) {
                // const userData = snapshot.val();
                // console.log("exists!", userData);
                let data = []
                {
                    Object.values(snapshot.val()).forEach(val => {
                        console.log(val)
                        data.push(val)
                    })
                }
                sorted = data.sort(function (a, b) {
                    return a.time - b.time;
                });
                setlocation2(sorted)
                setloading(false)

            } else {
                Alert.alert(
                    "Tracking",
                    `location not found with this date ${SelectedDate}`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }

        });

        setloading(false)
    }
    useEffect(() => {
        if(SelectedDate !== ''){
            getdatabase()
        }
    }, [SelectedDate])

    const hideDatePicker = () => {
        setshowdatepicker(false) 
    }



    const Confirm = async (date) => {
        setSelectedDate(moment(date).format("DD-MM-YYYY"))
        hideDatePicker();

    }
    return (
        <View style={styles.container}>
            {location2.length !== 0 ?
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {location2.map((val, index) => {
                        const time = moment(val.time).format("hh:mm A")
                        console.log(time)
                       
                        if (index == 0 || index + 1 == location2.length) {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: val.latitude, longitude: val.longitude }}
                                    style={{ height: 50, width: 120 }}

                                    title={`${(val.UserFname).toUpperCase()}`}
                                    description={`${time}`}
                                />
                            )
                        }

                    })}

                    <Polyline
                        coordinates={location2}
                        strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={['#7F0000']}
                        strokeWidth={4}
                    />
                </MapView> :
                null
            }
            <View style={styles.btnContainer}>

                {loading ? <View style={[styles.Text,{backgroundColor: Colors.Primary,}]}><ActivityIndicator size={20} color='white' /></View>
                    :
                    <TouchableOpacity onPress={() => setshowdatepicker(true)} style={styles.Text}><Text style={{ color: 'white' }}>{SelectedDate == '' ? `Select Date` : SelectedDate}</Text></TouchableOpacity>
                }

               
            </View>
            <DateTimePickerModal
                isVisible={showdatepicker}
                mode="date"
                date={new Date()}
                onConfirm={Confirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    btn: {
        height: 35,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,

    },
    Text: {
        height: 35,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {

        flex: 1
    },
})