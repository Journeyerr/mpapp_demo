import { host } from '../../config/config';
import { banners } from '../../config/api';

Page({
  data: {
    bannerImages: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    error_flag: false,
    error_msg: '网络错误！',
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: host + banners,
      header: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwidXNlciI6eyJ1c2VyTmFtZSI6ImphdmF0ZXN0IiwidXNlcklkIjoxfSwiaWF0IjoxNTk4OTQ5OTE5LCJuYmYiOjE1OTg5NDk5MTksImV4cCI6MTU5ODk1NTkxOSwiaXNzIjoiemF5YW4ifQ.naNfgTti2RQo9nPNdT7Bx6-XsxCg0YWj1ldWpqopZvM'
      },
      success(res) {
        that.setData({ bannerImages: res.data.data.records })
      },
      fail(res) {
        that.setData( {error_flag: true , error_msg: res.data.message })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
