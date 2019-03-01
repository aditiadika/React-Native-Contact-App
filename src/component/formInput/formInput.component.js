import React from 'react';
import { Text, View, TextInput } from 'react-native';

import styles from './formInput.component.style';

const FormInput = ({ formName, setFormStateCallback, value, label }) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>
      {label}
    </Text>
    <TextInput
      placeholder={label}
      placeholderTextColor={'#a9a9a9'}
      value={value}
      onChangeText={setFormStateCallback(formName)}
      style={styles.formInput}
    />
  </View>
);

export default FormInput;



