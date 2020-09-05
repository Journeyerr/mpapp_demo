import { getRequest } from "../../../config/request";
import { productDetail } from "../../../config/api";

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
    hasCarts: false,
    curIndex: 0,
    showCarNum: false,
    scaleCart: false,
    productId:null
  },

  onLoad: function(options) {
    const that = this;
    getRequest(productDetail + '/' + options.productId)
        .then(data => {
            that.setData({goods: data})
        })
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
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      showCarNum: true
    });
    setTimeout( function() {
      self.setData({
        showCarNum: false,
        scaleCart : true
      });
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
  }
});
