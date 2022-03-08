import React, { useRef, useEffect } from 'react'
import { View, Text, Image, Animated } from 'react-native'
import LottieView from 'lottie-react-native';
import AppConfigColors from '../config/AppConfig'


export default function Splash() {
  const [Colors, URL, Appicon, AppName] = AppConfigColors()

  const bgColor = useRef(new Animated.Value(0)).current
  const boxInterpolation = bgColor.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#6d4949','black' ,'#494446']
  })
  const animationStyle = {
    backgroundColor: boxInterpolation
  }
  const startAnimation = () => {
    Animated.timing(bgColor, {
      toValue: 1,
      duration: 2500,
      useNativeDriver:false,
    }).start()
  }
  useEffect(() => {
    startAnimation()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{flex:1,backgroundColor:'rgba(0,0,0,02)'}}>
      <Animated.View  style={[animationStyle,{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: 90, width: 90 }} source={require("../assets/app_logo.png")} />
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 }}>{AppName}</Text>
        </View>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={require('../assets/scanner.json')}
            autoPlay loop
            style={{ height: 200, width: 200 }}
          />
        </View>
        <View style={{ flex: 0.6 }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ height: 50, width: 50, marginBottom: 10 }} source={require('../assets/cgit.png')} />

        </View>
        <Text style={{ fontSize: 13, color: 'white' }}>Powered By </Text>
        <Text style={{ fontSize: 13, color: 'white', marginBottom: '10%' }}>Convert Generation Information Technology</Text>
      </Animated.View>
      </View>
    </View>
  )
}
