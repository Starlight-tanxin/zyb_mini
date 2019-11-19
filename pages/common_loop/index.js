// pages/common_loop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:""
  },
  onLoad: function (options) {
    if(options.url){
      this.setData({
        url:options.url
      })
    }
  }
})