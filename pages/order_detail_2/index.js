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
    
    // this.initData(1);
  },
  onShow:function(){
    this.initData(this.data.id);
  },
  initData:function(id){
    api.appreciaDetail1(id,res=>{
      this.setData({
        result:res.body
      })
    })
  },
  pay:function(){
    var obj = {
      orderId: this.data.id,
      orderType: 2,
      price: this.data.result.cmMaintainAmount,
      repairType: this.data.result.maintainState == 2 ? 0 : 1
    }
    wx.setStorageSync('payObj', obj);
    wx.navigateTo({
      url: '../pay/idnex?type=2'
    })
    // api.orderPay({
    //   orderId : this.data.id,
    //   orderType:2,
    //   repairType: this.data.result.maintainState==2?0:1
    // },res=>{
    //   wx.navigateTo({
    //     url: '../pay-sucess/index?type=2',
    //   })
    // })
  },
  // 拨打电话
  callMobile: function () {
    wx.makePhoneCall({
      phoneNumber: '0731-84121691',
    })
  },
  gotoPj:function(){
    wx.navigateTo({
      url: '../pj/index?id=' + this.data.id + '&type=1' + '&proId=' + this.data.result.maintainProId ,
    })
  },
  prewvImg: function (e) {
    api.previewImage(e.currentTarget.dataset.imgs, e.currentTarget.dataset.index)
  }
})