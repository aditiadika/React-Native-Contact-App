import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: (error) => ({
    color: error ? '#f44336' : '#4caf50',
    paddingTop: 30,
    fontSize: 20,
    textAlign: 'center'
  })
});

export default styles;