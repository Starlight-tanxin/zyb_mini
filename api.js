
var service = require('./service.js');
var util = require('./utils/util.js');

module.exports = {

  // 购物车初始化
  cartInit:function(cb){
    service.fetch({
      url:"cart/index"
    },res=>{
      cb(res);
    })
  },
  addCart:function(id,cb){
    service.fetch({
      url: "cart/addCart",
      data:{
        goodsId:id
      }
    }, res => {
      console.log(res, "我是购物车");
      cb(res);
    })
  },

  // 鉴赏详情
  appreciaDetail:function(id,cb){
    service.fetch({
      url:"identify/getInfo",
      data:{
        id
      }
    },res=>{
      cb(res)
    })
  },
  // 修复详情
  appreciaDetail1: function (id, cb) {
    service.fetch({
      url: "maintain/getInfo",
      data: {
        id
      }
    }, res => {
      cb(res)
    })
  },
  // 评价
  evaAdd:function(option,cb){
    service.fetch({
      url:"eva/add",
      type:'post',
      data:{
        businessType: option.businessType,
        evaType: option.evaType,
        evaMsg: option.evaMsg,
        maintainId: option.maintainId,
        proId:option.proId,
        userId:option.userId
      }
    },res=>{
      console.log(res)
    })
  },
  // 下单
  orderPre:function(option,cb){
    // console.log(option, util.formatDate((new Date()), 'yyyy-MM-dd hh:mm:ss'))
    service.fetch({
      url:'order/pre',
      type:"post",
      data:{
        "perGoodsArray[0].goodsId":option.goodsId,
        "perGoodsArray[0].num":option.num,
        now: util.formatDate((new Date()), 'yyyy-MM-dd hh:mm:ss')
      }
    },res=>{
      
      cb(res);
    })
  },
  // 确认订单
  orderDetail:function(id,cb){
    service.fetch({
      url:"order/pay/detail",
      data:{
        orderId:id
      }
    },res=>{
      cb(res)
    })
  },
  // 支付
  orderPay:function(option,cb){
    service.fetch({
      url:'order/pay',
      data:option,
      type:'post'
    },res=>{
      wx.requestPayment({
        timeStamp: res.body.timestamp,
        nonceStr: res.body.nonceStr,
        package: res.body.packageInfo,
        signType: res.body.signType,
        paySign: res.body.paySign,
        success(res) {
          wx.showToast({
            title: '支付成功',
          })
         },
        fail(res){
          console.log("拉起支付失败")
        }
      })
    })
  },
  // 订单列表
  orderList:function(option,cb){
    // console.log(option)
    service.fetch({
      url:'order/list',
      data:option
    },res=>{
      console.log("订单列表 ====》" + res);
      cb(res);
    })
  },
  //订单取消
  orderCancel:function(option,cb){
    // console.log(option)
    service.fetch({
      url:"order/cancelOrder",
      data:option,
      type:'post'
    },res=>{
      console.log(res)
      wx.showToast({
        title: '订单取消成功'
      })
    })
  },
  //申请退款
  applyRefund:function(option,cb){
    console.log(option)
    service.fetch({
      url:'order/applyRefund',
      data:option,
      type:'post'
    },res=>{
      cb(res);
    })
  },
  //确认收获
  orderReceipt:function(option,cb){
    service.fetch({
      url: 'order/receipt',
      data:option,
      type:'post'
    },res=>{
      cb(res)
    })
  },
  //物流信息
  orderQuery:function(option,cb){
    service.fetch({
      url:'order/queryExpress',
      data:option,
      type:'post'
    },res=>{
      cb(res);
    })
  },
  // 订单详情
  orderPayDetail:function(option,cb){
    // console.log("!!!!!!" + option.id);
    service.fetch({
      url:"order/pay/detail",
      data:option,
    },res=>{
      cb(res);
    })
  },
  // 订单评价
  orderEveal:function(option,cb){
    service.fetch({
      url:"order/evaluate/add",
      data:option,
      type:'post'
    },res=>{
      cb(res);
      wx.showToast({
        title: '评价成功',
      })
    })
  },
  // 提醒发货
  msgRmind:function(option,cb){
    service.fetch({
      url:'msg/remindOrder',
      data:option,
    },res=>{
      wx.showToast({
        title: '提醒发货成功',
      })
    })
  },
  sendCode: function (option, cb){
    service.fetch({
      url: "common/sendCode",
      data:option
    },res=>{
      cb(res)
    })
  },
  //删除购物车商品
  delCartItem:function(option,cb){
    service.fetch({
      url:'cart/removeCart',
      data:option,
    },res=>{
      wx.showToast({
        title: '删除成功',
      })
      cb(res);
    })
  },
  // 获取古董类别
  selectAntiqueTypeBox:function(cb){
    service.fetch({
      url:'common/selectAntiqueTypeBox'
    },res=>{
      cb(res)
    })
  },
  // 鉴赏专家列表
  userProIndex:function(option,cb){
    console.log(option)
    service.fetch({
      url:'userPro/index',
      data:option
    },res=>{
      cb(res);
    })
  },
  // 收获地址
  getAddress:function(cb){
    service.fetch({
      url:'receive-address/list'
    },res=>{
      cb(res);
    })
  },
  // 添加鉴赏
  identifyAdd:function(option,cb){
    service.fetch({
      url:'identify/add',
      type:'post',
      data:option
    },res=>{
      cb(res)
    })
  },
}