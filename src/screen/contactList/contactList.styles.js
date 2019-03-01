import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }, 
  list: {
    padding: 10,
    borderBottomColor: '#64b5f6',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: { width: 60, height: 60, borderRadius: 30 },
  circle: {
    width: 60,
    height: 60, 
    borderRadius: 30,
    backgroundColor: '#64b5f6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleText: { color: '#fff', fontSize: 20 },
  listText: { fontSize: 20, padding: 10 }
});

export default styles;