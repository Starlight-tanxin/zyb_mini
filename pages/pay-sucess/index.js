// pages/pay-sucess/index.js
Page({
  data: {
    type:1,
    id:''
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      type:options.type,
      id: options.id ? options.id : ''
    })
  },
  gotopage:function(){
    if (this.data.type == 2){
      wx.navigateBack({
        delta:1
      })
    }else if(this.data.type == 3){
     wx.navigateTo({
       url: '../appreciation_detail/index?id='+this.data.id+'&type=1',
     })
    }else{
      wx.navigateTo({
        url: '../order/index',
      })
    }
  },
  goBack:function(){
    // if (this.data.type == 2) {
    //   wx.navigateBack({
    //     delta: 2
    //   })
    // } else if (this.data.type == 3) {
    //   wx.navigateTo({
    //     url: '../appreciation/index',
    //   })
    // }else{
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }
    wx.switchTab({
      url: '../profile/index',   //确认按钮统一跳转到我的
    })
  }
})