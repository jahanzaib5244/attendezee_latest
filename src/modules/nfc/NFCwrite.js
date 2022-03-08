import { View, Text,TextInput,TouchableOpacity,Modal } from 'react-native'
import React,{useState ,useEffect} from 'react'
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import base64 from 'react-native-base64'
import LottieView from 'lottie-react-native';
import AppConfigColors from '../../config/AppConfig'

export default function NFCwrite() {

  const [Colors] = AppConfigColors()
  const [model, setmodel] = useState(false)
  const [process, setprocess] = useState('search')
  const [message, setmessage] = useState('')
  const [isEmpty, setisEmpty] = useState(false)

  useEffect(() => {
    const nfcInit = async () => {
      const supported = await NfcManager.isSupported();
 
      if (supported) {
        await NfcManager.start();
      }
    }
    nfcInit()
  }, [])

  const [id, setid] = useState('')
  
  
  async function writeNdef() {
    if(id !== ''){
      setisEmpty(false)
    setprocess('search')
    setmodel(true)
    let value={
      id,
    }
    const stringify=JSON.stringify(value)
    const encText = base64.encode(stringify);


    let result = true;
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NDEF',
      });
      let bytes = null;
     
        bytes = Ndef.encodeMessage([Ndef.textRecord(encText)]);
       
        if (bytes) {
          await NfcManager.ndefHandler.writeNdefMessage(bytes);
  
          if (Platform.OS === 'ios') {
            await NfcManager.setAlertMessageIOS('Success');
          }
          setprocess('success')
          result = true;
        }

    } catch (ex) {
      console.warn(ex);
      setprocess('error')
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }else{
    setisEmpty(true)
  }
}
  
  
  
  
  return (
    <View style={{flex:1,}}>
      <Text style={{marginHorizontal:'5%',marginTop:30}}>Employee ID#</Text>
     <TextInput
      style={{width:'90%',marginHorizontal:'5%',color:'black',backgroundColor:'white',paddingHorizontal:20,marginTop:10,paddingVertical:10,borderRadius:8}}
      placeholder={'plz enter Employee ID#'}
      placeholderTextColor='gray'
      onChangeText={(e)=>setid(e)}
      />
     {isEmpty ? <Text style={{marginHorizontal:30,marginTop:5,color:'#ff2600'}}>plz enter the employee id </Text> :null}
       <TouchableOpacity onPress={() => writeNdef()} style={{ backgroundColor: Colors.Primary, marginTop: 30, justifyContent: 'center', alignItems: 'center', height: 60, width: '90%', marginHorizontal: '5%', borderRadius: 20 }}>

<Text style={{ color: Colors.textColor, fontSize: 18, fontWeight: '700' }}>Edit NFC Card</Text>
</TouchableOpacity>
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
            {message !== '' ? <Text style={{bottom:20,alignSelf:'center',fontSize:16,paddingHorizontal:30,textAlign:'center'}}></Text> : null }
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