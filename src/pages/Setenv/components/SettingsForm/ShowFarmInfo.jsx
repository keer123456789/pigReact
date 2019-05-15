/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Grid ,Feedback} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './Setting.scss';
import Operation from '../../../../api/api';
import cookie from 'react-cookies';

const{getFarmInfo}=Operation;
const { Row, Col } = Grid;

export default class SettingInfo extends Component {
  static displayName = 'SettingInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        farmName:"",
        farmID:"",
        farmLocation:"",
        farmPerson:"",
      },
    };
  }

  componentWillMount=async()=>{
      const res=await getFarmInfo(cookie.load("address"));
      this.setState({
          farmID:res.data.farmID,
          farmName:res.data.farmName,
          farmLocation:res.data.farmLocation,
          farmPerson:res.data.farmPerson,
      })
  }

  // validateAllFormField = () => {
  //   this.refs.form.validateAll(async(errors, values) => {
  //     console.log(values);
  //     values.address=cookie.load('address');
  //     const res =await setFarmInfo(values);
  //     console.log(res);
  //     if(res.message==='success'){
  //       Feedback.toast.success('修改成功！！！！');
  //     }
  //   });
  // };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>养殖场基本信息</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.label}>
                  养殖场名称：{this.state.farmName}
                </Col> 
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.label}>
                  养殖场位置：{this.state.farmLocation}
                </Col> 
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.label}>
                  养殖场法人代表：{this.state.farmPerson}
                </Col>   
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.label}>
                  统一社会信用代码：{this.state.farmID}
                </Col>
              </Row>  
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
    width:'50%'
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
