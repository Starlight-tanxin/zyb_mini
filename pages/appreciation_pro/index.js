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
      url: 'identify/pro-index',
      // type: 'post',
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
    console.log("state : "+e.currentTarget.dataset.state);
    wx.navigateTo({
      url: '../appreciation_detail/index?id=' + e.currentTarget.dataset.id + '&type=1&pro=1&state=' + e.currentTarget.dataset.state,
    })
  }
})