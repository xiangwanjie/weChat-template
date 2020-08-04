const { guestApi } = require('api.js')

module.exports = {
  // 短信登录
  login: `${guestApi}/wechat/guest/login`,

  // 登出
  loginOut: `${guestApi}/wechat/guest/loginOut`,
}