import axios from 'axios'
import apiConfig from './config'
/* eslint-disable */
//接口地址
// var BASE_URL='http://localhost:3000'
// var BASE_URL='https://virtserver.swaggerhub.com/ludun/screen/v1'

// var BASE_URL='http://192.168.1.188:8080/screen/api/v1'

// var BASE_URL='http://192.168.1.188:8080/screen/api/v1'
const baseURL = apiConfig.baseURL1;
// const baseURL = config.baseURL1;
var debug=true

//关于axios的请求中止 开始
// 创建axios实例
const service = axios.create({
	timeout: 600000000000 // 请求超时时间
  })
var onprogress = ''
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// var cancelSource="";
var cancelToken = axios.CancelToken
var source = cancelToken.source()
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识

let removePending = (config) => {
	for(let p in pending){
		if(pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
			pending[p].f(); //执行取消操作
			pending.splice(p, 1); //把这条记录从数组中移除
		}
	}
}
// 添加request拦截器
service.interceptors.request.use(config => {
	removePending(config); //在一个ajax发送前执行一下取消操作
	config.cancelToken = new cancelToken((c)=>{
	  // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
	  pending.push({ u: config.url + '&' + config.method, f: c });
	});
	if (onprogress !== '') {
	  config.onUploadProgress = onprogress
	}
	config.headers['token'] = localStorage.getItem('token')
	return config
  }, error => {
	Promise.reject(error)
  })

//关于axios的请求中止 结束


export default {
	get(url,params,callback){
		let token = localStorage.getItem('token');
		if(token){
			var header = {
				'Accept':'application/json',
				'token':token
			}
		}
		axios.get(baseURL+url,{
			params,
			headers:header
		}).
		then(res=>{
			callback && callback(res.data)
		})
		.catch(err=>{
			if (debug) {
				console.log('======请求错误======'+err)
			}
			return null
		})
	},
	post(url,params,callback,option,handle){
		if(handle == 'upload'){
			var header = {'Content-Type': 'multipart/form-data'}
		}else{
			var header = {'Accept':'application/json'}
		}
		let token = localStorage.getItem('token');
		if(token){
			header['token'] = token;
		}
		axios.post(baseURL+url,params,{			
		// axios.post(url,params,{			
			headers: header,
			onUploadProgress:option?option:'',
		}).
		then(res=>{
			if(handle == 'upload'){	
				callback && callback(res);
			}else{
				callback && callback(res.data);
			}
		})
		.catch(err=>{
			callback('error');
			console.log('======请求错误======'+err)
			return null
		})
	}
}