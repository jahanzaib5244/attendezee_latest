import React,{useState} from 'react'
import { View, Text ,Image,TouchableOpacity ,StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux'
import Splash from '../../componenets/Splash'
import {  offfline } from '../../store/actions/AuthAction'
import AppConfigColors from '../../config/AppConfig'


export default function NoInternet() {

    const [Colors,URL ,Appicon,AppName ]= AppConfigColors()
     
     const [loading, setloading] = useState(false)


    const dispatch = useDispatch()

const reload=async()=>{
    dispatch(offfline(setloading))   
}

    return (
        <View style={styles.root}>
            {loading ? <Splash /> :
                <View style={{ flex: 1 }}>
                    <View style={styles.upper}>
                        <View>
                            <Image resizeMode='contain' style={styles.img} source={require('../../assets/offline.png')} />
                            <Text style={styles.txt} >No Internet Connection</Text>
                            <Text style={styles.des}>You are not connected to the internet.</Text>
                            <Text style={styles.des}>Make sure WI-Fi is on,Airplain Mode is off</Text>
                            <Text style={styles.des}>and try again</Text>
                        </View>
                    </View>
                    <View style={[styles.lower,{backgroundColor: Colors.primary}]}>
                    <TouchableOpacity onPress={reload} style={{height:60,width:'90%',backgroundColor:Colors.Primary,marginHorizontal:'5%',borderRadius:15,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:20,color:Colors.textColor}}>Reload App</Text></TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor: 'white'
    },
    img: {
 
        alignSelf: 'center',
        tintColor:'rgba(0,0,0,0.3)'
    },
    txt: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 28,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'center',

    },
    des: {
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 18,
        fontWeight:'600',
        marginHorizontal: 30,
        alignSelf: 'center'
    },
    upper: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',

    },
    lower: {
        flex: 0.4,
        
        justifyContent: 'center',
        borderTopLeftRadius:80,
        borderTopRightRadius:80,
        

    }
})

        
        
      
      
       
      
      

