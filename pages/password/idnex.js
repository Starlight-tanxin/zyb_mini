
var api = require('../../api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    codeShow:true,
    btnDisable:false,
    btnText:"发送验证码",
    sendM:60,
    sms:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getCode:function(){
    api.sendCode({},res=>{
      console.log(res)
      var sendM = this.data.sendM;
      var timer = null;
      timer = setInterval(()=>{
       sendM--;
       var str=sendM+"秒后重发";
       if(sendM == 0){
         clearInterval(timer);
         str = '重新发送';
         this.setData({
           btnText: str,
           sendM:60,
           btnDisable: false
         })
       }else{
         this.setData({
           btnText: str,
           btnDisable:true
         })
       }
       
      },1000)
    })
  },
  chage:function(e){
    this.setData({
      sms:e.detail
    })
  },
  gotoNext:function(){
    if(this.data.sms){
      wx.navigateTo({
        url: '../password1/index?code=' + this.data.sms,
      })
    }
    
  }
})