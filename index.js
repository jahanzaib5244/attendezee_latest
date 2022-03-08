import 'react-native-gesture-handler';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import database from '@react-native-firebase/database';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

// ReactNativeForegroundService.register();



messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
database().setPersistenceEnabled(true);

// PushNotification.configure({

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {

//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function(err) {
//     console.error(err.message, err);
//   },
//   popInitialNotification: true,
//   requestPermissions: true,
// });


// Register background handler


AppRegistry.registerComponent(appName, () => App);
