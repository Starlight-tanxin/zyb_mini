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
    hasSearch:false,
    categoryList:[]
  },
  onLoad: function (options) {
    console.log(options)
    console.log("collection=" + options.isCollection);
    if (options.isCollection) {
      this.setData({
        isCollection: options.isCollection
      });
      console.log("2222222222")
    }
    if(options.id){
      this.setData({
        id: options.id
      })
      this.initData(options.id);
      
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }  
    this.animation = wx.createAnimation()
    this.getCategoryList();
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
  getCategoryList: function(option){
    app.func.fetch({
      url:"common/selectBookOtherTypeBox",
    },res=>{
      this.setData({ categoryList: res.body})
    })
  },
  getList: function (option) {
    app.func.fetch({
      url: "goods/searchGoods",
      data: {
        bookTypeId:option.id || '',
        isCollection: option.isCollection ||'',
        page: option.page,
        name:option.name,
        pageSize: this.data.pageSize,
        bookOtherTypeId: option.bookOtherTypeId || ''
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
      if(option.page==1){
        this.setData({
          list: res.body.records,
          loadLast: last
        })
      }else{
        this.setData({
          list: this.data.list.concat(res.body.records),
          loadLast: last
        })
      }
      // 处理搜索的情况
      // if(this.data.hasSearch && searchLast){
        
      // }else{
        
      // }
      
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
      hasSearch:true,
      page:1
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
  },
  translate: function () {
    this.animation.translate('-100%').step()
    this.setData({ animation: this.animation.export() })
  },
  translateBack:function (){
    this.animation.translate(0).step()
    this.setData({ animation: this.animation.export() })
  },
  handleClickCate: function (event){
    let id = event.currentTarget.dataset.id;
    this.translateBack();
    this.setData({
      hasSearch: true,
      page:1,
    })
    this.getList({
      name: this.data.inputVal,
      pageSize: this.data.pageSize,
      page: this.data.page,
      bookOtherTypeId:id
    });
  }
})