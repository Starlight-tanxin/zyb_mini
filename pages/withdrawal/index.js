// pages/top_up/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    money: '',
    inputVal:''
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      money: options.amonut
    })
  },
  allTX:function(){
    var money = this.data.money;
    if(this.data.money > 5000){
      money = 5000;
    }
    this.setData({
      inputVal:money
    })
  },
  setval:function(e){
    this.setData({
      inputVal:e.detail.value
    })
  },
  save:function(){
    var inputVal = this.data.inputVal;
    var money = this.data.money;
    console.log(inputVal)
    if (inputVal==0 || inputVal>money){
      wx.showToast({
        title: '提现金额不足',
        icon: "none"
      })
    } else if (inputVal > 5000){
      wx.showToast({
        title: '提现金额最多为5000元',
        icon: "none"
      })
    }else{
      console.log(inputVal)
      app.func.fetch({
        url:"cash-out/add",
        data:{
          "amount": inputVal
        },
        type:'post'
      },res=>{
        wx.showToast({
          title: "提现申请发送成功",
        })
      })
    }
  }

 
})