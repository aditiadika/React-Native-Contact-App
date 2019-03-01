import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  formGroup: { width: '100%', paddingBottom: 20 },
  label: { fontSize: 13 },
  formDatePicker: {
    borderWidth: 0,
    width: '100%'
  },
  
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
    borderBottomColor: '#64b5f6',
    borderBottomWidth: 1, 
  },
  placeholderText: {
    fontSize: 18,
    color: '#a9a9a9'
  },
  dateText: {
    fontSize: 18
  },
});

export default styles;