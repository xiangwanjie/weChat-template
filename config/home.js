const { guestApi } = require('api.js')

module.exports = {
  // 首页-获取商场列表
  mallList: `${guestApi}/wechat/guest/index/queryMallList`,
}