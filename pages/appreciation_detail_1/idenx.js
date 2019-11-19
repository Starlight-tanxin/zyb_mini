// pages/appreciation_detail_1/idenx.js
var api = require("../../api.js");
Page({
  data: {

  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.initData(options.id);
  },
  initData: function (id) {
    api.appreciaDetail1(id, res => {
      console.log(res)
      this.setData({
        result: res.body
      })
    })
  },
})