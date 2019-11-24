// pages/pj/index.js
var api = require('../../api.js');
Page({
  data: {
    message:'',
    show:false,
    choseVal: "",
    proId:'',
    tempFilePaths:[],
    actions:[
      { name: '满意', id: 1 },
      { name: '不满意', id: 2 },
      {name:'一般',id:3},
    ]
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      type:options.type,
      proId: options.proId
    })
  },
  showPopup:function(){
    this.setData({
      show:true
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
  delItm: function (e) {
    var index = e.currentTarget.dataset.index;
    var tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(index, 1);
    this.setData({
      tempFilePaths
    })
  },
  uploadImg: function () {
    var that = this;
    var imgArr = this.data.tempFilePaths;
    if (imgArr.length >= 2) {
      wx.showToast({
        title: '最多可以上传2张图片',
        icon: 'none'
      });
      return;
    }
    wx.chooseImage({
      count: 2 - imgArr.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++){
          var arr = that.uploadFile(tempFilePaths,2);
          console.log(arr)
          // api.fileUpload({
          //   file: tempFilePaths[i],
          //   name:'file'
          // }, res => {
          //   res = JSON.parse(res.data);
          //   console.log(res)
          //   that.setData({
          //     tempFilePaths: arr.concat(res.body)
          //   });
          // })
        }
        
        
      }
    })
  },
  uploadFile: function (file,len) {
    var arr = [];
    if(len){
      len--;
      api.fileUpload({
        file:file[len],
        name: 'file'
      }, res => {
        res = JSON.parse(res.data);
        console.log(res.body)
        arr.push(res.body);
      });
    }else{
      return arr;
    }
    
  },
  setTextArea:function(e){
    this.setData({
      message:e.detail
    })
  },
  
  save:function(){

    

    if(this.data.message && this.data.choseId){
      api.evaAdd({
        businessType : this.data.type - 1,
        maintainId : this.data.id,
        evaType : this.data.choseId,
        evaMsg : this.data.message,
        evaImg_1: this.data.tempFilePaths.length > 0 ? this.data.tempFilePaths[0] : '',
        evaImg_2: this.data.tempFilePaths.length > 1 ? this.data.tempFilePaths[1] : '',
        proId: this.data.proId 
      },res=>{
        wx.showToast({
          title: '评价成功',
        });
        wx.navigateBack({
          delta:2
        })
      })
    }
  }
})