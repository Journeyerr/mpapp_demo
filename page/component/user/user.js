// page/component/new-pages/user/user.js
import {getRequest, postRequest} from "../../../config/request";
import {userInfo, userUpdate} from "../../../config/api";
import {userInfoKey} from "../../../config/config";

Page({
  data:{
    orders:[],
    hasAddress:false,
    address:{},
    noAuthorization: false,
    user:{
      id: null,
      name: null,
      image_url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      birthday: null,
      phone: null,
      country: null,
      province: null,
      city: null,
    }
  },

  onLoad: function(){
    this.getLoginUserInfo();
  },

  onShow: function() {
    this.setData({noAuthorization: false})
  },

  getLoginUserInfo: function() {
    const that = this;
    const storageUserInfo = wx.getStorageSync(userInfoKey);
    if (storageUserInfo.name) {
      that.setData({user: storageUserInfo})
    }else {
      getRequest(userInfo)
          .then(data => {
            if (data.name != null) {
              wx.setStorageSync(userInfoKey, data)
              that.setData({user: data})
            }
          })
    }
  },


  getUserInfo: function(e) {
    let that = this;
    // 获取用户当前的授权状态。
    wx.getSetting({
      // 如果已经成功授权
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res.userInfo);
              postRequest(userUpdate, res.userInfo)
                  .then(data => {
                    that.setData({user: data})
                    wx.setStorageSync(userInfoKey, data)
                  })
            },
            fail(res) {
              console.log("登录失败，请稍后再试", res)
            }
          })
        } else {
          wx.showModal({
            title:'提示',
            content:'请点击设置开启授权哦',
            showCancel: false
          })
          that.setData({noAuthorization: true})
        }
      }
    })
  },
})
