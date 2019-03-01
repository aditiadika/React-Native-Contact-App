import React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons'
import axios from 'axios';
import get from 'lodash/get';
import FAB from 'react-native-fab';

import styles from './contactDetail.styles';
import { baseUrl } from '../../constant';
import Alert from '../../component/alertModal';
import Loading from '../../component/loadingIndicator';

export default class ContactDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: undefined,
      loading: false,
      error: false,
      success: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('fullName')
  });

  componentDidMount() {
    const { navigation } = this.props;

    if (navigation.getParam('isSuccessEdit')) {
      this.setState({ success: 'Update contact is success !' }, () => {
        setTimeout(() => {
          this.setState({ success: false })
        }, 2000);
      });
    }

    this.setState({ loading: true }, () => {
      axios.get(`${baseUrl}/contact/${navigation.getParam('id')}`)
        .then(response => {
          this.setState({
            contact: response.data.data,
            loading: false
          });
        })
        .catch(err => {
          this.setState({
            contact: err.message,
            loading: false
          });
        });
    });
  }

  _setState = (formName) => (value) => {
    this.setState({ [formName]: value });
  }

  _onFabPressed = () => {
    const { contact } = this.state;
    // this method is triggered when user press Floating Action Button
    // it will navigate the app to add new contact
    this.props.navigation.navigate('form', {
      isEdit: true,
      ...contact
    });
  };

  render() {
    const { contact, loading, success, error } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.circle}>
        {
          contact && contact.photo !== 'N/A' ?
            <Image source={{uri: get(contact, 'photo')}} style={styles.image}/> :
            <Text style={styles.circleText}>
              {`${get(contact, 'firstName', '').substr(0, 1)}${get(contact, 'lastName', '').substr(0, 1)}`}
            </Text>
        }
        </View>

        <Text style={styles.description}>
          {`Hi fellas ! My name is ${get(contact, 'firstName')} ${get(contact, 'lastName')}\n`}
          {`i'm ${get(contact, 'age')} year's old`}
        </Text>

        <FAB
          visible={true}
          onClickAction={this._onFabPressed}
          buttonColor={'#64b5f6'}
          iconTextComponent={<Icon name={'edit'} color={'#fff'} size={20}/>}
        />

        <Loading loading={loading} />

        <Alert success={success} error={error} onClose={this._setState}/>
      </View>
    );
  }
}

