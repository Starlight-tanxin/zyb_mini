// pages/appreciation_detail/index.js
var api = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    show1:false,
    evaType:1,
    evaMsg:''
  },
  showPopup() {
    this.setData({ show: true });
  },
  showPopup1() {
    this.setData({ show1: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  onLoad: function (options) {
    console.log(options)
    if (options.type == 1){
      wx.setNavigationBarTitle({
        title: '鉴赏详情',
      })
      this.initData(options.id);
    } else if (options.type == 2){
      wx.setNavigationBarTitle({
        title: '修复详情',
      })
      this.initData1(options.id);
    }
    this.setData({
      id:options.id,
      pageType: options.type
    });
   
  },
  initData:function(id){
    api.appreciaDetail(id,res=>{
      console.log(res)
      this.setData({
        result:res.body
      })
    })
  },
  initData1: function (id) {
    api.appreciaDetail1(id, res => {
      console.log(res)
      this.setData({
        result: res.body
      })
    })
  },
  gotoPfoDetail:function(e){
    
  },
  getEvaType:function(e){
    this.setData({
      evaType: e.currentTarget.dataset.type,
      show1:false
    })
  },
  setevaMsg:function(e){
    this.setData({
      evaMsg: e.detail.value
    })
  },
  onSubmit:function(){
    console.log(this.data.evaMsg)
    if(!this.data.evaMsg){
      wx.showToast({
        title: '请补全信息',
        icon:"none"
      });
      return;
    }
    api.evaAdd({
      businessType: true,
      evaType: this.data.evaType,
      evaMsg: this.data.evaMsg,
      maintainId :this.data.id,
      proId: this.data.result.userProId,
      userId:this.data.result.userId
    })
  }
})