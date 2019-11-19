// pages/after-sales-detail/index.js
var api = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    state: ["已退款", "待支付", "待发货", "待收货", "待评价", "已评价", "取消订单", "申请退款"]
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.initData(options.id)
  },
  initData:function(id){
    api.orderDetail(id,res=>{
      var data = res.body;
      data.newOrderState = this.data.state[data.orderState];
      this.setData({
        result: data
      })
    })
  }
})