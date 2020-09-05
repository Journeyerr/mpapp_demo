// page/component/new-pages/user/address/address.js
import {getRequest, postRequest} from "../../../config/request";
import {addresses, createdAddresses, delAddresses} from "../../../config/api";

Page({
  data:{
    addressForm:{
      name:'',
      phone:'',
      address:''
    },
    addPageShow: false,
    address: []
  },

  onLoad: function(){
    const that = this;
    getRequest(addresses)
        .then(data => {
          that.setData({address: data})
        })
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
            console.log(data)
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 3000
            });
            setTimeout(function() {
              const address = that.data.address
              address.push(addForm)
              that.setData({addPageShow: false, address: address})
            },1000)
          })
      console.log(this.data.address)
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})
