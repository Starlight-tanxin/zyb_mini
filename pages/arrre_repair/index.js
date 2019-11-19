// pages/arrre_repair/index.js
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

  },
  gotoMore:function(e){
    console.log(e)
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../add-repair/index?type=' + type
    })
  },
  gotoMoreAppreciation:function(){
    wx.navigateTo({
      url: '../appreciation/index',
    })
  },
  gotoRepair:function(){
    wx.navigateTo({
      url: '../repair_records/index',
    })
  }
})