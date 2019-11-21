// pages/experts_detail/idnex.js
var api = require('../../api.js');
Page({
  data: {
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
    this.initData(options.id);
  },
  initData:function(id){
    if(this.data.type == 1){
      api.uersProDetail({
        id
      }, res => {
        this.setData({
          result: res.body
        })
      })
    }else{
      api.maintainProDetail({
        id
      }, res => {
        this.setData({
          result: res.body
        })
      })
    }
    
  },
  onShareAppMessage: function () {

  }
})