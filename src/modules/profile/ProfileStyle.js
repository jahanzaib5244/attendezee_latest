import { StyleSheet ,Dimensions} from "react-native";


const {width}=Dimensions.get('window')

export const ProfileStyle = StyleSheet.create({
    root: {
        flex: 1,
       
    },

    userinfo: {
        height: 180,
        width: width,
        alignItems: 'center',
      justifyContent:'center'

    },
    userinfo_container: {
        backgroundColor: 'white',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: "5%",

    },
    email_info: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20,
        borderColor: 'lightgray',
    },
    info_heading: {
        width: 100,
    },
    info_text: {

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
        fontWeight: 'bold'
    },
    infoheading: {
        color: 'gray',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    infotext: {
        color: 'black',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    header1: {
        borderColor: 'white',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelheader: {
        alignItems: 'center'
    },
    panelhendle: {
        width: 40,
        height: 80,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10
    },
    pic_container: {
        marginLeft: '5%',
        flexDirection: 'row',
        width: "90%",
      
    },
    user_pic: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
      
    },
    user_info_text: {
        paddingTop: 10
    },
    user_firstname: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold',
        paddingLeft: 15,
        textTransform: 'capitalize'
    },
    designation_id: {
        paddingLeft: 15,
        color: 'white'
    },
    eclips: {
        position: 'absolute',
        marginTop: 0,
        right: 0
    },

})