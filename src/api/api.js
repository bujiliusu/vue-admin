import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/devops/api/v1.0/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/devops/api/v1.0/user`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/devops/api/v1.0/user`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.post(`${base}/devops/api/v1.0/user`, { params: params }); };