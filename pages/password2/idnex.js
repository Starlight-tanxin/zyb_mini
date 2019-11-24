// pages/password1/index.js
var api = require("../../api.js");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    Length: 6,        //输入框个数  
    isFocus: true,    //聚焦  
    Value: '',        //输入的内容  
    ispassword: true, //是否密文显示 true为密文， false为明文。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('type :' +  options.type);
    this.setData({
      type: options.type,
    })
  },
  password_input: function (e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue
    })
  },

  Tap() {
    console.log(1)
    var that = this;
    that.setData({
      isFocus: true,
    })
  },

  getFocus: function () {
    console.log(2)
    this.setData({
      focus: !this.data.focus
    })
  },
  gotoSave: function () {
    var password = this.data.Value;
    var accountPay = wx.getStorageSync('accountPay');
    api.orderAccountPay({
      orderId: accountPay.orderId,
      orderType: accountPay.orderType,
      userAddressId: accountPay.userAddressId ? accountPay.userAddressId : '',
      repairType: accountPay.repairType >= 0 ? accountPay.repairType : '',
      userPayPwd: password,
      amount: accountPay.amount
    }, res => {
      this.setData({
        Value: ''
      });
      wx.removeStorageSync('accountPay');
      wx.navigateTo({
        url: '../pay-sucess/index?type=' + this.data.type,
      })
    });


    //函数结束
  }
})