// pages/rank/index.js
var app = getApp();
var api = require('../../api.js');
Page({
  data: {
    show:false,
    result:"",
    id:"",
    checked:false,
    rankData:4,
    rankTimes:[
      { num: 4, active: true},
      { num: 10,active:false },
      { num: 20, active: false},
      { num: 100, active: false},
    ]
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
 
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id: options.id
      })
      this.initData(options.id);
    }
  },
  initData:function(id){
    var url = 'surname/'+id+'/top';
    app.func.fetch({
      url
    },res=>{
      console.log(res)
      if (res.body.surnameName){
        var title = res.body.surnameName + "氏打卡";
        wx.setNavigationBarTitle({ title });
      }
      this.setData({
        result:res.body
      })
    })
  },
  gotoRank:function(){
    var url = "surname/" + this.data.id+"/punch";
    app.func.fetch({
      url,
      type:"post"
    },res=>{
      console.log(res);
      wx.showToast({
        title: '打卡成功',
        duration : 2000,
      });
    })
  },
  choseActive:function(e){
    var index = e.currentTarget.dataset.index;
    var rankTimes = this.data.rankTimes;
    for(var i in rankTimes){
      rankTimes[i].active = false;
    }
    rankTimes[index].active = true;
    this.setData({
      rankTimes,
      rankData: rankTimes[index].num
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  orderPay:function(){
    if(this.data.checked){
      api.orderPay({
        orderId :0,
        amount:4,
        orderType :4,
      },res=>{
        wx.showToast({
          title: '助力打卡成功',
        });
        this.initData(this.data.orderId);
      })
    }else{
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }
  }


})