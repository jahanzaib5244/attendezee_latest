import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Profile from '../modules/profile/Profile';
import Leave from '../modules/leave/Leave';
import Filter from '../modules/filter/Filter';
import Home from '../modules/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewLeave from '../modules/leave/ViewLeave';

const Tab = createBottomTabNavigator();

const Leavetabbar = createBottomTabNavigator();

 const leavescreen=()=>{
   return(
           <Leavetabbar.Navigator 
           barStyle={{ backgroundColor: '#594446' }}
           screenOptions={{
            tabBarIconStyle:({
              display:'none'
            }),
            tabBarLabelStyle:({
              fontSize:18,
              fontWeight:'700'
            }),
            tabBarLabelPosition:'beside-icon',
            swipeEnabled: true,
            headerShown: false,
            tabBarPosition: 'top',
            tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
       
        tabBarStyle: ({
          backgroundColor: '#494446',
          position: 'absolute',
         top:0,
         height:60,
         borderTopWidth: 0,
         paddingBottom:8

         
        }),
           }}
           
           >
              <Tab.Screen options={{  tabBarLabel: 'Apply' }} name="Apply" component={Leave} />
              <Tab.Screen options={{  tabBarLabel: 'View' }} name="View" component={ViewLeave} />
           </Leavetabbar.Navigator>
   )
 }
const TabScreen = () => {
  return (
    <Tab.Navigator

      barStyle={{ backgroundColor: '#594446' }}

      screenOptions={({ route }) => ({
        keyboardHidesTabBar: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        tabBarStyle: ({
          backgroundColor: '#494446',
          height: 60,
          width: '100%',
          position: 'relative',

          paddingBottom: 12,
          paddingTop: 8,
        }),
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : "home-outline";
          } else if (route.name === 'Leave') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }
          else if (route.name === 'Filter') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen options={{
        tabBarLabel: 'Home'
      }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
        
          tabBarLabel: 'Leave'
        }}
        name="Leave"
        component={leavescreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Filter'
        }}
        name="Filter"
        component={Filter}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile'
        }}
        name="Profile"
        component={Profile}
      />

    </Tab.Navigator>
  )
}
export default TabScreen;




