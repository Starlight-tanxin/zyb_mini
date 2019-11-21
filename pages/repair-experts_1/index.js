// pages/repair-experts/index.js
var api = require('../../api.js');
Page({
  data: {
    radio: '1',
    page:1,
    pageSize:10,
    list:[]
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onLoad: function (options) {
    this.getList(this.data.page);
  },
  getList:function(page){
    api.maintainPro({
        page,
        pageSize:this.data.pageSize
    },res=>{
      var list = res.body.records;
      var last = false;
      if(list.length<this.data.pageSize){
        last : true
      }
      this.setData({
        list:this.data.list.concat(list),
        last
      })
    })
  },
  save:function(){
    if(wx.getStorageSync("pageData1")){
      var obj = wx.getStorageSync("pageData1");
      console.log(this.data.radio)

      api.maintainAdd({
        antiqueName: obj.goodsName,
        antiqueTypeId:obj.choseId,
        maintainDetail:obj.textArea,
        maintainProId: this.data.list[this.data.radio - 1].id,
        maintainState:1,
        userAddressId:obj.choseAddressId,
        isSelfTake: obj.isSelfTake
      },res=>{
        wx.navigateTo({
          url: '../wait/idnex',
        })
      })
    }
    
  },
  onReachBottom: function () {
    if(this.data.last) return;
    this.getList(++this.data.page)
  },
  onShareAppMessage: function () {

  }
})