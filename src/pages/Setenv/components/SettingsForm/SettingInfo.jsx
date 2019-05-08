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

const{setFarmInfo}=Operation;
const { Row, Col } = Grid;

export default class SettingInfo extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll(async(errors, values) => {
      console.log(values);
      values.address=cookie.load('address');
      const res =await setFarmInfo(values);
      console.log(res);
      if(res.message==='success'){
        Feedback.toast.success('修改成功！！！！');
      }
    });
  };

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
              <h2 style={styles.formTitle}>养殖场基本设置</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  养殖场名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="farmName" required max={10} message="必填">
                    <Input size="large" placeholder="与营业执照一致" />
                  </IceFormBinder>
                  <IceFormError name="farmName" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  养殖场位置：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="farmLocation" required max={10} message="必填">
                    <Input size="large" placeholder="与营业执照一致" />
                  </IceFormBinder>
                  <IceFormError name="farmLocation" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  养殖场法人代表：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="farmPerson" required max={10} message="必填">
                    <Input size="large" placeholder="与营业执照一致" />
                  </IceFormBinder>
                  <IceFormError name="farmPerson" />
                </Col>
              </Row>


              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  统一社会信用代码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="farmID" required max={10} message="必填">
                    <Input size="large" placeholder="营业执照右上角" />
                  </IceFormBinder>
                  <IceFormError name="farmID" />
                </Col>
              </Row>

              
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                提 交
                
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
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
