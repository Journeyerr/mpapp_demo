import { login } from './config/request';

App({
  onLaunch: function () {
    console.log('onLaunch');
    login();
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})
