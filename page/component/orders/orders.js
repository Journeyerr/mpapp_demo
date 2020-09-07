import {carProductsKey, orderSelectAddress} from "../../../config/config";

Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    products: [],
    addressId: null
  },


  onShow: function(){
    const self = this;
    let total = 0;
    let selectedProduct = [];

    const storageAddress = wx.getStorageSync(orderSelectAddress);
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
          total: total,
        })
      },
      fail() {

      }
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/component/user/user'
        })
      }
    })
  }
})
