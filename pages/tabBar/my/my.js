const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../config/my.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /* 获取数据 -- 示例*/
  getUserIndustry() {
    utils.request(api.myIndustry, {}, 'post').then(res => {
      // 业务逻辑代码
    }).catch(err => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  }
})