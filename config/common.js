const { guestApi, buryingApi } = require('api.js')
const { getCurrentPage } = require('../utils/util.js')
const {  
  BURYING_POINT_SERVICE, 
  URYING_POINT_ID 
} = require('../utils/const')

// 埋点接口
const uryingPoint = (buryingType, idName) => {
  let userInfo = wx.getStorageSync('userInfo')
  let time = new Date().getTime()
  let route = getCurrentPage()
  let id = URYING_POINT_ID[buryingType][idName]
  let newParams = ''
  const system = wx.getSystemInfoSync()
 
  let params = {
    id: id,  // 埋点id
    service: BURYING_POINT_SERVICE,  // 埋点service固定参数
    ts: time, // 当前时间戳
    p_url: route, // 当前路径
    u_phone: userInfo.userMobile, // 用户手机号
    u_mid: userInfo.id,  // 用id 或 userId
    d_os: system.system, // 操作系统版本号
    d_os_version: system.version, // 微信版本号
    d_prixel_x: system.screenWidth, //屏幕宽度
    d_prixel_y: system.screenHeight, //屏幕高度
    d_model: system.model, //设备型号
  }

  Object.keys(params).forEach((key, index) => {
   if(index === 0){
    newParams = `${key}=${params[key]}`
   }else{
    newParams += `&${key}=${params[key]}`
   }
  })

  return `${buryingApi}/${buryingType}?${newParams}`
}

module.exports = {
  // 枚举
  enumInfo: `${guestApi}/guest/common/getEnumInfo`,
  uryingPoint: uryingPoint
}