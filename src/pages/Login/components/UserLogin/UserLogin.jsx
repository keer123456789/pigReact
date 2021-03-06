/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Grid, Upload } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';
import Operations from '../../../../api/api';
import cookie from 'react-cookies';

const { login } = Operations;
const { Row, Col } = Grid;
// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage = require('./images/pig.jpg');

export default class UserLogin extends Component {
  static displayName = 'UserLogin';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      file:{}
    };
  }

 

  register = async () => {
    window.location.href = `${window.location.origin}/#/register`;
  }
  handleSubmit = async () => {
    this.formRef.validateAll(async (error, value) => {
      if (error) {
        // 处理表单报错
      } else {
        console.log(value);
        value.address='0x'+this.state.file.address;
        console.log(value);
        const result = await login(value);
        console.log(result);
        if (result.message === 'success') {
          cookie.save("userid",value.account);
          cookie.save("address",value.address);
          cookie.save("password",value.password);
          window.location.href = `${window.location.origin}/#/manage/company`;
        }else{

        }
      }
    });
  };

  fileUpLoad =(e)=>{
    const a=this;
    console.log(e);
    var reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function(e) {
      a.setState({
        file:JSON.parse(e.target.result)
      });
    }
  }

  render() {
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            欢迎使用 <br /> 智能养猪管理系统
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref={(formRef) => {
                this.formRef = formRef;
              }}
            >
              <div style={styles.formItems}>
              <Row style={styles.formItem}>
                  <Col style={styles.row}>
                    <IceIcon
                      type="message"
                      size="small"
                      style={styles.inputIcon}
                    />
                      <input 
                        type="file"
                        accept="*.txt"
                        required="required"
                        message="必填"
                        onChange={this.fileUpLoad}
                      />
                  </Col>

                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="person"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="account" required message="必填">
                      <Input maxLength={20} placeholder="用户名" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="password" required message="必填">
                      <Input htmlType="password" placeholder="密码" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="password" />
                  </Col>
                </Row>

                

                <Row style={styles.formItem}>
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    style={styles.submitBtn}
                  >
                    登 录
                  </Button>
                </Row>

                <Row className="tips" style={styles.tips}>
                  <a href={`${window.location.origin}/#/register`} style={styles.link}>
                    立即注册
                  </a>
                  
                  
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    opacity: 0.4,
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
  row:{
    marginLeft:'20px'
  }
};
