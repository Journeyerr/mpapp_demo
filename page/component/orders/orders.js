import {carProductsKey, orderSelectAddresskey} from "../../../config/config";
import {createOrder, shopId} from "../../../config/api";
import {postRequest} from "../../../config/request";

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

        if (storageProducts.length < 1) {
          wx.removeStorageSync(orderSelectAddresskey)
          wx.switchTab({
            url: '/page/component/index'
          })
        }

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
        wx.switchTab({
          url: '/page/component/index'
        })
      }
    })
  },

  remarkInput: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  createOrder: function () {

    const data = this.data
    const carProducts = wx.getStorageSync(carProductsKey)

    const orderForm = {
      products: data.products,
      addressId: data.addressId,
      remark: data.remark,
      totalFee: data.totalFee.toFixed(2),
      shopId: shopId,
      phone: null,
      pickupTime: null,
    }

    postRequest(createOrder, orderForm)
        .then( data => {
          const ids = this.data.products.map(function(v){
            return v.id;
          });
          for (let i= 0; i < carProducts.length; i++) {
            if (ids.indexOf(carProducts[i].id) === 0) {
              carProducts.shift()
            }else {
              carProducts.splice(i, 1)
            }
          }
          wx.setStorageSync(carProductsKey, carProducts);
          wx.showModal({
            title: '提示',
            content: '下单成功, 已通知店家准备..',
            text:'center',
            showCancel:false,
            complete() {
              wx.switchTab({
                url: '/page/component/user/user'
              })
            }
          })
        })
    }
})











