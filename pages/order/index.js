// pages/order/index.js
import Dialog from '../../dist/dialog/dialog';
var api = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actived:0,
    active1:0,
    page:1,
    page1:1,
    page2:1,
    page3:1,
    page4:1,
    page5:1,
    pageSize:5,
    type:"",
    last:false,
    last1:false,
    last2:false,
    last3:false,
    last4:false,
    last5:false,
    allpayment:[],
    forpayment:[],
    dfhArr:[],
    dshArr:[],
    dpjArr:[],
    ypjArr:[],
    state:["已退款", "待支付", "待发货", "待收货", "待评价", "已评价", "取消订单", "申请退款"]
  },
  onLoad:function (options) {
    console.log(options)
    // if(options.active){
    //   this.setData({
    //     actived: options.active
    //   })
    // }
  },
  onShow:function(){
    this.change();
  },
  onReachBottom:function(){
    if(this.data['last'+this.data.type]) return;
    this.getList(++this.data['page' + this.data.type]);
  },
  orderCancel:function(){
    Dialog.confirm({
      title: '标题',
      message: '确认取消订单?'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  getList:function(page){
    // console.log(page)
    var type = this.data.type;
    // console.log(type, this.data['page' + this.data.type])
  
    api.orderList({
      page:page,
      pageSize: this.data.pageSize,
      state: this.data.type
    }, res => {
      var data = res.body;
      var last = false;
      // 处理数据
      for (var i in data.records){
        data.records[i].newOrderState = this.data.state[data.records[i].orderState];
      }
      if (data.records.length < this.data.pageSize) {
        last = true;
      }
      if(type == ""){
        this.setData({
          allpayment: this.data.allpayment.concat(data.records),
          last:last
        })
      }else if (type == 1) {
        this.setData({
          forpayment: this.data.forpayment.concat(data.records),
          last1:last
        })
      }else if(type == 2){
        this.setData({
          dfhArr: this.data.dfhArr.concat(data.records),
          last2: last
        })
      }else if(type == 3){
        this.setData({
          dshArr: this.data.dshArr.concat(data.records),
          last3: last
        })
      }else if(type == 4){
        this.setData({
          dpjArr: this.data.dpjArr.concat(data.records),
          last4: last
        })
      }else if(type == 5){
        this.setData({
          ypjArr: this.data.ypjArr.concat(data.records),
          last5: last
        })
      }
    })
  },
  initData:function(){

    // 如果请求完毕 中断程序
    if (this.data['last' + this.data.type]) return;
    this.getList(this.data['page' + this.data.type])
  },
  onChange1:function(e){
    if(e.detail.name == 1){
      this.setData({
        type:5
      });
      this.initData();
    }
  },
  change:function(e){
    console.log(e,this.data.actived);
    if(e){
      var name = e.detail.name;
    }else{
      var name = this.data.actived;
    }
    var type = '';
    switch(name){
      case "1" :
        type = '';
        break;
      case "2" :
        type = 1;
        break;
      case "3":
        type = 2;
        break;
      case "4":
        type = 3;
        break;
      case "5" :
        type = 4;
        break;
      default :
        type = '';
    }
  
    this.setData({
      type
    });
    this.initData();
  },

  //取消订单
  orderCancel:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '您确定要取消订单？',
      success(res){
        if(res.confirm){
          api.orderCancel({orderId:id});
          this.initData();
        }
      }
    })
  },
  orderCancel1:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var forpayment = that.data.forpayment;
    wx.showModal({
      title: '提示',
      content: '您确定要取消订单？',
      success(res) {
        if (res.confirm) {
          api.orderCancel({ orderId: id });
          forpayment.splice(index,1);
          that.setData({
            forpayment
          })
        }
      }
    })
  },
  // 下单
  orderPre:function(e){
    wx.navigateTo({
      url: '../mark_sure_order/index?orderId=' + e.currentTarget.dataset.id,
    })
  },
  // 申请退款
  appReturn:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你确定退款退货吗?',
      success:function(res){
        if(res.confirm){
          var type = that.data.type;
          var index = e.currentTarget.dataset.index;
          api.applyRefund({ orderId: e.currentTarget.dataset.id }, res => {
            if (type == 3) {
              var dshArr = that.data.dshArr;
              dshArr.splice(index, 1);
              that.setData({ dshArr });
            } else {
              var allpayment = that.data.allpayment;
              allpayment.splice(index, 1);
              that.setData({ allpayment });
            }
          })
        }
      }
    })
   
  },
  //确认收获
  orderReceipt:function(e){
    var type = this.data.type;
    var index = e.currentTarget.dataset.index;
    api.orderReceipt({
      orderId: e.currentTarget.dataset.id
    },res=>{
      if (type == 3) {
        var dshArr = this.data.dshArr;
        dshArr.splice(index, 1);
        this.setData({ dshArr });
      } else {
        var allpayment = this.data.allpayment;
        allpayment.splice(index, 1);
        this.setData({ allpayment });
      }
    })
  },
  // 查看订单详情
  gotoShopDetail:function(e){
    console.log("详情 ---》" + e.currentTarget.dataset)
    wx.navigateTo({
      url: '../order_detail/index?id='+e.currentTarget.dataset.id,
    })
  },
  // 查看物流
  gotoIstics:function(e){
    wx.navigateTo({
      url: '../order_wl_detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //提醒发货
  msgRmind:function(e){
    console.log(e.currentTarget.dataset);
    var orderNo = e.currentTarget.dataset.orderno;
    console.log('orderNo:'+orderNo);
    api.msgRmind({
      orderNo: orderNo
    })
  }

  
})