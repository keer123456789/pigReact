import React, { Component } from 'react';
import TrendChart from './components/TrendChart';
import cookie from 'react-cookies';

export default class Detail extends Component {
  static displayName = 'Detail';

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
      <div className="detail-page">
        <TrendChart />
      </div>
    );
  }
}
