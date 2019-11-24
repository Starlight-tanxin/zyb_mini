// pages/add-repair/index.js
var api = require("../../api.js");
Page({
  data: {
    msg: "修复",
    selectAntique: [],
    show: false,
    show1: false,
    choseVal: "请选择类型",
    checked: false,
    goodsName: '',
    tempFilePaths: [],
    textArea: '',
    radio: '1',
    choseAddress: '',
    choseAddressId: ''
  },
  onLoad: function (options) {
    console.log(options)
    if (options && options.type) {
      if (options.type == 1) {
        this.setData({
          msg: '修复',
          pageType: options.type
        })
      } else if (options.type == 2) {
        this.setData({
          msg: '鉴赏',
          pageType: options.type
        })
      }
    }
    this.initData();
  },
  uploadImg: function () {
    var that = this;
    var imgArr = this.data.tempFilePaths;
    if (imgArr.length >= 9) {
      wx.showToast({
        title: '最多可以上传9张图片',
        icon: 'none'
      });
      return;
    }
    wx.chooseImage({
      count: 9 - imgArr.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        var arr = that.data.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          api.fileUpload({
            file: tempFilePaths[i],
            name: 'file'
          }, res => {
            res = JSON.parse(res.data);
            arr.push(res.body);
            that.setData({
              tempFilePaths: arr
            });
          });
        }
      }
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
  initData: function () {
    api.selectAntiqueTypeBox(res => {
      var data = res.body;
      for (var i in data) {
        data[i].name = data[i].typeName;
      }
      this.setData({
        selectAntique: data
      })
    })
    if (this.data.pageType == 1) {
      api.getAddress(res => {
        var data = res.body;
        for (var i in data) {
          data[i].name = data[i].province + " " + data[i].city + data[i].region + data[i].addressDetail;
          data[i].newAddress = data[i].province + " " + data[i].city + " " + data[i].region + " " + data[i].addressDetail;
        }
        console.log(data)
        this.setData({
          selectAntique1: data
        })
      })
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  onshow() {
    this.setData({ show: true });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  onshow1() {
    this.setData({ show1: true });
  },
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      choseVal: event.detail.typeName,
      choseId: event.detail.id
    })
  },
  onSelect1(event) {
    console.log(event.detail);
    this.setData({
      choseAddress: event.detail.newAddress,
      choseAddressId: event.detail.id
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  onChange1(event) {
    console.log(event)
    this.setData({
      radio: event.detail
    });
  },
  setval: function (e) {
    this.setData({
      goodsName: e.detail.value
    })
  },
  setTextArea: function (e) {
    this.setData({
      textArea: e.detail.value
    })
  },
  gotoNext: function () {
    if (this.data.goodsName && this.data.choseVal && this.data.choseId && this.data.checked && this.data.textArea) {

      var obj = {
        goodsName: this.data.goodsName,
        choseVal: this.data.choseVal,
        choseId: this.data.choseId,
        tempFilePaths: this.data.tempFilePaths,
        textArea: this.data.textArea,
      }
      if (this.data.pageType == 1) {
        if (this.data.radio == 2) {
          obj.isSelfTake = true;
          obj.choseAddressId = 0;
        } else {
          if (this.data.choseAddressId == '') {
            wx.showToast({
              title: '请补全信息',
              icon: 'none'
            });
            return;
          }
          obj.isSelfTake = false;
          obj.choseAddressId = this.data.choseAddressId;
        }

        wx.setStorageSync("pageData1", obj);
        wx.navigateTo({
          url: '../repair-experts_1/index?proType=' + obj.choseId,
        })
      } else {
        wx.setStorageSync("pageData", obj);
        wx.navigateTo({
          url: '../repair-experts/index?proType=' + obj.choseId,
        })
      }


    } else {
      wx.showToast({
        title: '请补全信息1',
        icon: 'none'
      })
    }
  },
  gotoPage: function () {
    wx.navigateTo({
      url: '../common_loop/index',
    })
  }
})