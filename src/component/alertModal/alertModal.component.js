import React from 'react';
import { Text, TouchableOpacity, Modal } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import Ico from '@expo/vector-icons/SimpleLineIcons'

import styles from './alertModal.component.style';

const alertModal = ({ error, onClose, success }) => (
  <Modal
    transparent
    visible={!!error || !!success}
    onRequestClose={() => { onClose(error ? 'error' : 'success')(false) }}
  >
    <TouchableOpacity 
      style={styles.wrapper}
      onPress={() => { onClose(error ? 'error' : 'success')(false) }}
    >
      {error ?
        <Icon name={'error-outline'} size={72} color={'#f44336'} /> :
        <Ico name={'check'} size={72} color={'#4caf50'} />
      }

      <Text style={styles.text(error)}>
        {error || success}
      </Text>
    </TouchableOpacity>
  </Modal>
);

export default alertModal;



