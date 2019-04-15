/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Grid ,Feedback} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';
import Operation from '../../../../api/api';

const{setEnv}=Operation;
const { Row, Col } = Grid;

export default class SettingsForm extends Component {
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
      const res =await setEnv(values);
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
              <h2 style={styles.formTitle}>基本设置</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  温度最大值：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="temMax" required max={10} message="必填">
                    <Input size="large" placeholder="27.0" />
                  </IceFormBinder>
                  <IceFormError name="temMax" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  温度最小值：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="temMin" required max={10} message="必填">
                    <Input size="large" placeholder="27.0" />
                  </IceFormBinder>
                  <IceFormError name="temMin" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  湿度最大值：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="HumMax" required max={10} message="必填">
                    <Input size="large" placeholder="27.0" />
                  </IceFormBinder>
                  <IceFormError name="HumMax" />
                </Col>
              </Row>


              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  湿度最小值：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="HumMin" required max={10} message="必填">
                    <Input size="large" placeholder="27.0" />
                  </IceFormBinder>
                  <IceFormError name="HumMin" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  CO2最大值：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="CO2Max" required max={10} message="必填">
                    <Input size="large" placeholder="27.0" />
                  </IceFormBinder>
                  <IceFormError name="CO2Max" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  CO2最小值：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="CO2Min" required max={10} message="必填">
                    <Input size="large" placeholder="27.0" />
                  </IceFormBinder>
                  <IceFormError name="CO2Min" />
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
