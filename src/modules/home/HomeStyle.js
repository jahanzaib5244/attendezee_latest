import { StyleSheet } from "react-native";


export const HomeStyle = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white'
    },
    logo_container: {
        height: 150,
        width: "100%",
        backgroundColor: '#494446',
        // borderBottomRightRadius: 150,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    checkin_container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        marginLeft: '3%',
        marginRight: '3%',
        borderTopWidth: 2,
        borderColor: '#C8C8C8'

    },
    btn_container: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        marginBottom: 40,

    },
    check_btn: {
        height: 70,
        width: '23%',
        borderRightWidth: 2,
        paddingTop: '3%',
        paddingBottom: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#C8C8C8'


    },
    breakend: {
        height: 70,
        width: '23%',
        borderColor: '#C8C8C8',
        paddingTop: '3%',
        paddingBottom: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardshadow_container: {
        padding: 2,
        margin: 4,
        marginTop: 20,
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: 10,

        borderRadius: 17,
        borderWidth: 0,
        borderColor: 'transparent',

        shadowColor: '#727272',
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 1,
    },
    card_container: {
        paddingBottom: 20,
        paddingTop: 10,
        borderRadius: 17,
        borderWidth: 0,
        borderColor: '#Fff',
        backgroundColor: '#fff'
    },
    card_date: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    shiftcontainer: {
        flexDirection: 'row', justifyContent: 'space-evenly'
    },
    shift_block: {
        alignItems: "center", justifyContent: 'center'
    },
    today_text: {
        fontWeight: '800'
    },
    shift_heading: {
        fontSize: 12, paddingBottom: 10, fontWeight: '600'
    },
    shift_time: {
        fontSize: 11,
        fontWeight: '800'
    },
    hours_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    total_hours_container: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 15
    },
    Hours_heading: {
        fontSize: 13,
        paddingBottom: 5,
        fontWeight: '800'
    },
    totalBreak_container: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        paddingRight: 15
    },
    total_hours_text: {
        fontSize: 13
    },
    leave: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    leave_text: {
        fontSize: 17,
        fontWeight: '600'
    },
    btn_text: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    scannerbtn: {
        width: '88%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: '6%',
        marginRight: '6%'
    },
    scannerbtn_text: {
        width: '88%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: '6%',
        marginRight: '6%',
        
    },
    modalstyle: {
        // height: '100%',
        // width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#494446'
    },
    dropdown: {
        marginLeft: '6%',
        marginRight: '6%',
        marginTop: '3%',
        marginBottom: 1
    },
    image_container: {
        marginLeft: '5%',
        flexDirection: 'row',
        width: "90%",
        position: 'relative'
    },
    user_pic: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    useinfo_text: {
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
    slider: {
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 50,
        marginTop: 10
    },
    contentContainer: {
        marginRight: '5%',
        marginLeft: '5%',
        width: 270,
        height: 170,
        borderRadius: 15
    },
    Alertconfirmbtn: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',



    },
    rules_container: {
        marginLeft: '6%',
        marginRight: '6%',
        marginTop: '5%',
        marginBottom:20,
        backgroundColor:'#FFFDAF',
        padding:15,
        borderRadius:15,
        
    },
    rules_heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    rules_text: {
        marginTop: 10,
        textTransform:"capitalize",
        color:'black'
    }


})