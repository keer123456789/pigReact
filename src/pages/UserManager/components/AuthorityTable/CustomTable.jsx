import React, { Component } from 'react';
import { Table, Dialog, Button, Input } from '@icedesign/base';
import IceIcon from '@icedesign/icon';
import Operation from '../../../../api/api';
import IceContainer from '../../../PowerManager/components/AuthorityTable/CustomTable';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';

const { displaypig } = Operation;


export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dialog: false,
      userId: '',
      address: '',
      userName: '',
      userFName: '',
      roleName: '',
      status: '',
    };
  }

  componentWillMount = async () => {
    const result = await displaypig();
    const athis = this;
    if (result != null) {
      athis.setState({
        dataSource: result,
      });
    }
  };

  printf = (index) => {
    const id = this.state.dataSource[index].userId.toString();
    const name = this.state.dataSource[index].userName.toString();
    const fName = this.state.dataSource[index].userFName.toString();
    const address = this.state.dataSource[index].address.toString();
    const status = this.state.dataSource[index].status.toString();
    const roleName = this.state.dataSource[index].roleName.toString();
    this.setState({
      dialog: true,
      userId: id,
      userName: name,
      userFName: fName,
      address: address,
      status: status,
      roleName: roleName,

    });
  };
  renderOper = (record, index) => {
    return (
      <div style={styles.oper}>
        <IceIcon size="small" type="eye" style={styles.editIcon} onClick={() => {
          this.printf(index);
        }}/>
      </div>
    );
  };
  hideDialog = () => {
    this.setState({
      dialog: false,
    });
  };
  submit = () => {
    this.formRef.validateAll(async (error, value) => {
      if (error) {
        // 处理表单报错
      } else {
        const result = await addPower(value);
        console.log(result);
        if (result.message === 'success') {
          window.location.reload();
        }
      }
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={dataSource}
          onSort={this.handleSort}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column width={200} title="地址" dataIndex="address"/>
          <Table.Column width={100} title="用户名" dataIndex="userName"/>
          <Table.Column width={100} title="用户ID" dataIndex="userId"/>
          <Table.Column width={100} title="用户角色" dataIndex="roleName"/>
          <Table.Column width={100} title="上级用户" dataIndex="userFName"/>
          <Table.Column width={100} title="用户状态" dataIndex="status"/>
          {/* <Table.Column width={100} title="操作" dataIndex="operation" /> */}
          <Table.Column
            width={100}
            title="修改用户信息"
            cell={this.renderOper}
            align="center"
          />
        </Table>
        <Dialog
          className="simple-form-dialog"
          style={{ width: '200px' }}
          autoFocus
          footerAlign="center"
          title="修改用户信息"
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.dialog}
        >
          <div className="create-activity-form">
            <IceContainer style={styles.container}>
              <IceFormBinderWrapper
                ref={(formRef) => {
                  this.formRef = formRef;
                }}
                value={this.state.value}
                onChange={this.onFormChange}
              >
                <div>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户地址：{this.state.roleName}
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户角色：
                      <IceFormBinder
                        name="roleId"
                        required
                        message="用户角色必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.roleId}/>
                      </IceFormBinder>
                      <IceFormError name="powerName"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户名：
                      <IceFormBinder
                        name="fName"
                        required
                        message="用户名必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.roleFName}/>
                      </IceFormBinder>
                      <IceFormError name="fName"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户ID：
                      <IceFormBinder
                        name="fName"
                        required
                        message="用户ID必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.roleFName}/>
                      </IceFormBinder>
                      <IceFormError name="fName"/>
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    上级用户：
                    <IceFormBinder
                      name="fName"
                      required
                      message="上级用户必须填写"
                    >
                      <Input style={{ width: '40%' }} value={this.state.roleFName}/>
                    </IceFormBinder>
                    <IceFormError name="fName"/>
                  </Col>
                </Row>


                  <Row style={styles.btns}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      {' '}
                    </Col>
                    <Col s="12" l="10">
                      <Button type="primary" onClick={this.submit}>
                        保存
                      </Button>
                      <Button style={styles.deleteBtn} type="primary" onClick={this.submit}>
                        删除
                      </Button>
                      <Button style={styles.resetBtn} onClick={this.reset}>
                        重置
                      </Button>
                    </Col>
                  </Row>
                </div>
              </IceFormBinderWrapper>
            </IceContainer>
          </div>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'left',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
  deleteBtn: {
    marginLeft: '20px',
  },
};
