var api = require('../../api.js');
Page({
  data: {
    page:1,
    pageSize:10,
    last:false,
    list:[]
  },
  onLoad: function () {
    this.getList(this.data.page);
  },
  getList: function (page) {
    api.orderList({
      page:page,
      pageSize: this.data.pageSize,
      state: 7
    },res=>{
      console.log(res)
      var last = false;
      var list = res.body.records;
      if (list.length<this.data.pageSize){
        last = true;
      }
      this.setData({
        list: this.data.list.concat(list),
        last
      })
    })
  },
  gotoDetail:function(e){
    wx.navigateTo({
      url: '../after-sales-detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  // 拨打电话
  callMobile: function () {
    wx.makePhoneCall({
      phoneNumber: '0731-84121691',
    })
  },
  onReachBottom: function () {
    if(this.data.last) return;
    this.getList(++this.data.page);
  },

  onShareAppMessage: function () {

  }
})