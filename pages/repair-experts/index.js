// pages/repair-experts/index.js
var api = require('../../api.js');
Page({
  data: {
    radio: '1',
    page:1,
    pageSize:10,
    list:[]
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onLoad: function (options) {
    this.getList(this.data.page);
  },
  getList:function(page){
    api.userProIndex({
        page,
        pageSize:this.data.pageSize
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
        api.orderPay({
          orderId : res.body,
          orderType:1
        })
      })
    }
    
  },
  onReachBottom: function () {
    if(last) return;
    this.getList(++this.data.page)
  },
  onShareAppMessage: function () {

  }
})