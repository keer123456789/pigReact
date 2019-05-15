import cookie from 'react-cookies';
import { get, post } from './request.js';

const displaypig = () => {
  return get('http://127.0.0.1:8080/getAllPig')
    .then((res) => {
      return res.data;
    });
};

const get721 = (value) =>{
  return post('http://127.0.0.1:8080/getPigERC721ID',{
    data:value
  });
}

const addPig = (value) => {
  return post('http://127.0.0.1:8080/addpig', {
    data: value,
  });
};
//快查中心列表，没有721ID
const checkSelect = () => {
  return get('http://127.0.0.1:8080/getAllPig');
};
// 显示猪的详情
const showDetail = (id) => {
  return get(`http://127.0.0.1:8080/getPigInfo/${id}`)
    .then((resp) => {
      return resp.data[0];
    });
};
// 显示健康信息
const showHealthMin = (id) => {
  return get(`http://172.16.1.170:8080/getPigHealthInfo/${id}`)
    .then((resp) => {
      return resp;
    });
};


const showpiglist = (id) => {
  return get(`http://127.0.0.1:8080/getPigList/${id}`)
    .then((resp) => {
      return resp.data;
    });
};
// 显示猪舍信息
const pigsty = () => {
  return get('http://127.0.0.1:8080/pigHouseList');
};

const showEnvironmentalMin = (id) => {
  return get(`http://127.0.0.1:8080/getPigHouseEnv/${id}`)
    .then((resp) => {
      return resp.data;
    });
};
// 添加猪舍信息
const addPigsty = (value) => {
  return post('http://127.0.0.1:8080/addPighouse', {
    data: value,
  });
};

// 显示猪舍ID列表
const pigstylist = () => {
  return get('http://127.0.0.1:8080/pigHouseIdList')
    .then((resp) => {
      return resp.data;
    });
};



/**
 * 配置环境的信息
 * @param {*} value 
 */
const setEnv=(value)=>{
  return post('http://127.0.0.1:8080/setEnv',{
    data:value,
  });
}
/**
 * 设置养殖场基本信息
 * @param {*} value 
 */
const setFarmInfo=(value)=>{
  return post('http://127.0.0.1:8080/setFarmInfo',{
    data:value,
  });
}

const getFarmInfo=(value)=>{
  return get(`http://127.0.0.1:8080/getFarmInfo/${value}`);
  
}




/**
 * 用户提交审核
 */
const register =(value)=>{
  return post('http://127.0.0.1:8080/register',{
    data:value,
  })
}

/**
 * 登录
 * @param  value 
 */
const login = (value) => {
  // cookie.save('account', value.account);
  return post('http://127.0.0.1:8080/login', {
    data: value,
  });
};

/**
 * 创建树莓派资产
 * @param {*} value 
 */
const createPiAsset =(value)=>{
  return post('http://127.0.0.1:8080/createRaspberryAsset',{
    data:value,
  })
}

/**
 * 获得nodemcuIP
 */
const getNodeMcuIP=()=>{
  return get('http://127.0.0.1:8080/getNodeMcuIp')
  .then((resp) => {
    return resp.data;
  });
}

const getAllRaspberry=()=>{
  return get('http://127.0.0.1:8080/getAllRaspberry')
  .then((resp)=>{
    return resp.data;
  });
}

const setBigchainDBKey=(value)=>{
  return get(`http://127.0.0.1:8080/setBigchainDBKey/${value}`)
}



export default {
  login,
  displaypig,
  addPig,
  checkSelect,
  showDetail,
  showHealthMin,
  pigsty,
  showEnvironmentalMin,
  showpiglist,
  addPigsty,
  pigstylist,
  register,
  get721,
  setEnv,
  createPiAsset,
  getNodeMcuIP,
  getAllRaspberry,
  setFarmInfo,
  getFarmInfo,
  setBigchainDBKey,
};
