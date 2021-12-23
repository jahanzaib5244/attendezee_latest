import messaging from '@react-native-firebase/messaging';
import { showMessage, hideMessage } from "react-native-flash-message";
import PushNotification, {Importance} from "react-native-push-notification";
import moment from 'moment';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const notificationListner=async()=>{
messaging().onNotificationOpenedApp(remoteMessage =>{
    console.log("notofication caused app to open from background", remoteMessage)
})
messaging().onMessage(async remoteMessage =>{
    console.log("receive in Foreground",remoteMessage)
    const hours=new Date(remoteMessage.sentTime).getHours()
    const time=new Date(remoteMessage.sentTime).getMinutes()
    showMessage({
      hideStatusBar:true,
      type: "default",
       backgroundColor: "green", // background color
       color: "#FFFFFF", // text color
      icon:'success',
      message: `${remoteMessage.notification.title}`,
      description: `${remoteMessage.notification.body} ${hours}:${time}`,
      
    });
})

messaging().getInitialNotification().then(remoteMessage =>{
    if(remoteMessage){
        console.log("notification caused app open from quit state",remoteMessage.notification)
    }
})
}
export const RemoveReminder=()=>{
  PushNotification.cancelAllLocalNotifications()
}

export const reminder=(time,name,img)=>{
  console.log('notification',time,name,img)
 
  const Ntime=time.split(':')
  const Ntime2=parseInt(Ntime[1]) + 4
  const Ntime3=parseInt(Ntime[1]) + 8
  console.log(Ntime2,"add")
  const day = moment().format("DD")
  const month =( moment().format("MM")) -1
  const year = moment().format("YYYY")
  console.log(day,month,year)
  const DateObject=new Date(year,month,day,Ntime[0],Ntime[1],0,0)
  const DateObject2=new Date(year,month,day,Ntime[0],Ntime2,0,0)
  const DateObject3=new Date(year,month,day,Ntime[0],Ntime3,0,0)
 
  
  PushNotification.localNotificationSchedule({
      channelId: "channel-id",
      //... You can use all the options from localNotifications
      title: name,
      picture:img,
      message: "You have not checkout yet plz checkout first", // (required)
      date: DateObject,// in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      vibrate: true, // (optional) default: true
      vibration: 2000,
      playSound: true,
      soundName: "noti.wav", 
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });


    PushNotification.localNotificationSchedule({
      channelId: "channel-id",
      //... You can use all the options from localNotifications
      title: name,
      picture:img,
      message: "You have not checkout yet plz checkout first", // (required)
      date: DateObject2,// in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      vibrate: true, // (optional) default: true
      vibration: 500,
      playSound: true,
      soundName: "noti.wav", 
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });


    PushNotification.localNotificationSchedule({
      channelId: "channel-id",
      //... You can use all the options from localNotifications
      title: name,
      picture:img,
      message: "You have not checkout yet plz checkout first", // (required)
      date: DateObject3,// in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      vibrate: true, // (optional) default: true
      vibration: 500,
      playSound: true,
      soundName: "noti.wav", 
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });

}

export const CreateOwnChannel=()=>{
  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "noti.wav", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
 } 