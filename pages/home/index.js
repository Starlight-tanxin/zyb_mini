//index.js
//获取应用实例
var service = require("../../service.js");
const app = getApp()

Page({
  data: {
    loginShow: false,
    swiper: [1, 2, 3, 4],
    imageURL: "../../images/p1.png",
    dayRank:"",
    weekRank:"",
    monthRank:"",
    loopImgs:[]
  },
  onLoad: function () {
    var that = this;
    if (!wx.getStorageSync("userInfo")) {
      this.setData({
        loginShow: true
      })
    }
    this.initData();
    // this.login();
  },
  login:function(){
    app.func.fetch({
      url:'login/',
      type:'post'
    },res=>{
      console.log("login")
    })
  },
  initData:function(){
    app.func.fetch({
      url:"open/surname/index"
    },res=>{
      console.log(res)
      var data = res.body;
      this.setData({
        dayRank:data.d,
        weekRank: data.w,
        monthRank:data.m,
        loopImgs:data.banners
      })
    })
   
  },
  onClose() {
    this.setData({ loginShow: false });
  },
  getUserInfo: function () {
    service.getUserInfo(res => {
      app.func.fetch({
        url:'login/',
        type:'post',
        data:{
          headImg:res.avatarUrl,
          nickname:res.nickName,
          openId:wx.getStorageSync("openId")
        }
      }, res => {
        wx.setStorageSync('userInfo', res.body)
      })
    });
  },
  gotoDetail:function(e){
    var type = e.currentTarget.dataset.type;
    var url = '../ranking/index?type='+type
    wx.navigateTo({
      url
    })
  },
  gotoUrl:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../common_loop/index?url=' + e.currentTarget.dataset.url,
    })
  }

})
