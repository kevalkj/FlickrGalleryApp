import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import ChevronLeft from '../assets/ChevronLeft';
import ChevronRight from '../assets/ChevronRight';

const {height, width} = Dimensions.get('window');
// refer WithdrawalData.tsx for example of implementation
interface CalendarModalProps {
  toggleCalendar: boolean; // visibility of the modal
  handleToggleCalendar: () => void; // handle the variable which controls the visibility of the modal
  setDate: React.Dispatch<React.SetStateAction<string>>; // updating the selected data
}

export default function CalendarModal({
  toggleCalendar,
  handleToggleCalendar,
  setDate,
}: CalendarModalProps) {
  const [error, setError] = useState(false);
  const theme = {
    todayBackgroundColor: '#0d69d7',
    todayTextColor: 'white',
    'stylesheet.calendar.header': {
      headerContainer: styles.headerContainer,
      header: styles.header,
      monthText: styles.monthText,
    },
  };

  return (
    <Modal visible={toggleCalendar} transparent={true}>
      <TouchableOpacity
        style={styles.calendarContainer}
        onPress={handleToggleCalendar}>
        <Calendar
          style={styles.calendar}
          hideExtraDays={true}
          theme={theme}
          renderArrow={direction => {
            if (direction == 'left') {
              return <ChevronLeft />;
            }
            return <ChevronRight />;
          }}
          onDayPress={days => {
            const cday = new Date().getDate();
            const cmonth = new Date().getMonth();
            if (days.month < cmonth + 1) {
              setError(true);
              return;
            }
            if (days.month === cmonth + 1 && days.day < cday) {
              setError(true);
              return;
            }
            const selectedDate = new Date(days.dateString);
            const month = selectedDate.toLocaleString('default', {
              month: 'short',
            });
            const day = selectedDate.getDate();
            const year = selectedDate.getFullYear();
            setDate(`${day} ${month} ${year}`);
            handleToggleCalendar();
            setError(false);
          }}
        />
        {error && <Text style={styles.error}>Please select a valid date</Text>}
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  calendar: {
    width: width * 0.9,
    height: height * 0.55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#707371',
  },
  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    alignSelf: 'flex-start',
  },
  error: {fontSize: 16, color: 'black', marginTop: 16},
});
