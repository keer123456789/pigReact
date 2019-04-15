import React, { Component } from 'react';
import SettingsForm from './components/SettingsForm';

export default class Setenv extends Component {
  static displayName = 'Setenv';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="setenv-page">
        <SettingsForm />
      </div>
    );
  }
}
