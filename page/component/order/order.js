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
    addresses: [],
    orders: [],
    twoList:[{
      id:1,
      name:'应季鲜果',
      count:1,
      twodata:[{
        'id':11,
        'name':'鸡脆骨'
      },{
        'id':12,
        'name':'鸡爪'
      }]
    },{
      id:2,
      name:'精致糕点',
      count:6,
      twodata:[{
        'id':13,
        'name':'羔羊排骨一条'
      },{
        'id':14,
        'name':'微辣'
      }]
    },{
      id:3,
      name:'全球美食烘培原料',
      count:12,
      twodata:[{
        'id':15,
        'name':'秋刀鱼'
      },{
        'id':16,
        'name':'锡箔纸金针菇'
      }]
    }]
  },

  onLoad: function(option){

    const that = this;
    getRequest(orderList)
        .then(data => {
          that.setData({orders: data})
        })
  },


});
