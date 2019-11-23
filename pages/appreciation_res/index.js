// pages/appreciation_res/index.js
var app = getApp();
var api = require('../../api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    actions:[],
    show:false,
    choseVal:'',
    choseId:'',
    textVal:''
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        id: options.id
      })
    }
    this.initData();
  },
  initData:function(){
    app.func.fetch({
      url:'common/selectYearTypeBox',
    },res=>{
      console.log(res);
      var arr = res.body;
      for (var i in arr){
        arr[i].name = arr[i].typeName;
      }
      this.setData({
        actions:arr
      })
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      choseVal: event.detail.name,
      choseId: event.detail.id
    })
  },
  choseYear:function(){
    this.setData({ show: true });
  },
  setVal:function(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  save:function(){
    if(this.data.choseId){
      api.identifyProReply({
        checkState : this.data.radio - 1,
        id:this.data.id,
        proReplyMsg : this.data.textVal,
        proYearId: this.data.choseId
      },res=>{
        wx.showToast({
          title: '回复成功',
        })
      })
    }
  }
})
