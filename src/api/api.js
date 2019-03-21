import cookie from 'react-cookies';
import { get, post } from './request.js';

const displaypig = () => {
  return get('http://127.0.0.1:8080/getAllPig').then((res) => {
    return res.data;
  });
};


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
  return get(`http://127.0.0.1:8080/getPigInfo/${id}`).then((resp)=>{
    return resp.data[0];
  });
};
// 显示健康信息
const showHealthMin = (id) => {
  return get(`http://172.16.1.170:8080/getPigHealthInfo/${id}`).then((resp) => {
    return resp;
  });
};


const showpiglist = (id) => {
  return get(`http://127.0.0.1:8080/getPigList/${id}`).then((resp)=>{
    return resp.data;
  });
};
// 显示猪舍信息
const pigsty = () => {
  return get('http://127.0.0.1:8080/pigHouseList');
};

const showEnvironmentalMin = (id) => {
  return get(`http://172.16.1.170:8080/getPigHouseEnv/${id}`).then((resp) => {
    return resp;
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
  return get('http://127.0.0.1:8080/pigHouseIdList').then((resp) => {
    return resp.data;
  });
};
//增加权限
const addPower = (value) => {
  return post('http://127.0.0.1:8080/addPower',{
    data:value
  });
};

//获得权限
const getPower = () => {
  return get('http://127.0.0.1:8080/getPower').then((resp) => {
    return resp.data;
  });
};

const fixPower = (value) =>{
  return post('http://127.0.0.1:8080/fixPower',{
    data:value
  });
}

const deletePower = (id) =>{
  return get(`http://127.0.0.1:8080/deletePower/${id}`).then((resp) =>{
    return resp.data
  });
}

// mock
const login = (value) => {
  cookie.save('account', value.account);
  return ({
    message: 'success',
  });
};


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
  addPower,
  getPower,
  fixPower,
  deletePower,
};
