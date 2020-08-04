 const app = getApp()

 const formatTime = date => {
   const year = date.getFullYear()
   const month = date.getMonth() + 1
   const day = date.getDate()
   const hour = date.getHours()
   const minute = date.getMinutes()
   const second = date.getSeconds()

   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
 }

 const formatNumber = n => {
   n = n.toString()
   return n[1] ? n : '0' + n
 }

 /*  
   封装异步请求
  */
 const request = (url, data = {}, method = "GET") => {
   let userInfo = wx.getStorageSync('userInfo')
   let token = userInfo && userInfo.token

   wx.getNetworkType({
     success: function (res) {
       if (res.networkType == 'none') {
         tip = '当前无网络，请检查网络连接'
         app.openNetworkErrorModal(tip)
         return false
       }
     }
   })

   return new Promise((resolve, reject) => {
     wx.request({
       url,
       data,
       method,
       header: {
         'Content-type': 'application/json;charset=UTF-8',
         'token': token || ''
       },
       success(res) {
         let {
           data, statusCode
         } = res
         
         if (data.code == 200 || data.status == 200 || data.code == 0 || data.status == 0) {
           resolve(data)
         } else if (data.status == 999 || data.code == 999) {
           //  长文案
           app.openNetworkErrorModal(data.message)
           reject(res)
         } else if (data.status == 401 || data.code == 401) {
           app.removeStorageInfo()
           //  401 登录过期
           let tip = data.message || '登录过期，请重新登录'
           wx.showModal({
             content: tip,
             showCancel: false,
             confirmText: '去登录',
             confirmColor: '#005AE6',
             success(res) {
               wx.reLaunch({
                 url: '/pages/main/main',
               })
             }
           })
           reject(res)
         } else if (data.status == 998 || data.code == 998 || data.status == 430 || data.code == 430) {
           //  短文案
           wx.showToast({
             title: data.message,
             icon: 'none'
           })
           reject(res)
         } else {
           if(data.status != 200 || data.code != 200) {
            statusCode = data.status || data.code || statusCode
           }
           let tip = `网络错误，错误代码：${statusCode}`
           app.openNetworkErrorModal(tip)
           reject(res)
         }
       },
       fail(err) {
         let msg = err.errMsg
         let tip = (msg && msg.replace('request:fail timeout', '响应超时')) || "网络不给力，请稍后再试";
         wx.showToast({
           title: tip,
           icon: 'none',
           duration: 2500
         })
         reject(err)
       }
     })
   })
 }

 /* 
    关键字高亮显示
  */
 const hilightWord = (key, word) => {
   let idx = word.indexOf(key),
     t = [];
   if (idx > -1) {
     if (idx == 0) {
       t = hilightWord(key, word.substr(key.length));
       t.unshift({
         key: true,
         str: key
       });
       return t;
     }

     if (idx > 0) {
       t = hilightWord(key, word.substr(idx));
       t.unshift({
         key: false,
         str: word.substring(0, idx)
       });
       return t;
     }
   }
   return [{
     key: false,
     str: word
   }];
 }

 /* 
    阿拉伯数字转换为简写汉字
  */
 const arabiaToSimplifiedChinese = (Num) => {

   for (let i = Num.length - 1; i >= 0; i--) {
     Num = Num.replace(",", "") //替换Num中的“,”
     Num = Num.replace(" ", "") //替换Num中的空格
   }
   if (isNaN(Num)) { //验证输入的字符是否为数字
     //alert("请检查小写金额是否正确");
     return;
   }
   //字符处理完毕后开始转换，采用前后两部分分别转换
   let part = String(Num).split(".");
   let newchar = "";
   //小数点前进行转化
   for (let i = part[0].length - 1; i >= 0; i--) {
     if (part[0].length > 10) {
       //alert("位数过大，无法计算");
       return "";
     } //若数量超过拾亿单位，提示
     let tmpnewchar = ""
     let perchar = part[0].charAt(i);
     switch (perchar) {
       case "0":
         tmpnewchar = "零" + tmpnewchar;
         break;
       case "1":
         tmpnewchar = "一" + tmpnewchar;
         break;
       case "2":
         tmpnewchar = "二" + tmpnewchar;
         break;
       case "3":
         tmpnewchar = "三" + tmpnewchar;
         break;
       case "4":
         tmpnewchar = "四" + tmpnewchar;
         break;
       case "5":
         tmpnewchar = "五" + tmpnewchar;
         break;
       case "6":
         tmpnewchar = "六" + tmpnewchar;
         break;
       case "7":
         tmpnewchar = "七" + tmpnewchar;
         break;
       case "8":
         tmpnewchar = "八" + tmpnewchar;
         break;
       case "9":
         tmpnewchar = "九" + tmpnewchar;
         break;
     }
     switch (part[0].length - i - 1) {
       case 0:
         tmpnewchar = tmpnewchar;
         break;
       case 1:
         if (perchar != 0) tmpnewchar = tmpnewchar + "十";
         break;
       case 2:
         if (perchar != 0) tmpnewchar = tmpnewchar + "百";
         break;
       case 3:
         if (perchar != 0) tmpnewchar = tmpnewchar + "千";
         break;
       case 4:
         tmpnewchar = tmpnewchar + "万";
         break;
       case 5:
         if (perchar != 0) tmpnewchar = tmpnewchar + "十";
         break;
       case 6:
         if (perchar != 0) tmpnewchar = tmpnewchar + "百";
         break;
       case 7:
         if (perchar != 0) tmpnewchar = tmpnewchar + "千";
         break;
       case 8:
         tmpnewchar = tmpnewchar + "亿";
         break;
       case 9:
         tmpnewchar = tmpnewchar + "十";
         break;
     }
     newchar = tmpnewchar + newchar;
   }
   //替换所有无用汉字，直到没有此类无用的数字为止
   while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
     newchar = newchar.replace("零亿", "亿");
     newchar = newchar.replace("亿万", "亿");
     newchar = newchar.replace("零万", "万");
     newchar = newchar.replace("零零", "零");
   }
   //替换以“一十”开头的，为“十”
   if (newchar.indexOf("一十") == 0) {
     newchar = newchar.substr(1);
   }
   //替换以“零”结尾的，为“”
   if (newchar.lastIndexOf("零") == newchar.length - 1) {
     newchar = newchar.substr(0, newchar.length - 1);
   }
   return newchar;
 }

 /* 
  校验是否为数组
  */
 const isArrayFn = (o) => {
   return Object.prototype.toString.call(o) === '[object Array]';
 }

 /*   
  对象去重 arr:数组， elm：字段名
  */
 const objRepeat = (arr, elm) => {
   // 相同id对象去重
   let hash = {};
   let newArr = arr.reduce(function(item, next) {
     hash[next[elm]] ? '' : hash[next[elm]] = true && item.push(next)
     return item
   }, []);

   return newArr
 }

