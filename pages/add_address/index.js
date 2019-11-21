// pages/add_address/index.js
var  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    realname:"",
    addressDetail:"",
    cityNo:"",
    isDefault:0,
    mobile:"",
    provinceNo:"",
    regionNo:"",
    code:""
  },
  setDefault:function(){
    this.setData({
      isDefault : !this.data.isDefault
    })
  },
  save:function(){
    var data = this.data;
    if (data.realname && data.addressDetail && data.code && data.mobile && data.address){
      app.func.fetch({
        url:"receive-address/add",
        data:{
          addressDetail: data.addressDetail,
          realname:data.realname,
          mobile:data.mobile,
          provinceNo: data.code[0],
          cityNo:data.code[1],
          regionNo: data.code[2],
          isDefault: data.isDefault?1:0
        },
        type:"post"
      },res=>{
        wx.showToast({
          title: '新增成功',
          icon:'succsess',
          duration:2500,
          success:function(){
            wx.navigateBack({
              delate:1
            })
          }
        })
      })
    }else{
      wx.showToast({
        title: '请补全信息',
        icon:"none",
        duration:2500
      })
    }
  },
  bindPickerChange:function(e){
    console.log(e)
    var data = e.detail;
    this.setData({
      address: data.value[0] + " " + data.value[1] + " " + data.value[2],
      code:data.code
    })
  },
  getUserName:function(e){
    this.setData({
      realname: e.detail.value
    })
  },
  getUserTel:function(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  getTextArea:function(e){
    this.setData({
      addressDetail: e.detail.value
    })
  }
})