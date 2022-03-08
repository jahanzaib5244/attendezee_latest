import { useSelector } from 'react-redux';
import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import React,{useState} from 'react'

export default function DropDown({selected , value }) {


    const userbussines_data = []
    
    const getbussiness = useSelector(state => state.AuthReducer.user_bussines)
    getbussiness.map((item, index) => {
        if (item.business_status == 'active' || item.business_status == 'enable') {
            const obj = { label: `${item.business_name}`, value: `${item.business_id}` }
            userbussines_data.push(obj)
        }
    })
    const [items, setItems] = useState(userbussines_data);
    const [open, setOpen] = useState(false);
      

    return (
        <View>
            <DropDownPicker
                placeholder="Select Business"
                open={open}
                listMode="SCROLLVIEW"
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={selected}
                setItems={setItems}
                zIndex={15000}
            />

        </View>
    )
}