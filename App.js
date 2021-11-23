
import React,{useEffect} from 'react';
import { Routing } from './src/routing/Routing';
import { Provider } from 'react-redux';
import store from './src/config/Store';
import RNLocation from 'react-native-location';
import messaging from '@react-native-firebase/messaging';
import { notificationListner, requestUserPermission } from './src/componenets/Notification';



const App = () => {
  useEffect(() => {
    requestUserPermission()
  //  messaging().getToken().then(token=>{
  //   console.log(token)
  // } )
  notificationListner()
  }, [])


  return (
    <Provider store={store}>
      <Routing />
    </Provider>
   
  );
};

export default App;
