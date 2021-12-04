
import React, { useEffect } from 'react';
import { Routing } from './src/routing/Routing';
import { Provider } from 'react-redux';
import store from './src/config/Store';
import { notificationListner, requestUserPermission, CreateOwnChannel } from './src/componenets/Notification';
import FlashMessage from "react-native-flash-message";
import moment from 'moment'
import { DeviceEventEmitter } from 'react-native';


const App = () => {

  useEffect(() => {

    CreateOwnChannel()
    requestUserPermission()
    const date=moment().format("DD-MM-YYYY")
   

    console.log(date)
    // console.log(new Date(Date.now() + 30 * 1000))
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
