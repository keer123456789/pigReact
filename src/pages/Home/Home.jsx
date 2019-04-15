import React, { Component } from 'react';
import cookie from 'react-cookies';
import ProjectOverview from './components/ProjectOverview';
import TopActiveChart from './components/ProjectOverview/TopActiveChart';


export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
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
      <div className="home-page">
        <ProjectOverview />
        <TopActiveChart />
      </div>
    );
  }
}
