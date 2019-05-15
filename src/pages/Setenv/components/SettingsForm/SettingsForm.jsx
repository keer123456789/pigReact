import React, { Component } from 'react';
import TableFilterPi from './TableFilterPi';
import SettingEnv from './SettingEnv';
import TableFilterEnv from './TableFilterEnv'
import SettingPi from './SettingPi';
import TableFilterInfo from './TableFilterInfo';
import Operation from '../../../../api/api'
import SettingInfo from './SettingInfo';
import ShowFarmInfo from './ShowFarmInfo';
import cookie from 'react-cookies';

const {getFarmInfo} = Operation;
export default class SettingsForm extends Component{
  static displayName = "SettingsForm";

  static propTypes ={};

  static defaultProps ={};
  constructor(props) {
    super(props);
    this.state = {
      data:""
    };
  }

  componentWillMount=async()=>{
    const res= await getFarmInfo(cookie.load('address'));
    this.setState({
        data:res
    })
  }
  print=()=>{
    if(this.state.data.message==='success'){
      return (
        <ShowFarmInfo />
        )
    }else{
      return (<SettingInfo />)
    }

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
        {this.print()}
        {/* <SettingInfo /> */}
      </div>
    );
  }
}

const styles = {};