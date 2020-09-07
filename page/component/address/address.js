import {getRequest, postRequest} from "../../../config/request";
import {addresses, createdAddresses, delAddresses} from "../../../config/api";
import {carProductsKey, orderSelectAddresskey} from "../../../config/config";

Page({
  data:{
    addressForm:{
      name:'',
      phone:'',
      address:''
    },
    addPageShow: false,
    address: [],
    isOrderAddress: false,
  },

  onLoad: function(option){
    const that = this;
    that.setData({
      isOrderAddress: Number(option.total) >= 0
    });
    getRequest(addresses)
        .then(data => {
          const storageAddress = wx.getStorageSync(orderSelectAddresskey);
          const storageAddressId = storageAddress ? storageAddress.id : 0;
          for (let i=0; i<data.length; i++) {
            data[i].selected = data[i].id === storageAddressId;
          }
          that.setData({
            address: data,
          })
        });
  },

  selected: function(e) {
    const selectAddressId = e.currentTarget.id;
    const index = e.currentTarget.dataset.index;
    const address = this.data.address;
    const selected = address[index].selected;
    address[index].selected = !selected;

    let isSelected = false;

    for (let i=0; i < address.length; i++) {
      if (!selected){
        if (address[i].selected && address[i].id !== Number(selectAddressId)){
          address[i].selected = false;
        }
        isSelected = true;
      }
    }

    this.setData({
      address: address
    });

    if (isSelected) {
      wx.setStorageSync(orderSelectAddresskey, address[index]);
      setTimeout(function(){
        wx.navigateBack();
      }, 1000)
    }else {
      wx.removeStorageSync(orderSelectAddresskey);
    }
  },

  // 取消新增地址按钮
  cancelAddAddress: function() {
    this.setData({addPageShow: false})
  },

  // 删除地址
  delAddress: function(value) {
    const that = this
    console.log(value)
    postRequest(delAddresses + '/' + value.target.id)
        .then(data => {
          that.onLoad();
        })
  },

  // 新增地址按钮
  addAddress: function() {
    this.setData({addPageShow: true})
  },


  // 新增地址
  formSubmit: function(e){
    const value = e.detail.value;
    const that = this;
    if (value.name && value.phone && value.address){
      const addForm = { name: value.name, phone: value.phone, address: value.address };
      postRequest(createdAddresses, addForm)
          .then(data=> {
            console.log(data);
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 3000
            });
            setTimeout(function() {
              const address = that.data.address;
              address.push(addForm);
              that.setData({addPageShow: false, address: address})
            },2000)
          });
      console.log(this.data.address)
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
});