/* 
  校验用户是否授权位置信息
 */
 const checkLocalInfo = () => {
   return new Promise((resolve, reject) => {
     // 检测用户是否已授权
     wx.getSetting({
       success(res) {
         let userLocation = res.authSetting['scope.userLocation']
         console.log('检测用户是否已授权res: ', res)
         // 已经收取位置信息，调用微信位置信息接口
         console.log('scope.userLocation: ', res.authSetting['scope.userLocation'])
         if (userLocation) {
           resolve()
         } else {
           wx.authorize({
             scope: 'scope.userLocation',
             success() {
               resolve()
             },
             fail(err) {
               // 未授权，引导用户去授权位置信息权限
               wx.showModal({
                 content: '您还没有授权【位置信息】，请点击【去设置】到微信设置页面开启【位置信息】后再返回首页',
                 confirmText: '去设置',
                 confirmColor: '#005AE6',
                 showCancel: false,
                 success(res) {
                   if (res.confirm) {
                     wx.openSetting()
                   }
                 }
               })
             }
           })
         }
       },
       fail(err){
         console.log('检测用户是否已授权err: ', err)
         reject(err)
       }
     })
   })
 }
 
 /* 
  获取当前页面路径
 */
const getCurrentPage = () => {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage.route
}


 module.exports = {
   formatTime: formatTime,
   hilightWord: hilightWord,
   request: request,
   arabiaToSimplifiedChinese: arabiaToSimplifiedChinese,
   isArrayFn: isArrayFn,
   objRepeat: objRepeat,
   checkLocalInfo: checkLocalInfo,
   getCurrentPage: getCurrentPage
 }