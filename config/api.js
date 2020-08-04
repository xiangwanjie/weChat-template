const app = getApp()
const env = app.globalData.env

// 系统 api
const guestApi = {
  'prod': "https://test-api.mmall.com",
  'stg': "https://test-api.mklmall.com",
  'uat1': "http://test-api.uat1.rs.com",
  'dev': "http://test-api.dev.rs.com",
}[env]

// 埋点 api
const buryingApi = {
  'prod': "https://aureuma.mmall.com",
  'stg': "https://aureuma.mklmall.com",
  'uat1': "http://aureuma.uat1.rs.com",
  'dev': "http://aureuma.uat1.rs.com",  // 大数据没有dev环境，默认uat1环境
}[env]

module.exports = {
  guestApi,
  buryingApi
}