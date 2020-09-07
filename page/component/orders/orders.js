import {carProductsKey, orderSelectAddresskey} from "../../../config/config";

Page({
  data:{
    address:{},
    hasAddress: false,
    totalFee:0,
    products: [],
    addressId: null,
    remark: '',
  },


  onShow: function(){
    const self = this;
    let total = 0;
    let selectedProduct = [];

    const storageAddress = wx.getStorageSync(orderSelectAddresskey);
    if (storageAddress) {
      this.setData({
        addressId: storageAddress.id,
        address: storageAddress,
        hasAddress: true
      })
    }

    wx.getStorage({
      key: carProductsKey,
      success(res) {
        let storageProducts = res.data;
        console.log('orders page: storageProducts ---- ');
        console.log(storageProducts.length);
        for (let i = 0; i < storageProducts.length; i++) {
          if (storageProducts[i].selected) {
            total += storageProducts[i].count * storageProducts[i].price;
            selectedProduct.push(storageProducts[i])
          }
        }
        self.setData({
          products: selectedProduct,
          totalFee: total,
        })
      },
      fail() {

      }
    })
  },

  createOrder: function () {
    const products = this.data.products;
    const addressId = this.data.addressId;
    const remark = this.data.remark;
    const totalFee = this.data.totalFee;





  }

  // toPay() {
  //   wx.showModal({
  //     title: '提示',
  //     content: '本系统只做演示，支付系统已屏蔽',
  //     text:'center',
  //     complete() {
  //       wx.switchTab({
  //         url: '/page/component/user/user'
  //       })
  //     }
  //   })
  // },



})











