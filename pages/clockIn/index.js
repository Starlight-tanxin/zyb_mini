// pages/clockIn/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serchRes:[],
    value:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },
  initData:function(){
    app.func.fetch({
      url:'open/surname/search'
    },res=>{
      this.setData({
        serchRes:res.body
      })
    })
  },
  gotoDetail:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../rank/index?id=' + id
    })
  },
  gotoCollection:function(){
    wx.navigateTo({
      url: '../collection/idnex',
    })
  },
  setVal:function(e){
    this.setData({
      value:e.detail
    })
  },
  search:function(e){
    if(this.data.value){
      var url = 'open/surname/search/s'
      app.func.fetch({
        url,
        data:{
          keyword: this.data.value
        }
      }, res => {
        console.log(res)
        this.setData({
          serchRes:res.body
        })
      })
    }
    
  }
})