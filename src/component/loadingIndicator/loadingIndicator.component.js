import React from 'react';
import { Text, View, Modal, ActivityIndicator } from 'react-native';

import styles from './loadingIndicator.component.style';

const loadingIndicator = ({ loading }) => (
  <Modal transparent visible={loading}>
    <View style={styles.wrapper}>
      <ActivityIndicator size='large' color='#fff'/>

      <Text style={styles.text}>
        Loading ...
      </Text>
    </View>
  </Modal>
);

export default loadingIndicator;



