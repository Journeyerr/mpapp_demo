import {carProductsKey} from "../../../config/config";

Page({
  data: {
    carts:[],               // 购物车列表
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },

  onLoad: function() {
    const carProducts = wx.getStorageSync(carProductsKey)
    console.log(carProducts)
    this.setData({
      carts: carProducts
    });
    this.getTotalPrice();
  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    let carts = this.data.carts;
    carts.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      carts: carts
    });
    if(carts.length) {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = !this.data.selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let count = carts[index].count;
    count = count + 1;
    carts[index].count = count;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let count = carts[index].count;

    if(count <= 1){
      return false;
    }
    count--;
    carts[index].count = count;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    let selectNum = 0;
    for(let i = 0; i < carts.length; i++) {
      if(carts[i].selected) {
        total += carts[i].count * carts[i].price;
        selectNum ++;
      }
    }
    this.setData({
      carts: carts,
      selectAllStatus: selectNum === carts.length,
      totalPrice: total.toFixed(2)
    });
  }
})
