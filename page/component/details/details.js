import { getRequest } from "../../../config/request";
import { productDetail } from "../../../config/api";
import {carProductsKey} from "../../../config/config";

Page({
  data:{
    goods: {
      id: null,
      product_image: '',
      name: '',
      price: '',
      remark: '。',
      parameter: '',
      service: '',
      unit: '',
      quantity: '',
    },
    num: 1,
    totalNum: 0,
    curIndex: 0,
    productId:null
  },

  onLoad: function(options) {
    const that = this;
    getRequest(productDetail + '/' + options.productId)
        .then(data => {
            that.setData({goods: data})
        });
    const storageProducts = wx.getStorageSync(carProductsKey);
    if (storageProducts.length > 0) {
      storageProducts.forEach(function(product, index, arr){
        if (Number(options.productId) === product.id) {
          that.setData({totalNum: product.count})
        }
      });
    }
  },

  addCount: function() {
    this.setData({num : this.data.num + 1})
  },
  subCount: function() {
    if (this.data.num > 1) {
      this.setData({num : this.data.num - 1})
    }
  },

  addToCart: function() {
    const self = this;
    const goods = this.data.goods;

    const addProduct = {
      selected:true,
      id: goods.id,
      name: goods.name,
      price: goods.price,
      unit: goods.unit,
      quantity: goods.quantity,
      product_image: goods.product_image,
      count: this.data.num
    };

    let storageProducts = [];
    wx.getStorage({
      key: carProductsKey,
      success(res) {
        storageProducts = res.data;
        console.log('storageProducts ---- ');
        console.log(storageProducts);
        let newProduct = true;
        storageProducts.forEach(function(product, index, arr){
          if (addProduct.id === product.id) {
            storageProducts[index].count = product.count + addProduct.count;
            newProduct = false;
          }
        });
        if (newProduct) {
          storageProducts.unshift(addProduct);
        }

        setTimeout( function() {
          self.setData({
            totalNum: self.data.totalNum + addProduct.count
          });
        }, 200);

        wx.setStorageSync(carProductsKey, storageProducts);
      },
      fail() {
        console.log('storageProducts is empty-------');
        storageProducts.push(addProduct);
        wx.setStorageSync(carProductsKey, storageProducts);
        setTimeout( function() {
          self.setData({
            totalNum: self.data.totalNum + addProduct.count
          });
        }, 200)
      }
    })
  },
});















