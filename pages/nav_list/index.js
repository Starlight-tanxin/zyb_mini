// pages/nav_list/index.js
var app = getApp();
Page({
  data: {
    inputVal:'',
    isCollection: '',
    page: 1,
    pageSize: 10,
    list: [],
    loadLast: false,
    navList: [],
    id:"",
    hasSearch:false
  },
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        id: options.id
      })
      this.initData(options.id);
      
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }
  },
  onReachBottom: function () {
    if (!this.data.loadLast) {
      // this.getList(this.data.isCollection, ++this.data.page)
      this.getList({
        id: this.data.id,
        isCollection: this.data.isCollection,
        name: this.data.inputVal,
        page: ++this.data.page
      })
    }
  },
  initData: function (id) {
    // this.getList(this.data.isCollection, this.data.page);
    this.getList({
      id:this.data.id,
      isCollection:this.data.isCollection,
      name:this.data.inputVal,
      page:this.data.page
    })
  },
  getList: function (option) {
    app.func.fetch({
      url: "goods/searchGoods",
      data: {
        bookTypeId:option.id,
        isCollection: option.isCollection,
        page: option.page,
        name:option.name,
        pageSize: this.data.pageSize
      }
    }, res => {
      console.log(res)
      var last = false;
      if (res.body.records.length < 10) {
        last = true;
        if(this.data.hasSearch){
          var searchLast = true;
        }
        
      }
      // 处理搜索的情况
      if(this.data.hasSearch && searchLast){
        this.setData({
          list:res.body.records,
          loadLast: last
        })
      }else{
        this.setData({
          list: this.data.list.concat(res.body.records),
          loadLast: last
        })
      }
      
    })
  },
  gotoShopDeatil: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_detail/index?id=' + id,
    })
  },
  addCart: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否将该物品加入购物车？',
      success: function (res) {
        if (res.confirm) {
          app.func.fetch({
            url: "cart/addCart",
            data: {
              goodsId: e.currentTarget.dataset.id
            }
          }, res => {
            console.log(res);
            if (res.status == 200) {
              wx.showToast({
                title: '加入购物车成功',
              })
            }
          })
        }
      }
    })
  },
  gotoSearch:function(){
    this.setData({
      hasSearch:true
    })
    this.getList({
      id: this.data.id,
      isCollection: this.data.isCollection,
      name: this.data.inputVal,
      page: this.data.page
    });
  },
  setVal:function(e){
    this.setData({
      inputVal:e.detail.value
    })
  }
})