// pages/address/index.js
var app = getApp();
Page({
  data: {
    radio: '1',
    address:[]
  },
  onChange(event) {
    var address = this.data.address;
    for (var i = 0; i < address.length; i++){
      address[i].isDefault = false;
      address[event.detail-1].isDefault = true;
    }
    this.setData({
      radio: event.detail,
      address
    });
  },
  onShow:function (options) {
    this.initData();
  },
  initData:function(){
    app.func.fetch({
      url: "receive-address/list"
    },res=>{
      console.log(res)
      this.setData({
        address:res.body
      })
    })
  },
  delItem:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    app.func.fetch({
      type:'post',
      url:'receive-address/delete',
      data:{
        id
      }
    },res=>{
      console.log(res);
      wx.showToast({
        title: '删除成功'
      });
      this.initData();
    })
  }
 
})