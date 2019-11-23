// pages/message/index.js
var app =getApp();
Page({
  data: {

  },
  onShow: function (options) {
    this.initData();
  },
  initData:function(){
    app.func.fetch({
      url:'msg/list',
    },res=>{
      console.log(res)
      this.setData({
        list:res.body
      })
    })
  },
  gotoDetail:function(e){
    wx.navigateTo({
      url: '../we-chat-ui/index?id=' + e.currentTarget.dataset.id,
    })
  }
})