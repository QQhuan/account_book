// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let url = event.url;
  let data = event.data;

  if(url == null || url == undefined ){
    return 'URL不存在'
  }else{
    return await rp({
      url: url,
      method: "POST",
      body: data,
      json: true,
      headers: {
        "content-Type": "application/json",
        // "content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        // 'User-Agent': 'Request-Promise'
        // "token": event.token
      },
    })
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return '请求失败'
    });
  }
}