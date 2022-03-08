import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from './Style'
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import base64 from 'react-native-base64'
import LottieView from 'lottie-react-native';
import DropDown from '../../componenets/DropDown';
import AppConfigColors from '../../config/AppConfig';
import Feather from 'react-native-vector-icons/Feather';
import {getattendance} from './useNfc'
import GetLocation from 'react-native-get-location'



export default function NFCscreen({navigation}) {
  const [Colors] = AppConfigColors()
  const [shift, setshift] = useState('Start_shift')
  const [model, setmodel] = useState(false)
  const [value, setValue] = useState('');
  const [message, setmessage] = useState('')

  const [process, setprocess] = useState('search')

  useEffect(() => {
    const nfcInit = async () => {
      const supported = await NfcManager.isSupported();
     
      if (supported) {
        await NfcManager.start();
      }
    }
    nfcInit()
  }, [])
  const locationUpdate =async (selectedShift) => {
    
    if(value !== ''){
      setprocess('search')
      
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(location => {
            setmodel(true)
            readNdef(selectedShift,location.latitude,location.longitude)
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
            if (code == 'UNAVAILABLE') {
                RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
                    result => {
                        if (result === RNSettings.ENABLED) {

                        }
                    },
                );
            }
        })
}
  }
  


  async function readNdef(selectedShift,latitude,longitude) {
   
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag2 = await NfcManager.getTag();
      // console.warn('Tag found', tag2);
      const techs = getTechList(tag2)
    
      const ndef =
        Array.isArray(tag2.ndefMessage) && tag2.ndefMessage.length > 0
          ? tag2.ndefMessage[0]
          : null;
   
      let text = Ndef.text.decodePayload(ndef.payload)
  
      try {
        const decoded = base64.decode(text);
        const obj = JSON.parse(decoded)
     
        setprocess('loading')
        // locationUpdate()
        getattendance(setmessage,obj.id,selectedShift,value,setprocess,latitude,longitude)
        NfcManager.cancelTechnologyRequest(); 
      } catch (error) {
       
        NfcManager.cancelTechnologyRequest();
      }


    } catch (ex) {
      console.warn('Oops!', ex);
    } 
  }
  const getTechList = (tag) => {
    let techs = [];
    if (Platform.OS === 'ios') {
      if (!tag.tech) {
        // it might happen when we use legacy `registerTagEvent`
        return ['Ndef'];
      }
      techs.push(tag.tech);
    } else {
      techs = tag.techTypes;
    }
    return techs.map((tech) => tech.replace(/android\.nfc\.tech\./, ''));
  }







  return (
    <View style={styles.root}>
       <TouchableOpacity onPress={() => navigation.navigate('NFCedit')} style={{ backgroundColor: Colors.Primary, marginTop: 30, justifyContent: 'center', alignItems: 'center', height: 60, width: '90%', marginHorizontal: '5%', borderRadius: 20 }}>

              <Text style={{ color: Colors.textColor, fontSize: 18, fontWeight: '700' }}>Edit NFC Card</Text>
            </TouchableOpacity>
      <View style={{ marginTop: 30, marginHorizontal: '5%' }}>
        <DropDown
        selected={setValue} value={value}
        />
      </View>
     {value == '' ? <Text style={{marginHorizontal:30,marginTop:6,color:'#ff2600',fontSize:14}}>select bussiness first</Text> : null}
      <View style={{ marginHorizontal: '5%', marginTop: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            onPress={() => {
              setshift("Start_shift")
             
              locationUpdate("Start_shift")
            }} style={{ height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: shift == 'Start_shift' ? Colors.Primary : 'white', width: 100, borderRadius: 20 }}>
            <Feather name='log-in' size={40} color={ shift == 'Start_shift' ? Colors.textColor : 'black'} />
            {/* <Text style={{ color: shift == 'Start_shift' ? Colors.textColor : 'black', fontWeight: '700' }}>Check In</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
             
              setshift('End_shift')
              locationUpdate('End_shift')
            }
            } style={{ height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: shift == 'End_shift' ? Colors.Primary : 'white', width: 100, borderRadius: 20 }}>
            <Feather name="log-out" size={40} color={ shift == 'End_shift' ? Colors.textColor : 'black'} />
            {/* <Text style={{ color: shift == 'End_shift' ? Colors.textColor : 'black', fontWeight: '700' }}>Check out</Text> */}
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => {
              setshift('Start_break')
             
              locationUpdate('Start_break')
            }} style={{ height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: shift == 'Start_break' ? Colors.Primary : 'white', width: 100, borderRadius: 20 }}>
            <Feather name='bell' size={40} color={shift == 'Start_break' ? Colors.textColor : 'black'} />
            {/* <Text style={{ color: shift == 'Start_break' ? Colors.textColor : 'black', fontWeight: '700' }}>Break Start</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
           
            setshift('End_break')
            locationUpdate('End_break')
          }} style={{ height: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: shift == 'End_break' ? Colors.Primary : 'white', width: 100, borderRadius: 20 }}>
            <Feather name='bell-off' size={40} color={shift == 'End_break' ? Colors.textColor : 'black'} />
            {/* <Text style={{ color: shift == 'End_break' ? Colors.textColor : 'black', fontWeight: '700' }}>Break end</Text> */}
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={model}
        onRequestClose={() => {
          setmodel(false)
        }}
      >
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View />
          <View style={{ height: '50%', width: '90%', backgroundColor: '#D3D3D3', marginHorizontal: '5%', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'space-between' }}>
            <Text style={{ alignSelf: 'center', top: 30, fontSize: 20, fontWeight: '700' }}>NFC Scanning</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

              {process == 'search' ?
                <LottieView
                  source={require('../../assets/nfcCard.json')}
                  autoPlay loop
                  style={{ height: 220, width: 220 }}
                />
                : process == 'loading' ?
                  <LottieView
                    source={require('../../assets/loading.json')}
                    autoPlay loop
                    style={{ height: 200, width: 200 }}
                  />
                  : process == 'success' ?
                    <LottieView
                      source={require('../../assets/complete.json')}
                      autoPlay loop
                      style={{ height: 200, width: 200 }}
                    />
                    : process == 'error' ?
                      <LottieView
                        source={require('../../assets/error.json')}
                        autoPlay loop
                        style={{ height: 200, width: 200 }}
                      />
                    : process == 'warning' ?
                      <LottieView
                        source={require('../../assets/warning.json')}
                        autoPlay loop
                        style={{ height: 200, width: 200 }}
                      />
                      : null
              }</View>
              <Text style={{bottom:20,alignSelf:'center',fontSize:16,paddingHorizontal:30,textAlign:'center'}}>{message}</Text>
            <TouchableOpacity onPress={() => {
              setmodel(false)
              return NfcManager.cancelTechnologyRequest()
            }} style={{ backgroundColor: Colors.Primary, bottom: 10, justifyContent: 'center', alignItems: 'center', height: 60, width: '90%', marginHorizontal: '5%', borderRadius: 20 }}>

              <Text style={{ color: Colors.textColor, fontSize: 18, fontWeight: '700' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}