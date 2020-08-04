const utils = require('../../../utils/util.js')
const api = require('../../../config/home.js')
const comm = require('../../../config/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mallList: [],
    selCity: '', // 选中的城市
    cityCode: '',
    defaultCity: '', // 默认定位城市
    selMallName: '', // 选中的商场
    showScearchModal: false,
    isSendRequest: true,  // 是否可以发送请求数据
  },

  /* 获取枚举信息 -- 示例*/
  getEnumInfo() {
    if (!this.data.isSendRequest) return false
    this.setData({
      isSendRequest: false
    })
    utils.request(comm.enumInfo, {}, 'post').then(res => {
      this.setData({
        isSendRequest: true
      })
      wx.setStorageSync('enumInfo', res.value)
    }).catch(err => {
      this.setData({
        isSendRequest: true
      })
      console.error(err)
    })
  },

  
  /* 获取商场列表 -- 示例 */
  getMallList() {
    if (!this.data.isSendRequest) return false
    this.setData({
      isSendRequest: false
    })
    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    let cityName = this.data.selCity || this.data.defaultCity || '北京市'
    let cityCode = this.data.cityCode || ''
    let selMallName = this.data.selMallName || ''

    utils.request(api.mallList, {
      cityName: cityName,
      cityCode: cityCode,
      mallName: selMallName,
    }, 'post').then(res => {
      this.setData({
        isSendRequest: true
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let data = res.value
      this.data.mallList = []
      this.setData(this.data)
      this.data.mallList = data
      this.setData(this.data)

      if (this.data.defaultCity == '' || this.data.defaultCity == null) {
        wx.setStorageSync('city', {
          cityName: city,
          cityCode: ''
        })
      }
      
    }).catch(err => {
      this.setData({
        isSendRequest: true
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 埋点代码示例
    // utils.request(comm.uryingPoint('p', 'home'), {}, 'get') // 首页p埋点
    // utils.request(comm.uryingPoint('z', 'home'), {}, 'get') // 首页z埋点
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  
  }
})