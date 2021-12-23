import { LOGIN, LOGOUT, FORGETPASSWORD, RETRIEVEDUSER, UPDATEPASSWORD, UPDATEPROFILE, ATTENDENCE, FILTERITEMS, BUSINESSRULE, ATTENDANCE_DAY, IMAGE, LEAVE, APPLYLEAVE } from "../Sates";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from "react-native";
import DeviceInfo from 'react-native-device-info';
import { Alert } from "react-native";
import messaging from '@react-native-firebase/messaging';
import moment from 'moment'
import {reminder,RemoveReminder} from '../../componenets/Notification'
import {onStart ,onStop} from '../../componenets/BackgroundService'



export const doLogin = (setloading, email, password) => async (dispatch) => {
  setloading(true);
  try {
    
    let user_login_data = {
      usertoken: null,
      user_data_info: null,
      invalid_email_password: null,
      email_not_exist: null,
      userbussiness: [],
      profile_pic: '',
      Showtracking:false,
      CreatedBussiness:[]

    }

    const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=login&user_email=${email}&user_password=${password}`);


    if (res.data.sts == 'success') {

      if ((res.data.user_created_business).length !== 0) {
        // console.log('have data', res.data.user_created_business)
        user_login_data.Showtracking=true
        user_login_data.CreatedBussiness=res.data.user_created_business
        messaging().getToken().then(Dtoken => {
          // console.log(Dtoken)
          
          const savetoken = async () => {
            await AsyncStorage.setItem('devicetoken', Dtoken);
           
          }
          savetoken()
          const arr = res.data.user_created_business
          const id = res.data.user_data.user_id
          arr.map(async (item, index) => {
            const registertoken = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=push_token&token_id=${Dtoken}&business_id=${item.business_id}&user_id=${id}`)
            // console.log(registertoken.data.sts,'register token')
            console.log(item.business_id, item.is_tracking ,'save items')
           
              
            await AsyncStorage.setItem(item.business_id, `${item.is_tracking}`);
          }) 
        })
      }
      if (res.data.user_data.is_multiple == "yes") {
        // console.log("multiple true")
        let token = res.data.user_data.user_id
        await AsyncStorage.setItem('user', token);
        user_login_data.usertoken = token;
        user_login_data.user_data_info = res.data.user_data;
        user_login_data.userbussiness = res.data.user_business;
        user_login_data.profile_pic = res.data.user_data.profile_img_path;
      } else {
        if (res.data.user_data.device_id == null) {
          // console.log('did not get any device id')
          let uniqueId = DeviceInfo.getUniqueId();
          console.log(uniqueId)
          const res2 = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=update_device_code&emp_id=${res.data.user_data.user_id}&device_id=${uniqueId}`)
          console.log(res2)
          if (res2.data.sts == "success") {
            let token = res.data.user_data.user_id
            await AsyncStorage.setItem('user', token);
            user_login_data.usertoken = token;
            user_login_data.user_data_info = res.data.user_data;
            user_login_data.userbussiness = res.data.user_business;
            user_login_data.profile_pic = res.data.user_data.profile_img_path
          }
        } else {
          let uniqueId = DeviceInfo.getUniqueId();
          // console.log(uniqueId)
          console.log("checking device id is equal to registered id")
          if (uniqueId == res.data.user_data.device_id) {
            let token = res.data.user_data.user_id
            await AsyncStorage.setItem('user', token);
            user_login_data.usertoken = token;
            user_login_data.user_data_info = res.data.user_data;
            user_login_data.userbussiness = res.data.user_business;
            user_login_data.profile_pic = res.data.user_data.profile_img_path
          } else {
            Alert.alert(
              "Invalid Device",
              "You have no access to login in this device please contact the admin",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
        }
      }
      setloading(false)
    } else {
      if (res.data.sts == 'danger') {
        user_login_data.invalid_email_password = res.data.msg
        setloading(false)
      }
    }


    dispatch({
      type: LOGIN,
      payload: user_login_data,
    });
  } catch (error) {
    ToastAndroid.show(
      'make sure your have a good internet connection',
      ToastAndroid.SHORT
    )
    console.log(error);
    setloading(false)
  }
};

export const getattendance = (setModalActive, setalert_color, lat, lon, setalert_message, setshowAlert, getbussiness_id, shift) => async (dispatch) => {
  setModalActive(true)
  console.log(lat, lon, shift, getbussiness_id)
  
  if (getbussiness_id !== "" && shift !== "" && lat !== '' && lon !== '') {

    try {
      const userid = await AsyncStorage.getItem('user')
      const res = await axios.get(`https://attendezz.com/dashboard/api/index.php?action=mark_attendance_geolocation&emp_id=${userid}&business_id=${getbussiness_id}&lat=${lat}&lon=${lon}&shift=${shift}`)


         console.log(res.data)
      if (res.data.sts == 'success') {
       
        let todayAttendance = []
        setModalActive(false)
        setalert_color('green')
        setalert_message(res.data.msg)
        setshowAlert(true)
        const id = res.data.att_id

        const date = moment().format("DD")
        const month = moment().format("MM")
        const year = moment().format("YYYY")
        console.log(date, month, year);
        const res2 = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=view_attendance&emp_id=${userid}&dated=${year}-${month}-${date}&business=${getbussiness_id}&filter=byday`)
  
        todayAttendance = res2.data.data.details
       

        const notification = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=getAttendanceRecord&att_id=${id}`)
        
        if(res.data.tracking.business_tracking == "yes" && res.data.tracking.staff_tracking == "yes" ){
          if(shift=="Start_shift" || shift == 'End_break'){
          await AsyncStorage.setItem('userID', notification.data.data.attendance.emp_id);
          await AsyncStorage.setItem('BussinessID', notification.data.data.attendance.business_id);
          await AsyncStorage.setItem('UserFName', notification.data.data.employee.user_first_name);
          await AsyncStorage.setItem('UserLName', notification.data.data.employee.user_last_name);
          await AsyncStorage.setItem('UserPic', notification.data.data.profile_img_path);
          onStart()
          }
        }

        console.log(notification.data,)
        console.log(notification.data.data.user_extra.end_time, "time")
        if((notification.data.data.notification_token.token_id) !== null ){
        await fetch('https://attendezz.herokuapp.com/notification', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify({
            username: `${(notification.data.data.employee.user_first_name).toUpperCase()} ${(notification.data.data.employee.user_last_name).toUpperCase()}`,
            userclick: `${notification.data.data.attendance.description}`,
            image: `${notification.data.data.profile_img_path}`,
            token: `${notification.data.data.notification_token.token_id}`
          })
        }).then(res => { console.log("success") })
      }
       
         if (shift == 'Start_shift') {
         reminder(notification.data.data.user_extra.end_time,notification.data.data.employee.user_first_name,notification.data.data.profile_img_path)
              
        } else {
          if(shift == "End_shift"){
            RemoveReminder()
            onStop()
          }else{
            if(shift == "Start_break"){
              onStop()
            }
          }
        }

    
        
      

        dispatch({
          type: ATTENDENCE,
          payload: todayAttendance
        })

      } else {
        if (res.data.sts == 'warning') {
          setModalActive(false)
          setalert_color('#ffee75')
          setalert_message(res.data.msg)
          setshowAlert(true)
        } else {
          if (res.data.sts == 'danger') {
            setModalActive(false)
            setalert_color('#5E0D14')
            setalert_message(res.data.msg)
            setshowAlert(true)
          }
        }
      }
    } catch (error) {
      ToastAndroid.show(
        `Connection error please try again later `,
        ToastAndroid.SHORT
      )
    }
  }

}




