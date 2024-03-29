// pages/mark_sure_order/index.js
var api = require("../../api.js");
Page({
  data: {
    orderId:"",
    userAddressId:''
  },
  onLoad: function (options) {
    console.log(options)
    if(options.orderId){
      this.initData(options.orderId);
      this.setData({
        orderId:options.orderId
      })
    }
  },
  initData:function(id){
    api.orderDetail(id,res=>{
      this.setData({
        result:res.body
      })
    })
  },
  gotoAdress:function(){
    wx.navigateTo({
      url: '../address/index',
    })
  },
  pay:function(){
    if (JSON.stringify(this.data.result.userAddress) == '{}' || this.data.result.userAddress == null){
      wx.showToast({
        title: '请选择收获地址',
        icon:'none'
      })
      return;
    }
    // api.orderPay({
    //   orderId:this.data.orderId,
    //   orderType:3,
    //   userAddressId: this.data.result.userAddress.id
    // })
    var obj={
      orderId:this.data.orderId,
      orderType:3,
      userAddressId: this.data.result.userAddress.id,
      price: this.data.result.orderPrice + this.data.result.expressPrice
    }
    wx.setStorageSync('payObj',obj)
    wx.navigateTo({
      url: '../pay/idnex?type=1'
    })
  },
  gotoAddress:function(){
    wx.navigateTo({
      url: '../add_address/index',
    })
  }
  
})