import React from 'react';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import styles from './formDatePicker.component.style';

const FormDatePicker = ({ formName, setDatePicker, value, label }) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>
      {label}
    </Text>
    <DatePicker
      date={value}
      mode="date"
      placeholder={label}
      format="DD-MM-YYYY"
      maxDate={new Date()}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      showIcon={false}
      style={styles.formDatePicker}
      customStyles={{
        dateInput: styles.dateInput,
        placeholderText: styles.placeholderText,
        dateText: styles.dateText
      }}
      onDateChange={dob => {
        const dateOfBirth = moment(dob, 'DD-MM-YYYY')
        const age = moment().diff(dateOfBirth, 'years');

        setDatePicker([formName, 'age'])([dob, age]);
      }}
    />
  </View>
);

export default FormDatePicker;



