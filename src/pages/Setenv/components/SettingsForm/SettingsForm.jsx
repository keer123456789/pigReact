import React, { Component } from 'react';
import TableFilterPi from './TableFilterPi';
import SettingEnv from './SettingEnv';
import TableFilterEnv from './TableFilterEnv'
import SettingPi from './SettingPi'
import TableFilterInfo from './TableFilterInfo'

import SettingInfo from './SettingInfo';

export default class SettingsForm extends Component{
  static displayName = "SettingsForm";

  static propTypes ={};

  static defaultProps ={};
  constructor(props) {
    super(props);
    this.state = {};
  }
  
 

  render() {
    return (
      <div style={styles.container}>
        <TableFilterPi />
        <SettingPi />
        <br></br>
        <TableFilterEnv/>
        <SettingEnv />
        <br></br>
        <TableFilterInfo/>
        <SettingInfo />
      </div>
    );
  }
}

const styles = {};