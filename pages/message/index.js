// pages/message/index.js
var app =getApp();
Page({
  data: {

  },
  onLoad: function (options) {
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
  }
})