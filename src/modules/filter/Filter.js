import React, { useState ,useEffect} from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioForm from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import { FilterStyle } from './FilterStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Filteritem } from '../../store/actions/AuthAction';
import Pdftable from '../../componenets/Pdftable';
import { checkMultiple, PERMISSIONS, requestMultiple } from 'react-native-permissions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


export default function Filter() {
  const getbussiness = useSelector(state => state.AuthReducer.user_bussines)
  const Filtered_items = useSelector(state => state.AuthReducer.filter_data)
  
useEffect(() => {
  const d = new Date();
  const date = JSON.stringify(d)
  setselected_date((date.slice(1, 11)));
}, [])
  console.log(Filtered_items)

  const { str } = Pdftable()
 

  const pdf = async () => {

    const pdfwrite = async () => {
      let options = {

        html: str,
        fileName: `Attendezz.com${Math.floor(Math.random() * 100).toString()}`,
        directory: 'Documents',
      };
      try {
        let file = await RNHTMLtoPDF.convert(options)

        alert(file.filePath);
      } catch (error) {
        console.log(error)
      }
    }

    checkMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then((statuses) => {
      console.log('write', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
      console.log('read', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
      if ('granted' === statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]) {

        pdfwrite();
      } else {
        requestMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then((statuses) => {
          if ('granted' === statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]) {

            pdfwrite();
          }
        });
      }
    });
  }


  const [showdatepicker, setshowdatepicker] = useState(false)
  const [selected_date, setselected_date] = useState('')
  const [filtermathod, setfiltermathod] = useState("day")
  const [loading, setloading] = useState(false)
  const [open, setOpen] = useState(false);
  const [showfilter, setshowfilter] = useState(false)

  const hideDatePicker = () => {
    setshowdatepicker(false)
  }



  const dispatch = useDispatch()

  const userbussines_data = []
  getbussiness.map((item, index) => {
    const obj = { label: `${item.business_name}`, value: `${item.business_id}` }
    userbussines_data.push(obj)
  })
  // console.log(userbussines_data)

  const [items, setItems] = useState(userbussines_data);
  const [value, setValue] = useState('');


  const Confirm = (date) => {

    const dateString = JSON.stringify(date)
    console.log(dateString)
    setselected_date((dateString.slice(1, 11)));
    hideDatePicker();
  }


  const radio_BTN_value = [
    { label: 'Daily', value: "day" },
    { label: 'Weekly', value: "week" },
    { label: 'Monthly', value: "month" },

  ];

  const filter = async () => {
    setshowfilter(false)

    dispatch(Filteritem(setshowfilter, setloading, value, selected_date, filtermathod))
  }




  return (
    <ScrollView style={FilterStyle.root}>
      <View style={FilterStyle.logo_container}>
        <Text style={FilterStyle.textheader}>Check Your Attendance</Text>

      </View>
      <View >
        <View style={FilterStyle.dropdown}>

          <DropDownPicker
            placeholder="Select Business"
            listMode="SCROLLVIEW"
            open={open}
            value={value}
            items={items }
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            zIndex={1000}
          />



        </View>
        <View style={FilterStyle.date_text}>
          <Text style={{ fontSize: 15 }}>Select Date :</Text>
          <TouchableOpacity style={FilterStyle.date_btn} onPress={() => setshowdatepicker(true)}>

            <Ionicons
              size={30}
              name='calendar-outline'
              color="#494446"
            />
            <Text style={FilterStyle.selected_date}>{selected_date}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showdatepicker}
            mode="date"
            date={new Date()}
            onConfirm={Confirm}
            onCancel={hideDatePicker}
          />

        </View>
      </View>
      <View style={FilterStyle.radio_container}>
        <RadioForm
          style={FilterStyle.radio_btn}
          radio_props={radio_BTN_value}
          animation={true}
          labelColor={'#494446'}
          formHorizontal={true}
          buttonColor={'#494446'}
          selectedButtonColor={'#494446'}
          buttonSize={10}
          buttonOuterSize={20}
          borderWidth={1}
          onPress={(val) => { setfiltermathod(val) }}
        />
      </View>
      {loading
        ?
        <View style={FilterStyle.filter_btn}>
          <ActivityIndicator size="small" color="white" />
        </View>
        :
        <TouchableOpacity onPress={filter} style={FilterStyle.filter_btn}>
          <Text style={FilterStyle.filter_btn_text}>Filter</Text>
        </TouchableOpacity>}




      {showfilter ?
        <View style={{ height: 40, width: '88%', marginLeft: '6%', marginRight: '6%', alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#494446', width: 100, height: 35, borderRadius: 10, }} onPress={() => pdf()}>
            <Text style={{ color: 'white' }} >Export as pdf</Text>
          </TouchableOpacity>
          


        </View>
        :
        null
      }


      {/* {showfilter ? */}

      {Filtered_items.map((item, index) => {

        return (
          <ScrollView
            key={index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={FilterStyle.filter_items}>
            <View style={FilterStyle.cardshadow_container}>
              <View style={FilterStyle.card_container}>
                <View style={FilterStyle.card_date}>
                  <Text style={{ fontWeight: '800' }}>{item.date}</Text>
                </View>
                {typeof item.shifts[0] == 'string'
                  ?
                  <View style={FilterStyle.leave}>
                    <Text style={FilterStyle.leave_text}>Time Off</Text>
                  </View>
                  :
                  <View>
                    <View style={FilterStyle.shift_container}>
                      <View style={FilterStyle.shifts}>
                        <Text style={FilterStyle.shift_heading}>Start Shift</Text>
                        <Text style={FilterStyle.sift_time}>{item.shifts.start_shift}</Text>
                      </View>
                      <View style={FilterStyle.shifts}>
                        <Text style={FilterStyle.shift_heading}>End Shift</Text>
                        <Text style={FilterStyle.sift_time}>{item.shifts.end_shift}</Text>
                      </View>
                      <View style={FilterStyle.shifts}>
                        <Text style={FilterStyle.shift_heading}>Start Break</Text>
                        <Text style={FilterStyle.sift_time}>{item.shifts.start_break}</Text>
                      </View>
                      <View style={FilterStyle.shifts}>
                        <Text style={FilterStyle.shift_heading}>End Break</Text>
                        <Text style={FilterStyle.sift_time}>{item.shifts.end_break}</Text>
                      </View>

                    </View>
                    <View style={FilterStyle.hours_container}>

                      <View style={FilterStyle.totalhours}>
                        <Text style={FilterStyle.hours_heading}>Total Hours: </Text>
                        <Text style={FilterStyle.hours_total}>{item.shifts.totalHours}</Text>
                      </View>
                      <View style={FilterStyle.totalhours_break}>
                        <Text style={FilterStyle.hours_heading}>Total Break: </Text>
                        <Text style={FilterStyle.hours_total}>{item.shifts.totalBreak}</Text>
                      </View>
                    </View>
                  </View>
                }

              </View>
            </View>
          </ScrollView>
        )
      })}

    </ScrollView>
  )
}
