import messaging from '@react-native-firebase/messaging';
import { showMessage, hideMessage } from "react-native-flash-message";



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
       backgroundColor: "purple", // background color
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