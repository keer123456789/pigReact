import cookie from 'react-cookies';
import { get, post } from './request.js';


const ip="http://127.0.0.1:8080";

/**
 * 获取全部猪的信息
 */
const displaypig = () => {
  return get(`${ip}/getAllPig`)
    .then((res) => {
      return res.data;
    });
};

/**
 * 
 * @param  value 
 */
const get721 = (value) =>{
  return post(`${ip}/getPigERC721ID`,{
    data:value
  });
}

const addPig = (value) => {
  return post(`${ip}/addpig`, {
    data: value,
  });
};
//快查中心列表，没有721ID
const checkSelect = () => {
  return get(`${ip}/getAllPig`);
};
// 显示猪的详情
const showDetail = (id) => {
  return get(`${ip}/getPigInfo/${id}`)
    .then((resp) => {
      return resp.data[0];
    });
};
// 显示健康信息
const showHealthMin = (id) => {
  return get(`${ip}/getPigHealthInfo/${id}`)
    .then((resp) => {
      return resp;
    });
};


const showpiglist = (id) => {
  return get(`${ip}/getPigList/${id}`)
    .then((resp) => {
      return resp.data;
    });
};
// 显示猪舍信息
const pigsty = () => {
  return get(`${ip}/pigHouseList`);
};

const showEnvironmentalMin = (id) => {
  return get(`${ip}/getPigHouseEnv/${id}`)
    .then((resp) => {
      return resp.data;
    });
};
// 添加猪舍信息
const addPigsty = (value) => {
  return post(`${ip}/addPighouse`, {
    data: value,
  });
};

// 显示猪舍ID列表
const pigstylist = () => {
  return get(`${ip}/pigHouseIdList`)
    .then((resp) => {
      return resp.data;
    });
};



/**
 * 配置环境的信息
 * @param {*} value 
 */
const setEnv=(value)=>{
  return post(`${ip}/setEnv`,{
    data:value,
  });
}
/**
 * 设置养殖场基本信息
 * @param {*} value 
 */
const setFarmInfo=(value)=>{
  return post(`${ip}/setFarmInfo`,{
    data:value,
  });
}

const getFarmInfo=(value)=>{
  return get(`${ip}/getFarmInfo/${value}`);
  
}




/**
 * 用户提交审核
 */
const register =(value)=>{
  return post(`${ip}/register`,{
    data:value,
  })
}

/**
 * 登录
 * @param  value 
 */
const login = (value) => {
  // cookie.save('account', value.account);
  return post(`${ip}/login`, {
    data: value,
  });
};

/**
 * 创建树莓派资产
 * @param {*} value 
 */
const createPiAsset =(value)=>{
  return post(`${ip}/createRaspberryAsset`,{
    data:value,
  })
}

/**
 * 获得nodemcuIP
 */
const getNodeMcuIP=()=>{
  return get(`${ip}/getNodeMcuIp`)
  .then((resp) => {
    return resp.data;
  });
}

const getAllRaspberry=()=>{
  return get(`${ip}/getAllRaspberry`)
  .then((resp)=>{
    return resp.data;
  });
}

const setBigchainDBKey=(value)=>{
  return post(`${ip}/setBigchainDBKey?key=${value}`)
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
