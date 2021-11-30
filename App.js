
import React, { useEffect } from 'react';
import { Routing } from './src/routing/Routing';
import { Provider } from 'react-redux';
import store from './src/config/Store';
import { notificationListner, requestUserPermission } from './src/componenets/Notification';
import FlashMessage from "react-native-flash-message";
import ReactNativeAN from 'react-native-alarm-notification';
import moment from 'moment'
import { NativeEventEmitter, NativeModules } from 'react-native';


const App = () => {
  // const fireDate = ReactNativeAN.parseDate(new Date());  
  const fireDate = '30-11-2021 15:43:01'
  const alarmNotifData = {
    title: "My Notification Title",
    message: "My Notification Message",
    channel: "my_channel_id",
    small_icon: "ic_launcher",
    auto_cancel:true,
    loop_sound:false,
    vibrate:true,
    volume:0.6,
    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
    data: { foo: "bar" },
  };

  const noti = async () => {
    const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
    console.log(alarm);
  }

  const { RNAlarmNotification } = NativeModules;
  const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);
  
  useEffect(() => {
    requestUserPermission()
    const dismissSubscription = RNAlarmEmitter.addListener(
      'OnNotificationDismissed', (data) => {
        console.log('dismessed')
        ReactNativeAN.removeAllFiredNotifications()
        ReactNativeAN.stopAlarmSound()
        // ReactNativeAN.deleteAlarm(data)
      }
  );
  
  const openedSubscription = RNAlarmEmitter.addListener(
    'OnNotificationOpened', (data) => {
      console.log('opened')
      ReactNativeAN.removeAllFiredNotifications()
      ReactNativeAN.stopAlarmSound()
      // ReactNativeAN.deleteAlarm(data)
    }
  );
 

noti()
const date = moment().format("DD")
const month = moment().format("MM")
const year = moment().format("YYYY")

console.log(date, month, year)
notificationListner()
return () => {
  dismissSubscription.remove();
openedSubscription.remove();
  // Anything in here is fired on component unmount.
}
  }, [])







return (
  <Provider store={store}>
    {/* <--- here as last component */}

    <Routing />
    <FlashMessage position="top" />

  </Provider>

);
};

export default App;
