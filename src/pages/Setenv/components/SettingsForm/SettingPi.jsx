import React, { Component } from 'react';
import { Table, Dialog, Button, Input ,Select,Feedback} from '@icedesign/base';
import Operation from '../../../../api/api';
import IceContainer from  '@icedesign/container';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';
import IceIcon from '@icedesign/icon';
import { async } from 'q';

const { createPiAsset,getNodeMcuIP,getAllRaspberry,pigstylist} = Operation;

export default class SettingPi extends Component {
    static displayName='SettingPi';
    
    constructor(props){
        super(props);
        this.state={
            nodeMcuIp:[],
            pigSty:[],
            PiMac:'',
            PiIp:'',
            PiStatus:'',
            assetId:'',
            dialog:'',
            dataSource:[],
        };
    }
    
    componentWillMount = async () => {
      const result = await getNodeMcuIP();
      const newpigsty=await pigstylist();
      const res = await getAllRaspberry();
      console.log(newpigsty)
      this.setState({
        nodeMcuIp: result,
        dataSource:res,
        pigSty:newpigsty,
      });
    }

    operationMcuIP =  () => {
        const operation = [];
        const athis = this;
        for (let i = 0; i < this.state.nodeMcuIp.length; i++) {
          operation.push({ label:this.state.nodeMcuIp[i] , value: this.state.nodeMcuIp[i]  });
        }
        return operation;
    };

    operationPigSty = () =>{
      const operation = [];
      const athis = this;
      for (let i = 0; i < this.state.pigSty.length; i++) {
        operation.push({ label:athis.state.pigSty[i] , value: athis.state.pigSty[i]  });
      }
      return operation;
    }

    hideDialog = () => {
      this.setState({
        dialog: false,
      });
    };

    submit = () => {
      this.formRef.validateAll( async(error, value) => {
        if (error) {
          console.log(error)
          // 处理表单报错
        } else {
          const fromvalue ={};
          fromvalue.nodeMcuIp=value.nodeMcuIp;
          fromvalue.pigSty=value.pigSty;
          fromvalue.PiMac=this.state.PiMac;
          fromvalue.PiIp=this.state.PiIp;
          console.log(fromvalue);
          const rep=await createPiAsset(fromvalue);
          if(true){
            this.state.dialog=false;
            window.location.reload();
          }
        }         
      });
    };

    printf = (index) => {
      if(this.state.dataSource[index].PiStatus==='未注册'){
        const mac = this.state.dataSource[index].PiMac.toString();
        const ip = this.state.dataSource[index].PiIp.toString();
        this.setState({
          dialog: true,
          PiMac: mac,
          PiIp: ip,
        });
      }else{
        Feedback.toast.error("不能重复注册！！！！")
      }
    
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

    handleChange=(value) =>{
      console.log(value);
    }

    render(){
        const { dataSource } = this.state;
        return (
            <div style={styles.tableContainer}>
              <Table
                dataSource={dataSource}
                onSort={this.handleSort}
                hasBorder={false}
                className="custom-table"
              >
                <Table.Column width={100} title="树莓派MAC" dataIndex="PiMac"/>
                <Table.Column width={100} title="树莓派IP" dataIndex="PiIp"/>
                <Table.Column width={100} title="树莓派状态" dataIndex="PiStatus"/>
                <Table.Column width={200} title="资产ID" dataIndex="assetId"/>
                
                {/* <Table.Column width={100} title="操作" dataIndex="operation" /> */}
                <Table.Column
                  width={100}
                  title="创建资产"
                  cell={this.renderOper}
                  align="center"
                  value="创建资产"
                />
              </Table>
              <Dialog
                className="simple-form-dialog"
                style={{ width: '1000px' }}
                autoFocus
                footerAlign="center"
                title="创建资产"
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
                              <Col xxs="6" s="2" l="2" style={styles.formLabel} >
                              树莓派MAC:
                                <IceFormBinder name="PiMac">
                                  <Input style={{ width: '50%' }} value={this.state.PiMac}/>
                                </IceFormBinder>                             
                              </Col>
                          </Row>
                          <Row style={styles.formItem}>
                              <Col xxs="6" s="2" l="2" style={styles.formLabel} >
                              树莓派IP：
                              <IceFormBinder name="PiIp">
                                <Input style={{ width: '50%' }} value={this.state.PiIp}/>
                              </IceFormBinder>
                              </Col>
                          </Row>

                          <Row style={styles.formItem}>
                              <Col xxs="6" s="2" l="2" style={styles.formLabel} >
                              猪舍ID：
                              <IceFormBinder name="pigSty">
                              <Select
                                    className="next-form-text-align"
                                    required
                                    style={{ width: '50%' }}
                                    message="选择要监测的猪舍"
                                    dataSource={this.operationPigSty()}
                                  />
                              </IceFormBinder>
                              <IceFormError name="pigSty"/>
                              </Col>
                          </Row>

                          <Row style={styles.formItem}>
                              <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                              nodeMucIP:
                              <IceFormBinder name="nodeMcuIp">
                                  <Select
                                    className="next-form-text-align"
                                    required
                                    style={{ width: '50%' }}
                                    message="请选择3个nodemcuIp"
                                    multiple="multiple"
                                    mode="multiple"
                                    // onChange={this.handleChange}
                                    dataSource={this.operationMcuIP()}
                                  />
                              </IceFormBinder>
                              <IceFormError name="nodeMcuIp"/>
                              </Col>

                          </Row>
                          
                          <Row style={styles.btns}>
                              <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                              {' '}
                              </Col>
                              <Col s="12" l="10">
                              <Button type="primary" onClick={this.submit}>
                                  创建资产
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
  