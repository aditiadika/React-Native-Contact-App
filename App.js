import React from 'react';
import Root from './src';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return (
      <Root/>
    );
  }
}