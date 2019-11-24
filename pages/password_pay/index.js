// pages/password1/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: '请输入您的密码',
    code:'',
    type:"",
    focus: true,
    Length: 6,        //输入框个数  
    isFocus: true,    //聚焦  
    Value: "",        //输入的内容  
    ispassword: true, //是否密文显示 true为密文， false为明文。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.code){
      this.setData({
        code:options.code,
      })
    }
    this.setData({
      type: options.type,
    })
  },
  password_input: function (e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue
    })
  },

  Tap() {
    console.log(1)
    var that = this;
    that.setData({
      isFocus: true,
    })
  },

  getFocus: function () {
    console.log(2)
    this.setData({
      focus: !this.data.focus
    })
  },
  gotoSave: function () {
    if(this.data.type){
      app.globalData.password = this.data.Value;
      wx.navigateBack({
        delta: 1
      })
    }else{
      if (this.data.code) {
        app.func.fetch({
          url: 'account/setPayPwd',
          type: 'post',
          data: {
            code: this.data.code,
            pwd: this.data.Value
          }
        }, res => {
          wx.showToast({
            title: '设置成功',
          });
          wx.navigateBack({
            delta: 2
          })
        })
      } else {
        wx.showToast({
          title: '验证码错误',
          icon: "none"
        })
      }
    }
    
    

  }
})