// pages/order_wl_detail/index.js
var api = require("../../api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    expressInfo: ["在途", "揽收", "疑难", "签收", "退签", "派件", "退回", "转投"],
    steps: [
      {
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ]
  },
  onLoad: function (options) {
    // if(options.id){
    //   this.initData(options.id);
    // }
    // console.log(options)
    this.initData(45);
  },
  initData:function(id){
    api.orderQuery({
      orderId:id
    },res=>{
      console.log(res);
      var result = res.body;
      result.orderStateText = this.data.expressInfo[result.state];
      // 处理step
      var steps = [];
      for(var i in result.data){
        var obj = {};
        obj.text = result.data[i].status + " " + result.data[i].ftime;
        obj.desc = result.data[i].context;
        steps.push(obj);
      }
      this.setData({
        result,
        steps
      })
    })
  }
})