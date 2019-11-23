// pages/pay/idnex.js
var api = require("../../api.js");
Page({
  data: {
    radio: '1',
    checked:false
  },
  onLoad: function (options) {

  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onChange1: function (event){
    this.setData({
      checked: event.detail
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  gotoPage: function () {
    wx.navigateTo({
      url: '../common_loop/index',
    })
  },
  save:function(){
    if (this.data.checked){
      if(this.data.radio == 1){
        //微信支付
      }else{
        // 余额支付
      }
    }else{
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }
  }
})