// pages/account-detail/index.js
var app = getApp();
Page({

 
  data: {
    searchData:{
      page:1,
      pageSize:10
    },
    list:[],
    load:true
  },

  onShow: function (options) {
    this.initData(this.data.searchData)
  },
  onReachBottom: function () {
    if(this.data.load){
      this.data.searchData.page++;
      this.initData(this.data.searchData)
    }
  },
  initData:function(data){
    app.func.fetch({
      url:'account/',
      data
    },res=>{
      console.log(res)
      var data = res.body;
      var load = true;
      data.columns.forEach((item,index)=>{
        // console.log(item,index);
        item.amont = item.amont;
        switch(item.payType){
          case 1:
            item.payType = '鉴赏';
            break;
          case 2:
            item.payType = '修复';
            break;
          case 3:
            item.payType = '书城';
            break;
          case 4:
            item.payType = '助理';
            break;
          case 5:
            item.payType = '充值';
            break;
          case 6:
            item.payType = '提现';
            break;
          default:
            item.payType = '未知';
        }
      })
      if(res.body.columns.length<10){
        load = false;
      }
      this.setData({
        actualAmount: data.actualAmount,
        freezeAmount: data.freezeAmount,
        list: this.data.list.concat(data.columns)
      })
    })
  },
  gotoTX:function(){
    wx.navigateTo({
      url: '../withdrawal/index?amonut=' + this.data.actualAmount,
    })
  },
  gotoUP:function(){
    wx.navigateTo({
      url: '../top_up/index?amonut=' + this.data.actualAmount,
    })
  }
})