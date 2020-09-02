//mock/index.js
// 引入mockjs
import Mock from 'mockjs'

// 引入mock.js生成的模拟数据
import {loginMock} from './mock'

// 设置请求延时时间
Mock.setup({
  timeout: '500 - 1500' 
})

// 设置拦截的接口 格式请看文档 https://github.com/nuysoft/Mock/wiki/Mock.mock()
// 注意: 这里拦截的地址 最好使用正则匹配 如果直接使用字符串接口 就有可能拦截不到带参数的请求 报错404
// 语法： Mock.mock( rurl?, rtype?, template|function( options ) )
Mock.mock(RegExp('/api/epf-supply/tsell/getSearchDic' + ".*"), 'get', loginMock)