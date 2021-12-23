
import React, { useEffect } from 'react';
import { Routing } from './src/routing/Routing';
import { Provider } from 'react-redux';
import store from './src/config/Store';
import { notificationListner, requestUserPermission, CreateOwnChannel } from './src/componenets/Notification';
import FlashMessage from "react-native-flash-message";
import messaging from '@react-native-firebase/messaging';
import { DeviceEventEmitter } from 'react-native';


const App = () => {

  useEffect(() => {

    CreateOwnChannel()
    requestUserPermission()
    
    messaging().getToken().then(Dtoken => {
    console.log(Dtoken)
    })
    notificationListner()

  }, [])

  useEffect(() => {
    // device event emitter used to
    let subscription = DeviceEventEmitter.addListener(
      'notificationClickHandle',
      function (e) {
        console.log('json', e);
      },
    );
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