export const doLogout = (setloggingout) => async (dispatch) => {
  setloggingout(true)
  try {
    var filterData = []
    await AsyncStorage.removeItem('user');
    
    const DeviceToken = await AsyncStorage.getItem('devicetoken')
    console.log(DeviceToken)
    if (DeviceToken !== null) {
      let res =await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=deactive_token&token_id=${DeviceToken}`)
   console.log(res.data)
    }
    await AsyncStorage.clear()
    setloggingout(false)

    dispatch({
      type: LOGOUT,
      payload: filterData

    })
  } catch (error) {
    console.log(error);
  }

};





export const forgetpassword = (setloading, useremail) => async (dispatch) => {
  setloading(true);
  try {
    let source = axios.CancelToken.source();
    const forget = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=forgot_password_module&user_email=${useremail}`, { cancelToken: source.token })
    console.log(forget)
    if (forget.data.sts == 'success') {
      ToastAndroid.show(
        forget.data.msg,
        ToastAndroid.LONG
      )
    } else {
      if (forget.data.sts == 'danger') {
        var emailerror = forget.data.msg
        console.log(emailerror)
      }

    }

    dispatch({
      type: FORGETPASSWORD,
      payload: emailerror,
    })

  } catch (error) {
    console.log(error);
  } finally {
    setloading(false);
  }

};




