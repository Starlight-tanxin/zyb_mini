// pages/profile/index.js
var service = require("../../service.js");
const app = getApp()

Page({
  data: {
    loginShow: false,
    userInfo:null,
    userType : 1,
  },
  onLoad: function () {
    if (!wx.getStorageSync("userInfo")) {
      this.setData({
        loginShow: true
      })
    }else{
      this.setData({
        userInfo: wx.getStorageSync("userInfo")
      })
    }
    this.initData();
  },
  initData: function () {
    app.func.fetch({
      url: 'mine/'
    }, res => {
      console.log(res)
      // 重写用户信息
      if (wx.getStorageSync("userInfo")){
        var userInfo = {};
        userInfo.headImg = res.body.headImg;
        userInfo.nickname = res.body.nickname;
        this.setData({
          userInfo,
          userType:res.body.userType
        })
      }
      
      this.setData({
        // userInfo,
        result:res.body
      })
    })
  },
  onClose() {
    this.setData({ loginShow: false });
  },
  getUserInfo: function () {
    service.getUserInfo(res => {
      app.func.fetch({
        url: 'login/',
        type: 'post',
        data: {
          headImg: res.avatarUrl,
          nickname: res.nickName,
          openId: wx.getStorageSync("openId")
        }
      }, res => {
        wx.setStorageSync('userInfo', res.body);
        this.initData();
      })
    });

  },
  gotoSet:function(){
    wx.navigateTo({
      url: '../profile_set/index',
    })
  },
  gotoAdress: function () {
    wx.navigateTo({
      url: '../address/index',
    })
  },
  gotoMessage:function(){
    wx.navigateTo({
      url: '../message/index',
    })
  },
  gotoOrder:function(e){

    wx.navigateTo({
      url:"../order/index?active="+e.currentTarget.dataset.type
    })
  },
  gotoTK:function(){
    wx.navigateTo({
      url: '../after-sales/index',
    })
  },
  popShow:function(e){
    if (!e.currentTarget.dataset.userlogin){
      this.setData({
        loginShow:true
      })
    }
  },
  // 拨打电话
  callMobile:function () {
    wx.makePhoneCall({
      phoneNumber: '0731-84121691',
    })
  },
  gotoXFZX:function(){
    wx.navigateTo({
      url: '../repair_records/index',
    })
  },
  gotoJSZX: function () {
    wx.navigateTo({
      url: '../appreciation/index',
    })
  },
  gotoJSJL: function () {
    var userType = this.data.userType;
    userType = userType ? userType : 1;
    if(userType == 2){
      // 需要跳转到专家专门得回复列表页面
      wx.navigateTo({
        url: '../appreciation/index',
      });
    }else{
      wx.showToast({
        title:'您还不是专家',
        icon:'none',
        duration : 2000
      })
    }
  }
})