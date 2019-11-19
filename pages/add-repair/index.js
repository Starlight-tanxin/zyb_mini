// pages/add-repair/index.js
var api = require("../../api.js");
Page({
  data: {
    msg:"修复",
    selectAntique:[],
    show:false,
    choseVal:"请选择类型",
    checked: false, 
    goodsName:'',
    tempFilePaths:[],
    textArea:''
  },
  onLoad: function (options) {
    console.log(options)
    if(options && options.type){
      if (options.type == 1){
        this.setData({
          msg:'修复'
        })
      } else if (options.type == 2){
        this.setData({
          msg: '鉴赏'
        })
      }
    }
    this.initData();
  },
  uploadImg:function(){
    var that = this;
    var imgArr = this.data.tempFilePaths;
    if(imgArr.length>=9){
      wx.showToast({
        title: '最多可以上传9张图片',
        icon:'none'
      });
      return;
    }
    wx.chooseImage({
      count: 9-imgArr.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        
        that.setData({
          tempFilePaths: imgArr.concat(tempFilePaths)
        })
      }
    })
  },
  delItm:function(e){
    var index = e.currentTarget.dataset.index;
    var tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(index,1);
    this.setData({
      tempFilePaths
    })
  },
  initData:function(){
    api.selectAntiqueTypeBox(res=>{
      var data = res.body;
      for(var i in data){
        data[i].name = data[i].typeName;
      }
      this.setData({
        selectAntique: data
      })
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onshow(){
    this.setData({ show: true });
  },
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      choseVal: event.detail.typeName,
      choseId: event.detail.id
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  setval:function(e){
    this.setData({
      goodsName:e.detail.value
    })
  },
  setTextArea: function(e) {
    this.setData({
      textArea: e.detail.value
    })
  },
  gotoNext:function(){
    if (this.data.goodsName && this.data.choseVal && this.data.choseId && this.data.checked){
      var obj={
        goodsName: this.data.goodsName,
        choseVal: this.data.choseVal,
        choseId: this.data.choseId,
        tempFilePaths: this.data.tempFilePaths,
        textArea: this.data.textArea,
      }
      console.log(obj)
      wx.setStorageSync("pageData", obj);
    }else{
      wx.showToast({
        title: '请补全信息',
        icon:'none'
      })
    }
  }
})