export const UpdateuserPassword = (setshowAlert, setAlertMessage, setloading, oldpassword, newpassword, confirmpassword) => async (dispatch) => {
  setloading(true)
  try {
    // let source = axios.CancelToken.source();
    const userid = await AsyncStorage.getItem('user')
    var update_password_errors = {
      oldpasswordincorrect: null,
      new_confiem_pass_not_matched: null
    }
    const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=update_password&user_id=${userid}&old_password=${oldpassword}&new_password=${newpassword}&confirm_password=${confirmpassword}`)
    console.log(res)
    if (res.data.sts == 'success') {
      setshowAlert(true);
      setAlertMessage(res.data.msg)
      // console.log(res.data.msg)

    } else {
      if (res.data.sts == 'warning') {
        update_password_errors.oldpasswordincorrect = res.data.msg
      } else {
        if (res.data.sts == 'info') {
          update_password_errors.new_confiem_pass_not_matched = res.data.msg
        }
      }
    }

    dispatch({
      type: UPDATEPASSWORD,
      payload: update_password_errors,
    });
  } catch (error) {
    ToastAndroid.show(
      "Make sure you have a good Internet connection",
      ToastAndroid.SHORT
    );
  }
  finally {
    setloading(false)
  }
};



export const getuserfromstorage = () => async (dispatch) => {
  let userid = await AsyncStorage.getItem('user');
  let getusertoken = {
    loading: false,
    offline:false,
    usertoken: null,
    userdata: null,
    userbussiness: [],
    profile_pic: '',
    Showtracking:false,
    CreatedBussiness:[]
  }
  
  console.log('useeffect call')
  try {
    if (userid !== null) {

      getusertoken.usertoken = userid;
      let res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=getuser&user_id=${userid}`)
       console.log(res.data)
      if (res.data.sts == 'success') {
        if ((res.data.user_created_business).length !== 0) {
          console.log('have data', res.data.user_created_business)
          getusertoken.Showtracking=true
          getusertoken.CreatedBussiness=res.data.user_created_business
          const arr= res.data.user_created_business
          arr.map(async (item, index) => {
           
              
            await AsyncStorage.setItem(item.business_id, `${item.is_tracking}`);
          }) 
    
        }
        getusertoken.userdata = res.data.user_data
        getusertoken.userbussiness = res.data.user_business
        getusertoken.profile_pic = res.data.user_data.profile_img_path
        dispatch({
          type: RETRIEVEDUSER,
          payload: getusertoken
        })
      }
    }else{
      dispatch({
        type: RETRIEVEDUSER,
        payload: getusertoken
      })
    }
  } catch (error) {
      
    ToastAndroid.show(
      "Make sure you have a good Internet connection",
      ToastAndroid.SHORT
    );
    setTimeout(() => {
      console.log('eroor')
      getusertoken.offline=true
      console.log(error);
  
      dispatch({
        type: RETRIEVEDUSER,
        payload: getusertoken
      })
    }, 3000);
    
  }

 

};

