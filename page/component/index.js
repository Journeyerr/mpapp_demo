import { host, token } from '../../config/config';
import { banners, products, shopId} from '../../config/api';
import { getRequest } from '../../config/request';

Page({
  data: {
    bannerImages: [],
    products: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    error_flag: false,
    error_msg: '网络错误！',
  },
  onLoad: function () {
    const that = this;
    getRequest(banners, {'pageSize':15, 'page':1, shopId:shopId})
        .then(data => {
          that.setData({ bannerImages: data.records })
        });

    getRequest(products, {'pageSize':15, 'page':1, shopId:shopId})
        .then(data => {
          that.setData({ products: data.records })
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
