import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Alert as Warning } from 'react-native';
import FAB from 'react-native-fab';
import axios from 'axios';

import { baseUrl } from '../../constant';
import styles from './contactList.styles';
import Alert from '../../component/alertModal';
import Loading from '../../component/loadingIndicator';

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      success: false,
      loading: false,
      error: false
    };
  }

  static navigationOptions = {
    title: 'Contacts',
  };

  componentDidMount() {
    if (this.props.navigation.getParam('isSuccessAdd')) {
      this.setState({ success: 'Create new contact is success !' }, () => {
        setTimeout(() => {
          this.setState({ success: false })
        }, 2000);
      });
    }

    this._getContact();
  }

  _setState = (formName) => (value) => {
    this.setState({ [formName]: value });
  }

  _getContact = (isDelete) => {
    this.setState({ loading: true }, () => {
      axios.get(`${baseUrl}/contact`)
        .then(response => {
          this.setState({
            loading: false,
            contactList: response.data.data,
            success: isDelete ? 'Delete selected contact is success !' : false
          });
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: err.message
          });
        });
    });
  }

  _deleteContact = id => () => {
    this.setState({ loading: true }, () => {
      axios.delete(`${baseUrl}/contact/${id}`)
        .then(() => {
          this._getContact();
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: err.response.data.message
          });
        });
    });
  }

  _onFabPressed = () => {
    // this method is triggered when user press Floating Action Button
    // it will navigate the app to add new contact
    this.props.navigation.navigate('form');
  };

  _onListPressed = item => () => {
    // this method is triggered when user press List Item
    // it will navigate the app to preview contact detail

    this.props.navigation.navigate('detail', { 
      fullName: `${item.firstName} ${item.lastName}`,
      id: item.id
    });
  };

  _onListLongPressed = item => () => {
    // this method is triggered when user press holding List Item
    // it will trigger the app to show dialog for preview, delete or edit selected item
    Warning.alert(
      `${item.firstName} ${item.lastName}`,
      'What do you want ?',
      [
        {text: 'View It !', onPress: () => {
          this.props.navigation.navigate('detail', { 
            fullName: `${item.firstName} ${item.lastName}`,
            id: item.id
          });
        }, style: 'cancel'},
        {text: 'Delete It !', onPress: this._deleteContact(item.id) , style: 'destructive'},
      ]
    );
  };

  render() {
    const { success, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._getContact}
          refreshing={false}
          data={this.state.contactList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.list}
              onPress={this._onListPressed(item)}
              onLongPress={this._onListLongPressed(item)}
            >
              {
                item.photo !== 'N/A' ?
                  <Image source={{uri: item.photo}} style={styles.image}/> :
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>
                      {`${item.firstName.substr(0, 1)}${item.lastName.substr(0, 1)}`}
                    </Text>
                  </View>
              }
              <Text style={styles.listText}>
                {`${item.firstName} ${item.lastName}`}
              </Text>
            </TouchableOpacity>
          )}
        />
        <FAB
          visible={true}
          onClickAction={this._onFabPressed}
          buttonColor={'#64b5f6'}
        />

        <Loading loading={loading} />

        <Alert success={success} error={error} onClose={this._setState}/>
      </View>
    );
  }
}

