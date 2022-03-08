import axios from 'axios';

export const getattendance = async(setmessage,id,shift,value,setprocess,lat,lon)=> {
   

    
    if (value !== "" && shift !== "" && lat !== '' && lon !== '') {
  
      try {
        const res = await axios.get(`https://attendezz.com/dashboard/api/index.php?action=mark_attendance_geolocation&emp_id=${id}&business_id=${value}&lat=${lat}&lon=${lon}&shift=${shift}&device_type=nfc`)
    
        if (res.data.sts == 'success') {
        
          const id = res.data?.att_id
         
            const notification = await axios.get(`https://www.attendezz.com/dashboard/api/index.php?action=getAttendanceRecord&att_id=${id}`)
         
         setprocess('success')
         setmessage(res.data.msg)
         if((notification.data?.data?.notification_token?.token_id) !== null  ){
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
          }).then(res3 => { console.log("success",res3) })
        }
  
        } else {
          if (res.data.sts == 'warning') {
           
            setprocess('warning')
            setmessage(res.data.msg)
          } else {
            if (res.data.sts == 'danger') {
               
                setprocess('error')
                setmessage(res.data.msg)
            }
          }
        }
      } catch (error) {
     
       setprocess('error')
       setmessage('network error plz try again !')
      }
    }else{
        setprocess('error')
    }
  
  }