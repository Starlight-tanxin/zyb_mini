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
    ],
    isPunch : false,
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
      
    }
  },
  onShow:function(){
    this.setData({
      show:false
    });
    this.initData(this.data.id);
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
  gotoPunch:function(){
    var url = "surname/" + this.data.id + "/punch";
    app.func.fetch({
      url,
      type: "post"
    }, res => {
      console.log(res);
      wx.showToast({
        title: '打卡成功',
        duration: 2000,
      });
    });
  },
  gotoRank:function(){ 
    var id = this.data.id;
    wx.showModal({
      title: '提示',
      content: '是否确认打卡',
      success: function (res) {
        if (res.confirm) {
          var url = "surname/" + id + "/punch";
          app.func.fetch({
            url,
            type: "post"
          }, res => {
            console.log(res);
            wx.showToast({
              title: '打卡成功',
              duration: 2000,
            });
          });
        } else if (res.cancel) {
          console.log("用户放弃打卡");
        }
      }
    });
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
      var obj = {
        orderId: 0,
        orderType: 4,
        price: this.data.rankData*0.5,
      }
      wx.setStorageSync('payObj', obj);
      wx.navigateTo({
        url: '../pay/idnex?type=4'
      })
      // api.orderPay({
      //   orderId :0,
      //   amount:4,
      //   orderType :4,
      // },res=>{
      //   wx.showToast({
      //     title: '助力打卡成功',
      //   });
      //   this.initData(this.data.orderId);
      // })
    }else{
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }
  },
  gotoPage: function () {
    wx.navigateTo({
      url: '../common_loop/index',
    })
  }


})