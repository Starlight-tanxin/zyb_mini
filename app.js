//app.js
var service = require('service.js');

App({
  onLaunch: function () {
    
    

    // 登录
    if(!wx.getStorageSync("openId")){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var url = 'login/getCredential/' + res.code
          console.log(url,"qwee")
          service.fetch({ url }, res => {
            console.log(res)
            wx.setStorageSync("openId", res.body.openid);
          })
        }
      })
    }
    
    
  },
  globalData: {
    userInfo: null
  },
  func:{
    fetch: service.fetch
    
  }
})