import React, { PureComponent } from 'react';
import { Balloon, Icon, Dialog ,Grid,Button,Feedback} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder'
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { headerMenuConfig } from '../../menuConfig';
import Logo from '../Logo';
import Operation from '../../api/api'

const {setBigchainDBKey}=Operation
const{Row,Col}=Grid;
export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: cookie.load('account'),
      key:'',
      dialog:"",
    };
  }
  componentWillMount=()=>{
    if(cookie.load('key')==null){
      this.setState({
        dialog:true
      })
    }else{
      this.setState({
        dialog:false
      })
    }
  }
  close = () => {
    cookie.save('status', 0);
    window.location.reload();
  }
  //点击按钮，将数据密钥写入cookie
  handleSubmit = async() => {
    cookie.save('key',this.state.key);
    const res=await setBigchainDBKey(this.state.key);
    if(res.message==='success'){
      this.setState({
        dialog:false,
      });
      Feedback.toast.success("设置数据密钥成功！！！")
    }else{
      Feedback.toast.error("设置数据密钥失败！！！")
      window.location.reload();
    }
  }
  //读取密钥文件
  fileUpLoad =(e)=>{
    const a=this;
    console.log(e);
    var reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function(e) {
      a.setState({
        key:e.target.result
      });
    }
  } 

  hideDialog = () => {
    this.setState({
      dialog: true,
    });
  };
  render() {
    const { width, theme, isMobile, className, style } = this.props;
    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src={require('./images/pig.png')}
                  className="user-avatar"
                  style={{ background: '#fff' }}
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {this.state.account}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px' }}
                  >
                    猪场企业
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              {/* <li className="user-profile-menu-item"> */}
              {/* <Link to="/"> */}
              {/* <FoundationSymbol type="person" size="small" /> */}
              {/* 我的主页 */}
              {/* </Link> */}
              {/* </li> */}
              {/* <li className="user-profile-menu-item"> */}
              {/* <Link to="/"> */}
              {/* <FoundationSymbol type="repair" size="small" /> */}
              {/* 设置 */}
              {/* </Link> */}
              {/* </li> */}
              <li className="user-profile-menu-item" onClick={() => { this.close(); }}>
                <Link to="/">
                  <FoundationSymbol type="compass" size="small" />
                  退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
        <Dialog
          className="simple-form-dialog"
          style={{width:'500px'}}
          autoFocus
          footerAlign="center"
          title="添加密钥"
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.dialog}
        >
          <div className="create-activity-form">
            <IceFormBinderWrapper>
              <div >
                <Row style={styles.formItem}>
                  <Col style={styles.row}>
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
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    style={styles.submitBtn}
                  >
                    提 交
                  </Button>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </Dialog>
      </Layout.Header>
    );
  }
}

const styles={
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
}