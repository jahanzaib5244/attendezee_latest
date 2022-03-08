import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from "react-redux";

export default function AppConfigColors() {
    const primaryColor = useSelector(state => state.AuthReducer.PrimaryColor)
const secondaryColor = useSelector(state => state.AuthReducer.SecondaryColor)
const appName = useSelector(state => state.AuthReducer.AppName)
const textColor = useSelector(state => state.AuthReducer.TextColor)
const url = useSelector(state => state.AuthReducer.URL)
const logo = useSelector(state => state.AuthReducer.Logo)

const Colors={
    Primary:primaryColor,
    Secondary:secondaryColor,
    TabActiveIconColor:textColor,
    textColor:textColor,
    TabInactiveIconColor:'gray',

}
 const URL= url

 const Appicon=logo

 const AppName=appName

  return [Colors ,URL ,Appicon,AppName ]
}

// over all App config    //https://www.attendezz.com/dashboard/api/index.php?action=app_config





 



