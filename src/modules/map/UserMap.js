import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import database from '@react-native-firebase/database';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function UserMap({ route, navigation }) {

    const [location, setlocation] = useState([])
  const [showdatepicker, setshowdatepicker] = useState(false)
  const [selected_date, setselected_date] = useState('')

  const hideDatePicker = () => {
    setshowdatepicker(false)
  }
    const { item } = route.params;
    console.log(item);


    const Confirm = (date) => {

        const dateString = JSON.stringify(date)
        console.log(dateString)
        setselected_date((dateString.slice(1, 11)));
        console.log(selected_date);
        hideDatePicker();
      }

    const getdatabase = async () => {
        console.log('getting user data')
        database().ref(`locationHistory/${item.uid}/${selected_date}`).orderByChild('date').equalTo(`${selected_date}`).once("value",snapshot => {
           console.log(snapshot.exists());
            if (snapshot.exists()){
              const userData = snapshot.val();
              console.log("exists!", userData);
              database()
                  .ref(`locationHistory/${item.uid}`).orderByChild('date').equalTo(`${selected_date}`)
                  .once('value')
                  .then(snapshot => {
      
                      let data = []
                      {
                          Object.values(snapshot.val()).forEach(val => {
                              console.log(val)
                              data.push(val)
                          })
                      }
                      setlocation(data)
                  });
            }else{
                alert('Location not exists')
            }
        });
     

    }

    const coordinates = []

    location.map((item, index) => {
        coordinates.push({
            latitude:  item.lat,
            longitude: item.lng
        })
    })
    console.log(coordinates)

    useEffect(() => {
        // getdatabase()

    }, [])
    const selectdate=()=>{

    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: location[0] ? location[0].lat : 31.4339259,
                    longitude: location[0] ? location[0].lng : 73.0846579,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {location.map((val, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: val.lat, longitude: val.lng }}
                        style={{ height: 50, width: 120 }}

                        title={`${val.empName}`}
                        description={`${val.date}`}
                    />
                ))}

                <Polyline
                    coordinates={coordinates}
                    strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={1}
                />
            </MapView>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => setshowdatepicker(true)} style={styles.btn}><Text style={{ color: 'white' }}>Select Date</Text></TouchableOpacity>
                <TouchableOpacity onPress={getdatabase} style={styles.btn}><Text style={{ color: 'white' }}>Show route</Text></TouchableOpacity>
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
        backgroundColor: '#494446',
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1
    },
})

