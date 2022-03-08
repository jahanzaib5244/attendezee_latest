import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { LeaveStyle } from './LeaveStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import { doRequestLeave, viewLeave } from '../../store/actions/AuthAction';
import DropDown from '../../componenets/DropDown';


export default function ViewLeave() {
    const leavedata = useSelector(state => state.AuthReducer.leavedata)




    const [value, setValue] = useState('');
    const [refresh, setrefresh] = useState(false)
    const [message, setmessage] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        setmessage(null)
        if (value !== '') {
            dispatch(viewLeave(setrefresh,value))
        }
        else{
          setmessage('please select business first')
        }
    }, [value])
    const getviewleave=()=>{
        if (value !== '') {
            
            dispatch(viewLeave(setrefresh,value))
           
        } else{
            setmessage('please select business first')
          }
       
    }
    const renderdata = (item) => {
        var text_color = "black"
        var st_bg = 'white'
        if (item.status == "pending") {
            text_color = '#000000'
            st_bg = '#FFFDAF'


        } else {
            if (item.status == "success") {
                text_color = '#FFFFFF'
                st_bg = "#87EA55"
            } else {
                if (item.status == "rejected") {
                    text_color = '#ffffff'
                    st_bg = '#F76F72'
                }
            }
        }
        return (
            <View

                style={LeaveStyle.shadow_container}>
                <View style={LeaveStyle.shadow_inner}>
                    <View style={LeaveStyle.status_container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 150, backgroundColor: `${st_bg}`, paddingTop: 5, paddingBottom: 5, borderRadius: 150, }}>
                            {/* <Text style={LeaveStyle.status}>Status : </Text> */}
                            <Text style={[LeaveStyle.status_text, { color: `${text_color}` }]}>{item.status}</Text>
                        </View>
                    </View>
                    <View style={LeaveStyle.date_container1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={LeaveStyle.date_heading}>From :</Text>
                            <Text>{item.from_date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={LeaveStyle.date_heading}>To :</Text>
                            <Text>{item.to_date}</Text>
                        </View>

                    </View>
                    <View style={LeaveStyle.reason_container}>
                        <Text style={LeaveStyle.reason_text}>Reason</Text>
                        <Text>{item.description}</Text>
                    </View>
                </View>
            </View>
        )

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={LeaveStyle.dropdown}>
            <DropDown selected={setValue} value={value} />
                {message && <Text style={{marginTop:'2%',color:'#F76F72'}}>{message}</Text>}
            </View>
            

            <FlatList
                data={leavedata}
                renderItem={({ item }) => renderdata(item)}
                keyExtractor={(i, k) => k.toString()}
                refreshing={refresh}
                onRefresh={getviewleave}
            />

        </View>
    )
}
