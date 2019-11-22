// pages/repair_records/index.js
var app = getApp();
Page({
  data: {
    page: 1,
    pageSize: 20,
    list: [],
    loadAll: false
  },
  onShow: function (options) {
    this.initData(this.data.page);
  },
  getList: function (page) {
    app.func.fetch({
      url: 'maintain/index',
      data: {
        page,
        pageSize: this.data.pageSize,
      }
    }, res => {
      console.log(res)
      var last = false;
      if (res.body.records.length < this.data.pageSize) {
        last = true;
      }
      this.setData({
        list: this.data.list.concat(res.body.records),
        loadAll: last
      })
    })
  },
  initData: function () {
    this.setData({
      page: 1,
      pageSize: 20,
      list: [],
    });
    this.getList(this.data.page)
  },
  gotoDetail:function(e){
    var type = e.currentTarget.dataset.type;
    if(type == 1){
      wx.navigateTo({
        // url: '../appreciation_detail_1/idenx?id=' + e.currentTarget.dataset.id + '&type=2',
        url: '../appreciation_detail/index?id=' + e.currentTarget.dataset.id + '&type=2',
      })
    } else if (type == 2 || type == 4 || type == 3 ){
      wx.navigateTo({
        url: '../order_detail_2/index?id=' + e.currentTarget.dataset.id,
      })
    }

    
  }
})