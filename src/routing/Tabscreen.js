import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../modules/profile/Profile';
import Leave from '../modules/leave/Leave';
import Filter from '../modules/filter/Filter';
import Home from '../modules/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UpdatePassword from '../modules/reset password/UpdatePassword';
import UpdateProfile from '../modules/update profile/UpdateProfile';
import Feedback from '../modules/feedback/Feedback';
import ViewLeave from '../modules/leave/ViewLeave';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FilterStack = createStackNavigator();
const LeaveStack = createStackNavigator();
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
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={{
        
          tabBarLabel: 'Leave'
        }}
        name="Leave"
        component={LeaveStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Filter'
        }}
        name="Filter"
        component={FilterStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile'
        }}
        name="Profile"
        component={ProfileStackScreen}
      />

    </Tab.Navigator>
  )
}
export default TabScreen;


const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator >
    <HomeStack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home} />
    <HomeStack.Screen
      options={{
        title: 'Update Profile',
        headerStyle: {
          backgroundColor: '#494446',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      name="Update_profile" component={UpdateProfile} />
    <HomeStack.Screen
      options={{
        title: 'Feedback',
        headerStyle: {
          backgroundColor: '#494446',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      name="Feedback" component={Feedback} />


  </HomeStack.Navigator>
);

const LeaveStackScreen = ({ navigation }) => (
  <LeaveStack.Navigator screenOptions={{ headerShown: false }} >
    <LeaveStack.Screen   name="LeaveScreen" component={leavescreen} />
  </LeaveStack.Navigator>
);

const FilterStackScreen = ({ navigation }) => (
  <FilterStack.Navigator screenOptions={{ headerShown: false }} >
    <FilterStack.Screen name="Filtercreen" component={Filter} />
  </FilterStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  // screenOptions={{ headerShown: false }}
  <ProfileStack.Navigator  >
    <ProfileStack.Screen options={{ headerShown: false }} name="ProfileScreen" component={Profile} />
    <ProfileStack.Screen
      options={{
        title: 'Update Password',
        headerStyle: {
          backgroundColor: '#494446',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      name="Update_password" component={UpdatePassword} />



    <ProfileStack.Screen
    
      options={{
        title: 'Feed Back',
        headerStyle: {
          backgroundColor: '#494446',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      name="Feedback" component={Feedback} />



    <ProfileStack.Screen
      options={{
        title: 'Update Profile',
        headerStyle: {
          backgroundColor: '#494446',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      name="Update_profile" component={UpdateProfile} />
  </ProfileStack.Navigator>
);