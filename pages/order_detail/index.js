// pages/order_detail/index.js
var api = require("../../api.js");
Page({
  data: {
    popChoseShow:false,
    show: false,
    message:'',
    orderId:"",
    result:"",
    eavType:'1',
    choseVal:"满意",
    state: ["已退款", "待支付", "待发货", "待收货", "待评价", "已评价", "取消订单", "申请退款"],
    expressInfo: ["在途", "揽收", "疑难", "签收", "退签", "派件", "退回","转投"]
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  popchoseShow:function(){
    this.setData({ popChoseShow: !this.data.popChoseShow });
  },
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        orderId: options.id
      });
      api.orderPayDetail({
        orderId:options.id
      },res=>{
        console.log(res)
        var result = res.body;
        result.orderStateText = this.data.state[result.orderState];
        if (result.expressInfoState){
          result.expressInfoState = this.data.expressInfo[result.expressInfo.state] || '未知';
        }
        this.setData({
          result
        })
      })
    }
  },
  gotoWL:function(){
    wx.navigateTo({
      url: '../order_wl_detail/index?id=' + this.data.orderId,
    })
  },
  onChange:function(e){
    this.setData({
      message: e.detail
    })
  },
  choseEveal:function(e){
    this.setData({
      popChoseShow:false,
      eavType: e.currentTarget.dataset.type,
      choseVal: e.currentTarget.dataset.val
    })
  },
  // 评价
  orderEveal:function(){
    api.orderEveal({
      eavMsg:this.data.message,
      eavType: this.data.eavType,
      shopOrderId:this.data.orderId
    },res=>{
      this.setData({
        show:false
      })
    })
  },
  // 拨打电话
  callMobile: function () {
    wx.makePhoneCall({
      phoneNumber: '0731-84121691',
    })
  },
})