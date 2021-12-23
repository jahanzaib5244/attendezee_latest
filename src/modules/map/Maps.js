import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import database from '@react-native-firebase/database';
import moment from "moment"
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';

export default function Maps({ navigation }) {

    const Created = useSelector(state => state.AuthReducer.CreatedBusiness)

    const [open, setOpen] = useState(false);
    console.log(Created,'created bissiness');
    let business = []
    Created.map((item, index) => {
        if (item.is_tracking == 'yes') {
            const obj = { label: `${item.business_name}`, value: `${item.business_id}` }
            business.push(obj)
            console.log(obj)
        }

    })

    const [items, setItems] = useState(business);
    const [value, setValue] = useState('');
    const [location, setlocation] = useState([])


    const getdatabase = async () => {
        
            console.log(('database call'));

            database()
                .ref(`${value}/CurrentLocation`)
                .once('value')
                .then(snapshot => {
                    console.log(snapshot.exists());
                    if (snapshot.exists()) {
                        let data = []
                        {
                            Object.values(snapshot.val()).forEach(val => {
                                console.log(val)
                                data.push(val)
                            })
                        }
                        setlocation(data)
                    } else {
                        setlocation([])
                        Alert.alert(
                            "Tracking",
                            "No tracking found",
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
    }
    useEffect(() => {
        if (items.length !== 0) {
            if(value !== ''){
                getdatabase()
               }
        }else{
            Alert.alert(
                "Tracking",
                "No Tracking Bussiness found",
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
        
      
    }, [value])


    console.log(value)
    return (
        <View style={styles.container}>
            {location[0] &&
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: location[0]?.latitude,
                        longitude: location[0]?.longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.0001,
                    }}
                >
                    {location.map((val, index) => {

                        const time = moment(val.time).format("hh:mm A")
                        console.log(time)
                        return (
                            <Marker
                                key={index}
                                coordinate={{ latitude: val.latitude, longitude: val.longitude }}


                                title={`${(val.UserFname).toUpperCase()}`}
                                description={`${time}`}
                            >
                                <View style={{ alignSelf: "center" }}>
                                    <Image source={{ uri: `${val.UserPic}` }} style={{ height: 50, width: 50, borderRadius: 50 / 2 }} />


                                </View>
                            </Marker>
                        )
                    })}


                </MapView>
            }
            <View style={styles.btnContainer}>
                <View style={styles.dropdown}>
                    <DropDownPicker
                        placeholder="Select Business"
                        open={open}
                        listMode="SCROLLVIEW"
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        zIndex={1000}


                    />
                </View>
                <View>
                    <TouchableOpacity disabled={location.length == 0 ? true:false} onPress={() => navigation.navigate('users', { location, value })} style={styles.btn}><Text style={{ color: 'white', fontSize: 12 }}>Employee List</Text></TouchableOpacity>

                    <TouchableOpacity onPress={getdatabase} style={styles.btn}><Text style={{ color: 'white', fontSize: 12 }}>Reload</Text></TouchableOpacity>


                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    btn: {
        height: 35,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#494446',
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,

    },
    dropdown: {
        
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
        // justifyContent: 'space-between'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor:'white'
    },
})



// import React, { useState, useEffect } from 'react'
// import { View, Text, StyleSheet, Image, Alert } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import database from '@react-native-firebase/database';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from "moment"

// export default function Maps({ navigation }) {


//     const [location, setlocation] = useState([])


//     const getdatabase = async () => {
//         const BusinessID = await AsyncStorage.getItem('BussinessID')
//         database()
//             .ref(`${BusinessID}/CurrentLocation`)
//             .once('value')
//             .then(snapshot => {
//                 if(snapshot.exists){
//                     let data = []
//                     {
//                         Object.values(snapshot.val()).forEach(val => {
//                             console.log(val)
//                             data.push(val)
//                         })
//                     }
//                     setlocation(data)
//                 }else{
//                     Alert.alert(
//                         "Tracking",
//                         `NO Tracking found for this bussiness`,
//                         [
//                             {
//                                 text: "Cancel",
//                                 onPress: () => console.log("Cancel Pressed"),
//                                 style: "cancel"
//                             },
//                             { text: "OK", onPress: () => console.log("OK Pressed") }
//                         ]
//                     );
//                 }
              
//             });

//     }
//     useEffect(() => {
//         getdatabase()
//     }, [])


//     console.log(location)
//     return (
//         <View style={styles.container}>
//             {location[0] &&
//                 <MapView
//                     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                     style={styles.map}
//                     region={{
//                         latitude: location[0]?.latitude,
//                         longitude: location[0]?.longitude,
//                         latitudeDelta: 0.009,
//                         longitudeDelta: 0.0001,
//                     }}
//                 >
//                     {location.map((val, index) => {

//                         const time = moment(val.time).format("hh:mm A")
//                         console.log(time)
//                         return (
//                             <Marker
//                                 key={index}
//                                 coordinate={{ latitude: val.latitude, longitude: val.longitude }}
                             

//                                 title={`${val.UserFname}`}
//                                 description={`${time}`}
//                             >
//                                 <View style={{alignSelf:"center"}}>
//                                     <Image source={{ uri: `${val.UserPic}` }} style={{ height: 50, width: 50,borderRadius:50/2 }} />


//                                 </View>
//                             </Marker>
//                         )
//                     })}


//                 </MapView>
//             }
//             <View style={styles.btnContainer}>
//                 <TouchableOpacity onPress={getdatabase} style={styles.btn}><Text style={{ color: 'white' }}>Reload</Text></TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('users', { location })} style={styles.btn}><Text style={{ color: 'white' }}>Employee List</Text></TouchableOpacity>
//             </View>

//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     btn: {
//         height: 35,
//         width: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#494446',
//         alignSelf: 'flex-end',
//         marginHorizontal: 20,
//         marginTop: 10,
//         borderRadius: 10,

//     },
//     btnContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     container: {
//         // ...StyleSheet.absoluteFillObject,
//         flex: 1
//     },
// })
