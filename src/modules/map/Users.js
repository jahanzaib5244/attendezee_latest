import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import AppConfigColors from '../../config/AppConfig'

export default function Users({ route, navigation }) {

    const [Colors]= AppConfigColors()
    const { location } = route.params;
    const { value } = route.params;


    return (
        <View style={styles.root}>
            <ScrollView style={{ marginHorizontal: '5%', width: '100%' }}>
                {location.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate("usermap", { item,value })} key={index} style={[styles.cardContainer,{ shadowColor: Colors.Primary,}]}>
                        <Image style={styles.cardPic} source={{ uri: `${item.UserPic}` }} />
                        <View style={styles.textContainer}><Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '700', paddingBottom: 5, textTransform: 'capitalize' }}>{item.UserFname}  {item.UserLname}</Text><Text> ID# {item.UserID}</Text></View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',

    },
    cardContainer : {
       
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,


        marginTop: 10,
        backgroundColor: 'white',
        height: 90,
        padding: 15,
        flexDirection: 'row',
        width: '90%',
        borderRadius: 15,
        elevation: 3,
        margin: 1,
    },
    cardPic: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2
    },
    textContainer: {
        paddingLeft: 20,
        paddingTop: 10,
        flex: 1
    }
})