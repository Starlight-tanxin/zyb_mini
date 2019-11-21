// pages/order_detail_2/index.js
var api = require('../../api.js');
Page({
  data: {
    id:''
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    this.initData(options.id);
    // this.initData(1);
  },
  initData:function(id){
    api.appreciaDetail1(id,res=>{
      this.setData({
        result:res.body
      })
    })
  },
  pay:function(){
    api.orderPay({
      orderId : this.data.id,
      orderType:2,
      repairType: this.data.result.maintainState==2?0:1
    })
  },
  // 拨打电话
  callMobile: function () {
    wx.makePhoneCall({
      phoneNumber: '0731-84121691',
    })
  },
})