const utils = require('../../../utils/util.js')
const api = require('../../../config/task.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    navList: ['待提交', '审核中', '已完成'],
    taskList: [],
    pageSize: 20,
    pageNo: 1,
    total: 0,
    loaderMore: true
  },

  /* 获取数据 -- 示例*/
  getData(times) {
    wx.showLoading({
      title: '加载中',
    })
    let type = this.data.activeIndex + 1
    utils.request(`${api.myTaskList}/${type}`, {
      pageSize: this.data.pageSize,
      pageNo: this.data.pageNo
    }, 'post').then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()

      let value = res.value
      let list = value.list || []

      if (list.length == 0) {
        this.setData({
          loaderMore: false
        })
        return
      }
      if (list.length < 20) {
        this.setData({
          loaderMore: false
        })
      }
      
      if (times == 1) {
        this.data.taskList = this.data.taskList.concat(list)
      } else {
        this.data.taskList = list
      }

      this.data.total = value.pageInfo && value.pageInfo.total
      this.setData(this.data)

    }).catch(err=> {
      wx.hideLoading()
      wx.stopPullDownRefresh()
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  }
})