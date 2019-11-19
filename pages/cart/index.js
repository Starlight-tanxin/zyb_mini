// pages/cart/index.js
var api = require("../../api.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imageURL:'../../images/p1.png',
    checked:false,
    result: [],
    list:[],
    totalNum:0
  },
  onChange(event) {
    console.log("event.detail" + event.detail);
    this.setData({
      result: event.detail
    });
    this.calc();
  },
  onShow:function(){
    this.initData();
  },
  initData:function(){
    app.func.fetch({
      url:"cart/index"
    },res=>{
      console.log(res,"123")
      this.setData({
        list:res.body
      })
    })
  },
  checkAll:function(){
    let listLen = this.data.list.length;
    let result = this.data.result;
    if(this.data.checked){
      this.setData({
        result:[],
        checked:false
      })
    }else{
      for(var i=0; i<listLen; i++){
        console.log(listLen);
        result.push(i+"");
      }
      this.setData({
        checked:true,
        result
      })
    }
    this.calcPrice();
  },
  //更新购物车
  updateCart:function(id,num){
    app.func.fetch({
      url:"cart/updateCart",
      data:{
        goodsId:id,
        num,
      }
    },res=>{
      console.log(res)
    })

  },
  stepHandler:function(e){
    this.updateCart(e.currentTarget.dataset.id, e.detail);
    this.calc(e.currentTarget.dataset.index,e.detail)
  },
  calc: function (index, num){
    var list = this.data.list;
    var listLen = this.data.list.length;
    var resultLen = this.data.result.length;
    if(num || index){
      list[index].num = num;
    }
    // 如果长度相等
    if (listLen == resultLen) {
      this.setData({
        checked: true,
        list
      })
    } else {
      this.setData({
        checked: false,
        list
      })
    }
    
    this.calcPrice();
    
    
  },
  // 计算价格
  calcPrice:function(){
    var list = this.data.list;
    var result = this.data.result;
    // console.log("金额计算 list---》" + list);
    // console.log("金额计算 result---》" + result);
    var totalNum = 0;
    if(result && result.length > 1){
      for (var i in result) {
        // console.log("金额计算 i---》" + i);
        // console.log("金额计算 list[i]---》" + list[i].num + "p:" + list[i].price);
        totalNum += list[i].num * list[i].price;
      }
    }
    if (result && result.length == 1) {
      var i = result[0];
      // console.log("只有单个被选中 金额计算 list[i]---》" + list[i].num + "p:" + list[i].price);
      totalNum += list[i].num * list[i].price;
    }
    
    console.log("金额计算 ---》" + totalNum);
    this.setData({
      totalNum: totalNum * 100
    })
  },
  onSubmit:function(){
    console.log("提交订单")
    console.log(this.data.result);
    var result = this.data.result;
    if(result.length>0){
      // 拼数据
      var list = this.data.list;
      var option = {};
      for(var i in result){
        console.log(result[i], i) 
        option["perGoodsArray[" + i + "].goodsId"] = list[result[i]].goodsId;
        option["perGoodsArray["+ i +"].num"] = list[result[i]].num;
      }
      console.log(option);
      app.func.fetch({
        url:"order/pre",
        data:option,
        type:'post'
      },res=>{
        wx.navigateTo({
          url: '../mark_sure_order/index?orderId=' + res.body.id,
        })
      })
    }else{
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
    }
  },
  delItem:function(e){
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否需要删除该商品？',
      success:(res=>{
        if(res.confirm){
          api.delCartItem({
            goodsId: e.currentTarget.dataset.id
          },res=>{
            this.initData();
          })
        }
      })
    })
  }
})