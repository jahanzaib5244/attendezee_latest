import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LeaveStyle } from './LeaveStyle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import { doRequestLeave, viewLeave } from '../../store/actions/AuthAction';
import AwesomeAlert from 'react-native-awesome-alerts';
import Textarea from 'react-native-textarea';
import { onStart,onStop } from '../../componenets/BackgroundService';
import database from '@react-native-firebase/database';

export default function Leave() {
    const getbussiness = useSelector(state => state.AuthReducer.user_bussines)

    const dispatch = useDispatch()
    const [datefrom, setdatefrom] = useState(false);
    const [dateto, setdateto] = useState(false);
    const [from, setfrom] = useState('')
    const [to, setto] = useState('')
    const [open, setOpen] = useState(false);

    const [description, setdescription] = useState('')
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)
    const [showAlert, setshowAlert] = useState(false)
    const [UpdtaeMessage, setUpdtaeMessage] = useState('')

    // drop down picker logics
    const userbussines_data = []
    getbussiness.map((item, index) => {
        const obj = { label: `${item.business_name}`, value: `${item.business_id}` }
        userbussines_data.push(obj)
    })
    // console.log(userbussines_data)

    const [items, setItems] = useState(userbussines_data);
    const [value, setValue] = useState('');

    // date picker model logics
    const showfromDatePicker = () => {
        setdatefrom(true);
    };
    const showtoDatePicker = () => {
        setdateto(true);
    };

    const hidefromDatePicker = () => {
        setdatefrom(false);
    };
    const hidetoDatePicker = () => {
        setdateto(false);
    };

    const handleConfirm = (date) => {
        const dateString = JSON.stringify(date)
        // console.log(dateString)
        setfrom((dateString.slice(1, 11)));

        hidefromDatePicker();
    }
    const getdatabase = async () => {
       const res= await database().ref('UserGpsState').remove();
       console.log(res)
       
    }

    const Confirm = (date) => {
        const dateString = JSON.stringify(date)
        // console.log(dateString)
        setto((dateString.slice(1, 11)));

        hidetoDatePicker();
    }

    const request = async (des) => {
        setmessage('')
        if (des !== '' && value !== '' && from !== '' && to !== '') {
            dispatch(doRequestLeave(setUpdtaeMessage, setshowAlert, setloading, value, des, from, to))
            dispatch(viewLeave(value))
        } else {
            setmessage('All field are require')
        }

    }

    return (
        <View style={LeaveStyle.root}>
            <StatusBar backgroundColor='#494446' barStyle="light-content" />


            <ScrollView nestedScrollEnabled={true}>
                <View style={LeaveStyle.dropdown1}>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        placeholder="Select Business"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        zIndex={1000}
                    />
                </View>
                <View style={LeaveStyle.date_container}>

                    <View>
                        <TouchableOpacity style={LeaveStyle.date_btn} onPress={showfromDatePicker}>
                            <Text style={LeaveStyle.btn_text}>From</Text>
                            <Ionicons
                                size={25}
                                name='calendar-outline'
                                color="#494446"
                            />
                            <Text style={LeaveStyle.date_text}>{from}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={datefrom}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hidefromDatePicker}
                        />
                        <TouchableOpacity style={LeaveStyle.date_btn} onPress={showtoDatePicker}>
                            <Text style={LeaveStyle.btn_text}>To</Text>
                            <Ionicons
                                size={25}
                                name='calendar-outline'
                                color="#494446"
                            />
                            <Text style={LeaveStyle.date_text}>{to}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={dateto}
                            mode="date"
                            onConfirm={Confirm}
                            onCancel={hidetoDatePicker}
                        />

                    </View>
                    <Text style={LeaveStyle.page_heading}>Application for leave</Text>
                    
                        <Textarea
                            containerStyle={{  height: 150,borderWidth:2,borderColor:'#C8C8C8',
                                padding: 5,
                                
                                backgroundColor: '#ffffff',}}
                            style={{ textAlignVertical: 'top',  // hack android
                            height: 150,
                            fontSize: 14,
                            color: '#333',}}
                            onChangeText={text => setdescription(text)}
                            
                            maxLength={200}
                            placeholder={'Leave reason...'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                        {/* <TextInput style={{ color: 'black', padding: 10 }} placeholder='Leave reason...' multiline onChangeText={text => setdescription(text)} /> */}
               
                    <Text style={LeaveStyle.message}>{message}</Text>
                </View>
                {loading ?
                    <View style={LeaveStyle.request_btn}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                    :
                    <TouchableOpacity onPress={() => request(description)} style={LeaveStyle.request_btn}>
                        <Text style={LeaveStyle.requestbtn_text}>Request</Text>
                    </TouchableOpacity>
                }
                {loading ?
                    <View style={LeaveStyle.request_btn}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                    :
                    <TouchableOpacity onPress={() => onStart()} style={LeaveStyle.request_btn}>
                        <Text style={LeaveStyle.requestbtn_text}>start</Text>
                    </TouchableOpacity>
                }
                {loading ?
                    <View style={LeaveStyle.request_btn}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                    :
                    <TouchableOpacity onPress={() => onStop()} style={LeaveStyle.request_btn}>
                        <Text style={LeaveStyle.requestbtn_text}>end</Text>
                    </TouchableOpacity>
                }
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Update Profile"
                    message={UpdtaeMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}

                    showConfirmButton={true}
                    contentContainerStyle={LeaveStyle.contentContainer}
                    confirmButtonStyle={LeaveStyle.confirmButton}
                    confirmText="ok"
                    confirmButtonColor="green"
                    onConfirmPressed={() => setshowAlert(false)}

                />





            </ScrollView>
        </View>
    )
}
//359322