export const offfline=(setloading)=>async(dispatch)=>{
  setloading(true)
  let userid = await AsyncStorage.getItem('user');
  let getusertoken = {
    loading: false,
    offline:false,
    usertoken: null,
    userdata: null,
    userbussiness: [],
    profile_pic: '',
    Showtracking:false,
    CreatedBussiness:[],
  }
  
  console.log('useeffect call')
  try {
    if (userid !== null) {

      getusertoken.usertoken = userid;
      let res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=getuser&user_id=${userid}`)
      //  console.log(res)
      if (res.data.sts == 'success') {
        if ((res.data.user_created_business).length !== 0) {
          console.log('have data', res.data.user_created_business)
          getusertoken.Showtracking=true
          getusertoken.CreatedBussiness=res.data.user_created_business
        }
        getusertoken.userdata = res.data.user_data
        getusertoken.userbussiness = res.data.user_business
        getusertoken.profile_pic = res.data.user_data.profile_img_path
        dispatch({
          type: RETRIEVEDUSER,
          payload: getusertoken
        })
      }else{
        dispatch({
          type: RETRIEVEDUSER,
          payload: getusertoken
        })
      }
    }
  } catch (error) {
      
    ToastAndroid.show(
      "Make sure you have a good Internet connection",
      ToastAndroid.SHORT
    );
    setTimeout(() => {
      console.log('eroor')
      getusertoken.offline=true
      console.log(error);
  
      dispatch({
        type: RETRIEVEDUSER,
        payload: getusertoken
      })
      setloading(false)
    }, 3000);
    
  }
}




export const updateuser = (setUpdtaeMessage, setshowAlert, setloading, firstname, lastname, phone, adress, dob) => async (dispatch) => {
  setloading(true);
  let updated_data = {
    updatedata: null,
    message: null,
  }
  try {
    // let source = axios.CancelToken.source();
    const userid = await AsyncStorage.getItem('user');
    const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=update_user_profile&user_id=${userid}&user_first_name=${firstname}&user_last_name=${lastname}&user_phone=${phone}&user_address=${adress}&user_dob=${dob}`);

    if (res.data.sts == 'success') {
      updated_data.message = res.data.msg;
      setshowAlert(true);
      setUpdtaeMessage(res.data.msg);

      // console.log('updated message', res.data.msg)
      const res2 = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=getuser&user_id=${userid}`);

      if (res2.data.sts == 'success') {

        updated_data.updatedata = res2.data.user_data;

      }
    }
    dispatch({
      type: UPDATEPROFILE,
      payload: updated_data
    })
  } catch (error) {
    ToastAndroid.show(
      "Make sure you have a good Internet connection",
      ToastAndroid.SHORT
    );
    console.log(error);
  }
  finally {
    setloading(false);
  }

};



export const Filteritem = (setshowfilter, setloading, business_id, date, mathod) => async (dispatch) => {
  setloading(true)
  let getfilter_item = []
  try {
    if (business_id !== '' && date !== '' && mathod !== '') {
      const userid = await AsyncStorage.getItem('user');
      // let source = axios.CancelToken.source();
      // , { cancelToken: source.token }
      const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=view_attendance&emp_id=${userid}&dated=${date}&business=${business_id}&filter=by${mathod}`)
      //  console.log(res)
      if (res.data.sts == "success") {
        getfilter_item = res.data.data.details
        //  console.log( getfilter_item)
        setshowfilter(true)
      }
    } else {
      ToastAndroid.show(
        'All Fields must be filled',
        ToastAndroid.LONG
      )
    }


    dispatch({
      type: FILTERITEMS,
      payload: getfilter_item
    })
  } catch (error) {
    console.log(error)
  } finally {
    setloading(false)
  }
}
export const bussiness_rules = (business_id) => async (dispatch) => {
  try {

    var Rules = []
    if (business_id !== "") {
      //  let source = axios.CancelToken.source();
      const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=view_business_rules&business_id=${business_id}`)
      console.log(res)
      if (res.data.sts == 'success') {
        Rules = res.data.business_rules
      } else {
        if (res.data.sts == 'danger') {
          Rules = [res.data.business_rules]
        }
      }
      console.log(Rules)
      dispatch({
        type: BUSINESSRULE,
        payload: Rules,
      })
    }

  } catch (error) {
    console.log(error)
  }
}


export const AttendanceByDay = (b_id) => async (dispatch) => {
  try {
    let todayAttendance = []
    const userid = await AsyncStorage.getItem('user');
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    // console.log(date, month, year);
    // let source = axios.CancelToken.source();

    const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=view_attendance&emp_id=${userid}&dated=${year}-${month}-${date}&business=${b_id}&filter=byday`)
    // console.log(res.data.data.details)
    todayAttendance = res.data.data.details

    dispatch({
      type: ATTENDANCE_DAY,
      payload: todayAttendance
    })
  } catch (error) {
    console.log(error)

  }
}
export const uploadImage = (base64) => async (dispatch) => {

  var profile_pic = ""

  const imagedata = new FormData
  imagedata.append('img', base64)
  const userid = await AsyncStorage.getItem('user');
  try {
    const res = await axios.post(`https://www.attendezz.com/dashboard/api/index.php?action=update_profile_pic&user_id=${userid}`, imagedata)
    console.log(res)
    if (res.data.sts == 'success') {
      profile_pic = res.data.img_path

    }
    dispatch({
      type: IMAGE,
      payload: profile_pic
    })

  } catch (error) {
    console.log(error)
  }

}




