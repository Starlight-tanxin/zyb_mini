// pages/common_loop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"https://zyb.hnsxyts.com/template/open-source/agreement"
  },
  onLoad: function (options) {
    if(options.url){
      this.setData({
        url:options.url
      })
    }
  }
})