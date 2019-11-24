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
    evaMsg:'',
    showBtn : false,
    id:''
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
        id: options.id
      })
      var userType = wx.getStorageSync("userType");
      userType = userType ? userType : 1;
      console.log('userType :' + userType);
      // pro 是不是专家的页面来的 state = 2 才显示这个回复按钮
      if(userType == 2 && options.pro == 1 && options.state == 2){
        this.setData({'showBtn':true});
      }
     
    } else if (options.type == 2){
      wx.setNavigationBarTitle({
        title: '修复详情',
        id: options.id
      })
      // this.initData1(options.id);
    }
    this.setData({
      id:options.id,
      pageType: options.type
    });
   
  },
  onShow:function(){
    if (this.data.pageType == 1){
      this.initData(this.data.id);
    }else{
      this.initData1(this.data.id);
    }
    
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
  },
  gotoRepate:function(){
    wx.navigateTo({
      url: '../appreciation_res/index?id='+this.data.id,
    })
  },
  gotoPj:function(){
    wx.navigateTo({
      url: '../pj/index?id=' + this.data.id + '&type=2' + '&proId=' + this.data.result.userProId,
    })
  },
  prewvImg:function(e){
    console.log(e)
    var imgs = [];
    var eImgs = e.currentTarget.dataset.imgs;
    for (var i in eImgs){
      imgs.push(eImgs[i].imgUrl)
    }
    api.previewImage(imgs, e.currentTarget.dataset.index)
  }
})