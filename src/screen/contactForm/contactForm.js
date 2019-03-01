import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import isArray from 'lodash/isArray';
import axios from 'axios';

import styles from './contactForm.styles';
import { baseUrl } from '../../constant';
import FormInput from '../../component/formInput';
import FormDatePicker from '../../component/formDatePicker';
import Loading from '../../component/loadingIndicator';
import Alert from '../../component/alertModal';

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    const { getParam } = props.navigation;

    this.state = {
      firstName: getParam('firstName') || null,
      lastName: getParam('lastName') || null,
      age: getParam('age') || null,
      photo: getParam('photo') || null,
      dateOfBirth: null,
      loading: false,
      error: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('isEdit') ?
      `Edit ${navigation.getParam('firstName')}'s Contact` :
      'Add New Contact',
  });

  _addContact = value => {
    axios.post(`${baseUrl}/contact`, value)
      .then(() => {
        this.setState({ loading: false }, () => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'list', params: { isSuccessAdd: true } })],
          });

          this.props.navigation.dispatch(resetAction);
        });
      })
      .catch(err => {
        const message = err.response.data.message;
        this.setState({ loading: false, error: message });
      });
  }

  _updateContact = value => {
    const { getParam } = this.props.navigation;

    axios.put(`${baseUrl}/contact/${getParam('id')}`, value)
      .then(() => {
        this.setState({ loading: false }, () => {
          const resetAction = StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'list' }),
              NavigationActions.navigate({ routeName: 'detail', params: { isSuccessEdit: true, id: getParam('id'), fullName: `${value.firstName} ${value.lastName}`, } })
            ],
          });

          this.props.navigation.dispatch(resetAction);
        });
      })
      .catch(err => {
        const message = err.response.data.message;
        this.setState({ loading: false, error: message });
      });
  }

  _onSubmit = () => {
    const { getParam } = this.props.navigation;

    this.setState({ loading: true }, () => {
      const { firstName, lastName, age, photo } = this.state;

      value = {
        firstName,
        lastName,
        age,
        photo: photo || 'N/A'
      };

      if (getParam('isEdit'))
        this._updateContact(value);
      else
        this._addContact(value);
    });
  }

  _setState = (formName) => (value) => {
    if (!isArray(formName)) {
      this.setState({ [formName]: value });
    } else {
      this.setState({
        [formName[0]]: value[0],
        [formName[1]]: value[1],
      }); 
    }
  }

  _renderForm = () => {
    const { firstName, lastName, dateOfBirth, photo } = this.state;

    return (
      <View style={styles.formContainer}>
        <FormInput
          setFormStateCallback={this._setState}
          formName={'firstName'}
          label={'First Name'}
          value={firstName}
        />

        <FormInput
          setFormStateCallback={this._setState}
          formName={'lastName'}
          label={'Last name'}
          value={lastName}
        />

        <FormDatePicker
          setDatePicker={this._setState}
          formName={'dateOfBirth'}
          label={'Date of birth'}
          value={dateOfBirth}
        />

        <FormInput
          setFormStateCallback={this._setState}
          formName={'photo'}
          label={'Photo'}
          value={photo}
        />
      </View>
    );
  }

  render() {
    const { loading, error } = this.state;
    const { getParam } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        {this._renderForm()}
        <View style={{ padding: 10 }}>
          <TouchableOpacity
            onPress={this._onSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>
              {getParam('isEdit') ? 'UPDATE' : 'SUBMIT'}
            </Text>
          </TouchableOpacity>
        </View>

        <Loading loading={loading} />

        <Alert error={error} onClose={this._setState}/>
      </View>
    );
  }
}

