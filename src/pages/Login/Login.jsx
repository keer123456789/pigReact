import React, { Component } from 'react';
import UserLogin from './components/UserLogin';
import './Login.scss';
import cookie from'react-cookies';

export default class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    const userid=cookie.load("userid");
    const password=cookie.load("password");
    const address=cookie.load("address");
    console.log(userid);
    console.log(password);
    console.log(address);
    if(userid!=null&&password!=null&&address!=null){
      window.location.href =  `${window.location.origin}/#/manage/company`
    }else{
      window.location.href =  `${window.location.origin}/#/login`;
    }
  }
  render() {
    return (
      <div className="login-page">
        <UserLogin />
      </div>
    );
  }
}
