// pages/profile_set/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },
  initData: function () {
    app.func.fetch({
      url: 'mine/'
    }, res => {
      // 重写用户信息
      var userInfo = {};
      userInfo.headImg = res.body.headImg;
      userInfo.nickname = res.body.nickname;
      this.setData({
        userInfo,
        result: res.body
      })
    })
  }
})