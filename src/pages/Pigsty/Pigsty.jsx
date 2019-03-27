import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';
import cookie from 'react-cookies'

export default class Pigsty extends Component {
  static displayName = 'Pigsty';

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    const userid=cookie.load("userid");
    const password=cookie.load("password");
    const address=cookie.load("address");
    if(userid!=null&&password!=null&&address!=null){
      
    }else{
      window.location.href =  `${window.location.origin}/#/login`;
    }
  }
  render() {
    return (
      <div className="pigsty-page">
        <AuthorityTable />
      </div>
    );
  }
}
