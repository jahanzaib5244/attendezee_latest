import axios from 'axios'
import {CONFIG}from '../Sates'


export const ConfigInfo = () => async (dispatch) => {

    let Data={
      primary:'#494446',
      Secondary:'#fff',
      appName:'Attendezz.com',
      Url:'https://www.attendezz.com/dashboard/api/index.php',
      logo:'',
      textColor:'#fff'
    }
    try {
      const res = await axios.get('https://www.attendezz.com/dashboard/api/index.php?action=app_config&name=Attendezz')

     if (res.data.sts == 'success'){
      Data.primary=!!res.data.data.meta.colors?.primaryColor ? res.data.data.meta.colors?.primaryColor : '#494446' 
      Data.Secondary=!!res.data.data.meta.colors?.secondaryColor ? res.data.data.meta.colors?.secondaryColor : '#fff'
      Data.Url=!!res.data.data.meta?.base_url ? res.data.data.meta?.base_url : 'https://www.attendezz.com/dashboard/api/index.php'
      Data.logo=!!res.data.data.meta?.logo_url ? res.data.data.meta?.logo_url : '' 
      Data.textColor=!!res.data.data.meta.colors?.fontColor ? res.data.data.meta.colors?.fontColor : '#fff'
      Data.appName=!!res.data.data.meta?.app_name ? res.data.data.meta?.app_name : 'Attendezz.com'

      dispatch({
        type: CONFIG,
        payload: Data
      })
     }
  
    } catch (error) {
 
    } 

  }