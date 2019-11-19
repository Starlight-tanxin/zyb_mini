// pages/ranking/index.js
var app = getApp();
Page({
  data: {
    result:[]
  },
  onLoad: function (options) {
    console.log(options)
    if(options.type == "DAY"){
      wx.setNavigationBarTitle({title: "今日百家姓排行"});
    } else if (options.type == "WEEK"){
      wx.setNavigationBarTitle({ title: "本周百家姓排行" });
    }else{
      wx.setNavigationBarTitle({ title: "本月百家姓排行" });
    }
    this.initData(options.type)
  },
  initData:function(type){
    var url = "open/surname/billboard/" + type +"/detail";
    app.func.fetch({
      url
    },res=>{
      this.setData({
        result: res.body
      })
    })
  },
  gotoDeatil:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../rank/index?id='+id,
    })
  }
 
})