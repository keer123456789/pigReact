import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';
import cookie from 'react-cookies';

export default class Check extends Component {
  static displayName = 'Check';

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
      <div className="check-page">
        <AuthorityTable />
      </div>
    );
  }
}