export const doRequestLeave = (setUpdtaeMessage, setshowAlert, setloading, bs_id, des, from, to) => async (dispatch) => {
  try {
    setloading(true)
    const userid = await AsyncStorage.getItem('user');


    const res = await axios.get(`https://attendezz.com/dashboard/api/index.php?action=request_leave&business_id=${bs_id}&description=${des}&user_id=${userid}&from=${from}&to=${to}`)
    console.log(res)
    if (res.data.sts == "success") {
      setshowAlert(true)
      setUpdtaeMessage(res.data.msg)
      const res2 = await axios.get(`https://attendezz.com/dashboard/api/index.php?action=view_request_leave&user_id=${userid}&business_id=${bs_id}`)
      if (res2.data.sts == 'success') {
        let array = res2.data.data
        if (array !== null) {
          var leaveData = array.reverse()
        }
      }
    }
    dispatch({
      type: APPLYLEAVE,
      payload: leaveData
    })
  } catch (error) {
    console.log(error)
  } finally {
    setloading(false)
  }
}


export const viewLeave = (setrefresh, bs_id) => async (dispatch) => {
  try {
    setrefresh(true)
    var leaveData = []
    const userid = await AsyncStorage.getItem('user');
    const res = await axios.get(`https://attendezz.com/dashboard/api/index.php?action=view_request_leave&user_id=${userid}&business_id=${bs_id}`)
    if (res.data.sts == 'success') {

      let array = res.data.data
      if (array !== null) {
        leaveData = array.reverse()
      }
      // console.log(res.data.data)

    }
    dispatch({
      type: LEAVE,
      payload: leaveData
    })

  } catch (error) {
    console.log(error)
  } finally {
    setrefresh(false)
  }
}
export const feedback = (setloading, setsubmitted, setshowAlert, feedtext) => async (dispatch) => {
  try {
    setloading(true)
    const userid = await AsyncStorage.getItem('user');
    const res = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=feedback&user_id=${userid}&feedback=${feedtext}`)
    if (res.data.sts == 'success') {
      setshowAlert(true);
      setsubmitted(res.data.msg)
    }

  } catch (error) {
    console.log(error)
  } finally {
    setloading(false)
  }
}