// pages/shop_detail/index.js
var app = getApp();
var api = require("../../api.js");
Page({
  data: {
    bg:{
      background: "#893100"
    },
    goodsId:"",
    indicatorDots:true,
    swiper:[]
  },
  onLoad: function (options) {
    if(options.id){
      api.cartInit(res=>{
        this.setData({
          cartNum : res.body.length
        })
      });
      this.initData(options.id);
      this.setData({
        goodsId:options.id
      })
    }

  },
  initData: function (id) {
    var url = "goods/"+id+"/detail"
    app.func.fetch({
      url,
    }, res => {
      console.log(res)
      var swiper=[];
      if (res.body.imgArray.length>0){
        swiper = res.body.imgArray;
      }else{
        swiper.push(res.body.mainImg)
      }
      this.setData({
        result:res.body,
        swiper
      })
    })
  },
  gotoCart:function(){
    wx.switchTab({
      url: '../cart/index',
    })
  },
  addCart:function(){
    api.addCart(this.data.goodsId,res=>{
      if(res.message == 'OK'){
        wx.showToast({
          title: '添加成功'
        });
        api.cartInit(res => {
          this.setData({
            cartNum: res.body.length
          })
        });
      }
    })
  },
  gotoBuy:function(){
    api.orderPre({
      goodsId: this.data.goodsId,
      num:1
    },res=>{
      wx.navigateTo({
        url: '../mark_sure_order/index?orderId='+res.body.id,
      })
    })
  },
  priveImg:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.swiper
    })
  }
})