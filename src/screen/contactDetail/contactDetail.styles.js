import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  headerRight: { paddingRight: 20 },
  circle: {
    backgroundColor: '#64b5f6',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: { width: 140, height: 140, borderRadius: 70 },
  circleText: { color: '#fff', fontSize: 40 },
  description: { paddingTop: 20, textAlign: 'center' }
});

export default styles;