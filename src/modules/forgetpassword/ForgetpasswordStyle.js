import { StyleSheet } from "react-native";
import {Colors} from '../../config/AppConfig'



export const ForgetpasswordStyle = StyleSheet.create({
    root: {
        flex: 1,
    },
    logo_container: {
        height:180,
        width:'100%',
       justifyContent:'center',
      alignItems:'center'
    },
    input_container: {
        height:640,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    input_lable: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 25,
    },
    textheader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black',
    },
})