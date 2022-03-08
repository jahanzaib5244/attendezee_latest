import React, { useState } from 'react'
import { View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity, ActivityIndicator,Image } from 'react-native'
import { LoginStyle } from './LoginStyle';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from "react-redux";
import { doLogin } from '../../store/actions/AuthAction';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppConfigColors from '../../config/AppConfig'



export default function Login({ navigation }) {

    const [Colors,URL ,Appicon,AppName ]= AppConfigColors()

    const invalid_user = useSelector(state => state.AuthReducer.invalid_user_email_password);
   
    const [data, setData] = useState({
        secureTextEntry: true,
    });
    const [email_empty, setemail_empty] = useState('')
    

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const douserlogin = (em,pass) => {
        setemail_empty('')
          if (em !== '' && pass!=='') {
            dispatch(doLogin(setloading, em, pass));
          } else {
              setemail_empty('Email or Password should not be empty')
          }
        
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    return (

        <View style={[LoginStyle.root,{ backgroundColor:Colors.Primary}]}>
            <StatusBar backgroundColor={Colors.Primary} barStyle="light-content" />
            <KeyboardAwareScrollView 
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            >
            <View style={LoginStyle.logo_container}>
                <Image style={{width:75,height:75,opacity:0.9,marginBottom:-8}} source={require('../../assets/app_logo.png')}/>
                <Text style={{color:Colors.textColor,fontSize:28,letterSpacing:2,marginTop:10}}>{AppName}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={LoginStyle.input_container}>
                <Text style={LoginStyle.input_lable}>Email</Text>
                <View style={LoginStyle.action}>
                    <FontAwesome
                        name="user-o"
                        color="gray"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email Address..."
                        placeholderTextColor="#666666"
                        style={LoginStyle.textInput}
                        autoCapitalize="none"
                        onChangeText={text => setemail(text)}
                    />
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                </View>
                <Text style={LoginStyle.input_lable}>Password</Text>
                <View style={LoginStyle.action}>
                    <Feather
                        name="lock"
                        color='gray'
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry}
                        style={LoginStyle.textInput}
                        autoCapitalize="none"
                        onChangeText={text => setpassword(text)}

                    />
                    
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                 <Text style={{ color: '#FF6666',marginTop:10 }}>{invalid_user}</Text>  
                  <Text style={{ color: '#FF6666' }}>{email_empty}</Text> 
                
               
                <TouchableOpacity style={{paddingVertical:15}} onPress={() => navigation.navigate('Forgetpassword')}>
                    <Text style={{ color:Colors.Primary, }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={LoginStyle.button}>
                    {loading ?
                        <View
                            
                            style={LoginStyle.signIn}
                        ><LinearGradient
                            colors={[Colors.Primary, Colors.Primary]}
                            style={LoginStyle.signIn}
                        >
                                <ActivityIndicator size="small" color="white" />
                            </LinearGradient>
                        </View>
                        :
                        <TouchableOpacity
                            onPress={()=>douserlogin(email,password)}
                            style={LoginStyle.signIn}
                        ><LinearGradient
                            colors={[Colors.Primary, Colors.Primary]}
                            style={LoginStyle.signIn}
                        >
                                <Text style={[LoginStyle.textSign,{color:Colors.textColor}]}
                                >Log In</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }


                </View>
            </Animatable.View>
            </KeyboardAwareScrollView>
        </View>



    )
}
