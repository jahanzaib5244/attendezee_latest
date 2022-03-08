import React,{useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { feedback } from '../../store/actions/AuthAction'
import { FeedbackStyle } from './FeedbackStyle'
import AwesomeAlert from 'react-native-awesome-alerts';
import Textarea from 'react-native-textarea';
import AppConfigColors from '../../config/AppConfig'


export default function Feedback() {
    const [Colors]= AppConfigColors()
    const [feedtext, setfeedtext] = useState('')
    const [isempty, setisempty] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [submitted, setsubmitted] = useState('')
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const submitfeedback=()=>{
        setisempty('' )
        if (feedtext !== '') {
            dispatch(feedback(setloading,setsubmitted,setshowAlert,feedtext))
        }else{
           setisempty('Field could not be empty' )
        }
    
       
    }
    return (
        <View style={[FeedbackStyle.root,{backgroundColor:Colors.primary}]}>
            <View style={FeedbackStyle.input_container}>
                <Text style={FeedbackStyle.input_label}>Suggestion / Problem </Text>
                <Textarea
                            containerStyle={{  height: 150,borderWidth:2,borderColor:'#C8C8C8',
                                padding: 5,
                                
                                backgroundColor: '#ffffff',}}
                            style={{ textAlignVertical: 'top',  // hack android
                            height: 150,
                            fontSize: 14,
                            color: '#333',}}
                            onChangeText={text => setfeedtext(text)}
                            
                            maxLength={200}
                            placeholder={'Suggestion / Problem...'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
           
               
               <Text style={{marginLeft:'6%',color:'#FF6666'}}>{isempty}</Text>
               {loading ?
               <View  style={FeedbackStyle.submit_btn}>
               <ActivityIndicator size="small" color="white"/>
           </View>
            : 
                <TouchableOpacity onPress={submitfeedback} style={[FeedbackStyle.submit_btn,{backgroundColor:Colors.Primary,}]}>
                <Text style={FeedbackStyle.submit_text}>Submit</Text>
            </TouchableOpacity>
               }
              
            </View>
            <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Feedback submitted"
                    message={submitted}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}

                    showConfirmButton={true}
                    contentContainerStyle={FeedbackStyle.contentContainer}
                    confirmButtonStyle={FeedbackStyle.confirmButton}
                    confirmText="ok"
                    confirmButtonColor="green"
                    onConfirmPressed={() => setshowAlert(false)}

                />
        </View>
    )
}
