import {getRequest} from "../../../config/request";
import {orderList} from "../../../config/api";

Page({
  data:{
    addressForm:{
      name:'',
      phone:'',
      address:''
    },
    addPageShow: false,
    address: [],
    orders: []
  },

  onLoad: function(option){

    getRequest(orderList)
        .then(data => {
          console.log(data)
        })
  },


});
