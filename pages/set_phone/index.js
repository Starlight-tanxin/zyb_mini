// pages/set_phone/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },
  onLoad: function (options) {

  },
  onChange:function(e){
    this.setData({
      value: e.detail
    })
  },
  setPhone:function(){
    if(this.data.value){
      var re = /^1\d{10}$/
      if (re.test(this.data.value)) {
        app.func.fetch({
          url:"mine/update",
          data:{
            mobile: this.data.value
          }
        },res=>{
          wx.showToast({
            title: '设置手机号成功',
          })
        })
      } else {
        wx.showToast({
          title: '手机号不合法',
          icon:"none"
        })
      }

    }
  }
})