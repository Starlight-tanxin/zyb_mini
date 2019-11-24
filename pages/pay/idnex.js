// pages/pay/idnex.js
var api = require("../../api.js");
var app = getApp();
Page({
  data: {
    radio: '1',
    type:1,
    id:'',
    checked:false,
    result:'',
    show:false,
    focus: true,
    Length: 6,        //输入框个数  
    isFocus: true,    //聚焦  
    Value: "",        //输入的内容  
    ispassword: false, //是否密文显示 true为密文， false为明文。
  },
  onLoad: function (options) {
    var result = wx.getStorageSync('payObj')
    console.log('支付选择页 ： type =' +options.type);
    this.setData({
      result,
      type: options.type,
      id: options.id ? options.id:''
    })
  },
  onShow:function(){
    
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
      api.orderPay({
        orderId:this.data.result.orderId,
        orderType: this.data.result.orderType,
        userAddressId: this.data.result.userAddressId ? this.data.result.userAddressId : '',
        repairType: this.data.result.repairType>=0 ? this.data.result.repairType:'',
        amount: this.data.result.price
      },res=>[
        wx.navigateTo({
          url: '../pay-sucess/index?type=' + this.data.type + '&id=' + this.data.id,
        })
      ])
      }else{
        // 余额支付
        // if (app.globalData.password){
        //   api.orderAccountPay({
        //     orderId: this.data.result.orderId,
        //     orderType: this.data.result.orderType,
        //     userAddressId: this.data.result.userAddressId ? this.data.result.userAddressId : '',
        //     repairType: this.data.result.repairType >= 0 ? this.data.result.repairType : '',
        //     userPayPwd: app.globalData.password,
        //     amount: this.data.result.price
        //   },res=>{
        //     app.globalData.password = '';
        //     wx.navigateTo({
        //       url: '../pay-sucess/index?type=' + this.data.type,
        //     })
        //   })
        // }else{
          wx.setStorageSync('accountPay', {
            orderId: this.data.result.orderId,
            orderType: this.data.result.orderType,
            userAddressId: this.data.result.userAddressId ? this.data.result.userAddressId : '',
            repairType: this.data.result.repairType >= 0 ? this.data.result.repairType : '',
            userPayPwd: app.globalData.password,
            amount: this.data.result.price
          });
          wx.navigateTo({
            url: '../password2/idnex?type=' + this.data.type,
          });
        // }
        
        // this.setData({
        //   show:true
        // })
        // api.orderAccountPay({
        //   orderId: this.data.result.orderId,
        //   orderType: this.data.result.orderType,
        //   userAddressId: this.data.result.userAddressId
        // })
      }
    }else{
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }
  },
  accountPay:function(){
    console.log(this.data.Value)
  },
  onClose:function(){
    this.setData({
      show:false
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
    console.log(2)
    var that = this;
    that.setData({
      isFocus: true,
    })
  },

  getFocus: function () {
    console.log(1)
    this.setData({
      isFocus: true,
    })
  }
})