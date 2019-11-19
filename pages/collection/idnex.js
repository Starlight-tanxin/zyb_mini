// pages/collection/idnex.js
var app = getApp();
Page({
  data: {
    isCollection: 1,
    page:1,
    pageSize: 10,
    list:[],
    loadLast:false,
    navList:[],
  },
  onLoad: function(options) {
    this.initData();
    this.commomInit();
  },
  onReachBottom: function () {
    if(!this.data.loadLast){
      this.getList(this.data.isCollection, ++this.data.page)
    }
  },
  getList:function(type,page){
    app.func.fetch({
      url: "goods/searchGoods",
      data: {
        isCollection:type,
        page: page,
        pageSize: this.data.pageSize
      }
    }, res => {
      console.log(res)
      var last = false;
      if (res.body.records.length < 10) {
        last = true;
      }
      this.setData({
        list: this.data.list.concat(res.body.records),
        loadLast: last
      })
    })
  },
  initData: function() {
    this.getList(this.data.isCollection,this.data.page)
  },
  commomInit:function(){
    app.func.fetch({
      url:"common/selectBookTypeBox"
    },res=>{
      console.log(res)
      this.setData({
        navList:res.body
      })
    })
  },
  gotoShopDeatil:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_detail/index?id='+id,
    })
  },
  gotoNavList:function(e){
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../nav_list/index?id=' + id+'&title='+title,
    })
  }
})