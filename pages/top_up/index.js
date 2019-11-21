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
      var inputVal = this.data.inputVal;
      if (inputVal > 5000 || inputVal <= 0){
        wx.showToast({
          title: '充值金额为0-5000',
          icon: "none"
        });
      }else{
        api.orderPay({
          orderId:0,
          orderType : 5,
          amount: inputVal
        },res=>{
          wx.showToast({
            title: "充值成功",
            duration: 2000,
            complete: function () {
              wx.navigateBack({
                delta: 1  // 返回上一级页面。
              });
              // wx.redirectTo({
              //   url: '../account-detail/index',
              // })
            }
          });
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