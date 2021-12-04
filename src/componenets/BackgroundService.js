import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import database from '@react-native-firebase/database';



export const onStart = () => {
  // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
  if (ReactNativeForegroundService.is_task_running('taskid')) return;
  // Creating a task.
  ReactNativeForegroundService.add_task(
    () => {


      RNLocation.checkPermission({
        ios: 'always', // or 'always'
        android: {
          detail: 'fine' // or 'fine'
        }
      }).then((granted) => {
        console.log(granted, "check permission first")
        if (granted) {
          RNLocation.configure({
            distanceFilter: 0, // Meters
            desiredAccuracy: {
              ios: 'best',
              android: 'lowPower',
            },
            // Android only
            androidProvider: 'auto',
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: 'other',
            allowsBackgroundLocationUpdates: true,
            headingFilter: 1, // Degrees
            headingOrientation: 'portrait',
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
          })
          RNLocation.getLatestLocation({ timeout: 60000 })
            .then(latestLocation => {
              if (latestLocation !== null) {
                try {
                  console.log(latestLocation, "first")
                  const getitems = async () => {
                    try {
                      const UserID = await AsyncStorage.getItem('userID')                    
                       const BusinessID = await AsyncStorage.getItem('BussinessID')                          
                       const UserFname = await AsyncStorage.getItem('UserFName');
                      const UserLname = await AsyncStorage.getItem('UserLName')
                      const UserPic = await AsyncStorage.getItem('UserPic')                   
                      console.log(UserID, BusinessID, UserFname, UserLname, UserPic, "getitems")
                      const date=moment().format("DD-MM-YYYY")
                      const newReference = database().ref(`/${BusinessID}/locationHistory/${UserID}/${date}`).push();

                      console.log('Auto generated key: ', newReference.key);

                      newReference
                        .set({
                          latitude: latestLocation.latitude,
                          longitude: latestLocation.longitude,
                          time: latestLocation.timestamp,
                          key:newReference.key,
                          UserID,
                          UserFname,
                          UserLname,
                          UserPic
                        })
                        .then(() => console.log('Data updated.'));
                      
                        const newReference2 = database().ref(`/${BusinessID}/CurrentLocation/${UserID}`);
  
                        newReference2
                          .set({
                            latitude: latestLocation.latitude,
                            longitude: latestLocation.longitude,
                            time: latestLocation.timestamp,
                            key:newReference2.key,
                            UserID,
                            UserFname,
                            UserLname,
                            UserPic
                          })
                          .then(() => console.log('Data updated.'));




                    } catch (error) {
                      console.log(error)
                    }

                  }
                  getitems()

                } catch (error) {
                  console.log(error)
                }

              }

            })
        } else {
          RNLocation.requestPermission({
            ios: 'whenInUse',
            android: {
              detail: 'fine',
            },
          }).then((granted) => {
            console.log(granted, "check permission")
            if (granted) {
              RNLocation.configure({
                distanceFilter: 0, // Meters
                desiredAccuracy: {
                  ios: 'best',
                  android: "balancedPowerAccuracy",
                },
                // Android only
                androidProvider: 'auto',
                interval: 10000, // Milliseconds
                fastestInterval: 10000, // Milliseconds
                maxWaitTime: 10000, // Milliseconds
                // iOS Only
                activityType: 'other',
                allowsBackgroundLocationUpdates: true,
                headingFilter: 1, // Degrees
                headingOrientation: 'portrait',
                pausesLocationUpdatesAutomatically: false,
                showsBackgroundLocationIndicator: false,
              })
              RNLocation.getLatestLocation({ timeout: 60000 })
                .then(latestLocation => {
                  if (latestLocation !== null) {
                    console.log(latestLocation)
                  }

                })
            }
          })
        }
      })

    },

    {
      delay: 300000,
      onLoop: true,
      taskId: 'taskid',
      onError: (e) => console.log(`Error logging:`, e),
    },
  );

  return ReactNativeForegroundService.start({
    id: 144,
    title: 'Tracking Location',
    message: 'Plz do not turn off your location',
  });
};
// 600000    300000
export const onStop = () => {
  // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
  if (ReactNativeForegroundService.is_task_running('taskid')) {
    ReactNativeForegroundService.remove_task('taskid');
  }
  // Stoping Foreground service.
  return ReactNativeForegroundService.stop();
};