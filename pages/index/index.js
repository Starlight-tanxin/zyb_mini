//index.js
//获取应用实例
var service = require("../../service.js");
const app = getApp()

Page({
  data: {
    swiper:[1,2,3,4],
    result:"",
    imageURL:"../../images/p1.png"
  },
  onShow:function(){
    this.initData();
  },
  initData:function(){
    
    app.func.fetch({
      url:'shop/index'
    },res=>{
      console.log(res)
      this.setData({
        result:res.body
      })
    })
  },
  gotoShopDeatil: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop_detail/index?id=' + id,
    })
  }

})
