
import React, { useEffect } from 'react';
import { Routing } from './src/routing/Routing';
import { Provider } from 'react-redux';
import store from './src/config/Store';
import { notificationListner, requestUserPermission, CreateOwnChannel } from './src/componenets/Notification';
import FlashMessage from "react-native-flash-message";
import { DeviceEventEmitter } from 'react-native';
import {View ,Text} from 'react-native'
import PushNotification, {Importance} from "react-native-push-notification";


const App = () => {

 

  useEffect(() => {
    // device event emitter used to
    let subscription = DeviceEventEmitter.addListener(
      'notificationClickHandle',
      function (e) {
      
      },
      );
      requestUserPermission()
    notificationListner()
  
    CreateOwnChannel()
    return function cleanup() {
      subscription.remove();
    };
  }, []);


  return (
    <Provider store={store}>


      <Routing />
      <FlashMessage position="top" />

    </Provider>
      

  );
};

export default App;
