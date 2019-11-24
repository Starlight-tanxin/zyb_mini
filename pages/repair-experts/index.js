// pages/repair-experts/index.js
var api = require('../../api.js');
Page({
  data: {
    radio: '1',
    page:1,
    pageSize:10,
    proType:'',
    list:[]
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onLoad: function (options) {
    console.log("proType ="+options.proType);
    this.setData({
      proType: options.proType
    });
    this.getList(this.data.page);
  },
  getList:function(page){
    api.userProIndex({
        page,
        pageSize:this.data.pageSize,
        antiqueTypeId:this.data.proType
    },res=>{
      var list = res.body.records;
      var last = false;
      if(list.length<this.data.pageSize){
        last : true
      }
      this.setData({
        list:this.data.list.concat(list),
        last
      })
    })
  },
  save:function(){
    if(wx.getStorageSync("pageData")){
      var obj = wx.getStorageSync("pageData");
      console.log(this.data.radio)

      api.identifyAdd({
        amount: this.data.list[this.data.radio - 1].price,
        antiqueDetail :obj.textArea,
        antiqueName: obj.goodsName,
        identify:1,
        userProId: this.data.list[this.data.radio - 1].id,
        imgAryStr: obj.tempFilePaths.toString()
      },res=>{
        // var id = res.body;
        var obj = {
          orderId: res.body.id,
          orderType: 1,
          price: res.body.amount
        }
        wx.setStorageSync('payObj', obj);
        wx.navigateTo({
          url: '../pay/idnex?type=3&id=' + res.body.id
        })
        // api.orderPay({
        //   orderId : res.body,
        //   orderType:1
        // },res=>{
        //   wx.navigateTo({
        //     url: '../pay-sucess/index?type=3&id='+id,
        //   })
        // })
      })
    }
    
  },
  gotoExpers:function(e){
    wx.navigateTo({
      url: '../experts_detail/idnex?id=' + e.currentTarget.dataset.id + '&type=1',
    })
  },
  onReachBottom: function () {
    if (this.data.last) return;
    this.getList(++this.data.page)
  },
  onShareAppMessage: function () {

  }
})