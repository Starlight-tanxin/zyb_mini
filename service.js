// 根据网易免费公开课思想  封装 细化 模块

// 新建service.js
var recourse = {
  doMain: 'https://zyb.hnsxyts.com/'
}

// 暴露方法
module.exports = {

  // Get 
  // finaciall 项目名
  fetch: function (option,cb) {
    var type = "GET";
    if (option.type == 'post' || option.type == 'POST') {
      type = 'POST';
    }
    wx.request({
      url: recourse.doMain + 'zyb/' + option.url,
      data: option.data,
      method: type,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync('openId')
      },
      success: function (res) {
        console.log(res);
        // console.log(option.url);
        // console.log("我是拦截器")
        if (res.data.status == 200) {
          cb(res.data);
        } else if (res.statusCode == 500){
          wx.showModal({
            title: '提示',
            content: "服务器报错",
            showCancel: false
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel:false
          })
        }
      },
      fail: function (res) {
        wx.showModel({
          title: '提示',
          content: res.errMsg,
          showCancel: false
        })
      }
    })
  },
  getUserInfo:function(cb){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // wx.setStorageSync('userInfo', res.userInfo)
              cb(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
  



}

