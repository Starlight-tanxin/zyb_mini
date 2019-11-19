// pages/all_book/index.js
var app = getApp();
Page({
  data: {
    isCollection: 0,
    page: 1,
    pageSize: 10,
    list: [],
    loadLast: false,
    navList: [],
  },
  onLoad: function (options) {
    this.commomInit();
    this.initData();
  },
  commomInit: function () {
    app.func.fetch({
      url: "common/selectBookTypeBox"
    }, res => {
      console.log(res)
      this.setData({
        navList: res.body
      })
    })
  },
  initData:function(){
    this.getList(this.data.isCollection, this.data.page)
  },
  getList: function (type, page) {
    app.func.fetch({
      url: "goods/searchGoods",
      data: {
        isCollection: type,
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
  gotoShopDeatil: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_detail/index?id=' + id,
    })
  },
  gotoNavList: function (e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../nav_list/index?id=' + id + '&title=' + title,
    })
  },
  onReachBottom: function () {
    if (!this.data.loadLast) {
      this.getList(this.data.isCollection, ++this.data.page)
    }
  },
  addCart:function(e){
    wx.showModal({
      title: '提示',
      content: '是否将该物品加入购物车？',
      success:function(res){
        if(res.confirm){
          app.func.fetch({
            url:"cart/addCart",
            data:{
              goodsId:e.currentTarget.dataset.id
            }
          },res=>{
            console.log(res);
            if(res.status == 200){
              wx.showToast({
                title: '加入购物车成功',
              })
            }
          })
        }
      }
    })
  }
})