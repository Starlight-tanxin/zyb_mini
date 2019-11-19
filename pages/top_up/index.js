// pages/top_up/index.js
var api = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    money:'',
    inputVal:""
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money: options.amonut
    })
  },
  setval: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  save:function(){
    if(this.data.checked){
      if(this.data.inputVal > 5000 || this.data.inputVal == 0){
        wx.showToast({
          title: '充值金额为0-5000',
          icon: "none"
        });
      }else{
        api.orderPay({
          orderId:0,
          orderType : 5,
          amount:5
        },res=>{
          wx.navigateBack({
            detail:1
          })
        })
      }
    }else{
      wx.showToast({
        title: '请选择阅读协议',
        icon: "none"
      })
    }
  }
})