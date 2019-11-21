// pages/appreciation/index.js
var app = getApp();
Page({
  data: {
    page:1,
    pageSize:20,
    list:[],
    loadAll:false
  },
  onLoad: function (options) {
    this.initData();
  },
  initData: function () {
    this.getList(this.data.page)
  },
  getList:function(page){
    app.func.fetch({
      url: 'open/identify-maintain/showAllIdentify',
      type: 'post',
      data: {
      //  isReplay: true,
        page,
        pageSize: this.data.pageSize,
      }
    }, res => {
      console.log(res)
      var last = false;
      if(res.body.records.length<this.data.pageSize){
        last = true;
      }
      this.setData({
        list: res.body.records,
        loadAll:last
      })
    })
  },
  onReachBottom: function () {
    if(!this.data.loadAll){
      this.getList(++this.data.page)
    }
  },
  gotoDetail:function(e){
    wx.navigateTo({
      url: '../appreciation_detail/index?id=' + e.currentTarget.dataset.id + '&type=1',
    })
  }
})