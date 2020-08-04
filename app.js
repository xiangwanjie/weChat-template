//app.js
App({
  onLaunch: function () {
    let that = this
    // 获取状态栏高度，并存储为全局变量
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.statusBarHeight = res.statusBarHeight
        console.log(res.statusBarHeight, 'statusBarHeight')
      }
    })
  },

  // 网络链接错误提示
  openNetworkErrorModal(str) {
    let tip = (str && str.replace('request:fail', '')) || "网络错误，请稍后再试！";
    wx.showModal({
      content: tip,
      confirmText: '知道了',
      confirmColor: '#005AE6',
      showCancel: false
    })
  },

  // 错误提示
  showErrorToast(msg) {
    wx.showToast({
      title: msg,
      duration: 2000,
    })
  },

  /* 退出登录移除登录信息 */
  removeStorageInfo() {
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('city')
  },

  onShow: function () {
    // wx.clearStorageSync()
    let that = this;
    wx.getSystemInfo({
      success: res => {
        let { screenWidth, screenHeight } = res
        console.log("设备信息：",res)
        // iphoneX 、11、Xr、 Max等设备分辨率
        let _screen = [
          {w: 375, h: 812 },
          {w: 414, h: 896 }
        ]
        that.globalData.isIphoneX  = _screen.some(item => item.w === screenWidth && item.h === screenHeight)
        console.log("isIphoneX设备：", that.globalData.isIphoneX )
      }
    })
  },

  globalData: {
    statusBarHeight: 0, // 状态栏高度
    isIphoneX: false,  // 所有页面父容器添加paddging-bottom:68rpx;
    env: 'prod'        // 接口api环境： prod、stg、uat1、dev 
  }
})