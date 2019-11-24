// pages/we-chat-ui/index.js
var app = getApp();
Page({
  data: {
    inputVal:'',
    id:""
  },
  onLoad: function (options) {
    if (options.id){
      // this.setData({
      //   id:options.id
      // });
    }
   
  },
  onShow:function(){
    this.initData();
  },
  initData:function(){
    app.func.fetch({
      url:'msg/msgDetail',
      data:{
        sessionId : this.data.id
      }
    },res=>{
      this.setData({
        result:res.body
      })
    })
  },
  setVal:function(e){
    this.setData({
      inputVal:e.detail.value
    })
  },
  send:function(){
    if(this.data.inputVal){
      app.func.fetch({
        url:'msg/sendMsg',
        data:{
          msg : this.data.inputVal,
          sessionId: this.data.id
        }
      },res=>{
        this.initData();
      })
    }
  }
})