import { createStackNavigator, createAppContainer } from 'react-navigation';
import ContactList from './screen/contactList/contactList';
import ContactDetail from './screen/contactDetail/contactDetail';
import ContactForm from './screen/contactForm/contactForm';

const stackNavigator = createStackNavigator({
  list: ContactList,
  detail: ContactDetail,
  form: ContactForm
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#64b5f6',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const root = createAppContainer(stackNavigator);

export default root;