import { host } from "./config";

function request(url, data, method) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url,
            data: data || {},
            header: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': wx.getStorageSync('token'),
            },
            method: method || 'GET',
            dataType: 'json',
            responseType: 'text',
            success: res => {
                resolve(res)
            },
            fail: res => {
                wx.showToast({
                    title: '网络异常，请检查网络状态',
                    icon: 'none',
                    duration: 3000
                });
                reject(res)
            },
        })
    }).then(checkStatus)
}

export function getRequest(url, data= {}) {
    return request(url, data, "GET");
}

export function postRequest(url, data= {}) {
    return request(url, data, "POST");
}

/**
 *  接口返回值状态判断
 *
 * @param {Object} response - 接口返回值
 * @returns {Promise}
 */
function checkStatus(response) {
    let msg = '网络异常';
    if(response.statusCode >=200 && response.statusCode < 400){
        switch (response.data.code) {
            case 0:
                return Promise.resolve(response.data.data);
                break;
            case 1001:
                wx.removeStorageSync("token");
                msg = response.data.msg;
                break;
            case 1003:
                break;
            default:
                msg = response.data.msg;
                break;
        }
    }
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 3000
    });
    return Promise.reject()

    //获取加载的页面
    // let pages = getCurrentPages();
    // // 获取当前页面的对象
    // let currentPage = pages[pages.length-1];
    // if (currentPage.route != 'pages/error/error'){
    //     wx.navigateTo({
    //         url: '/page/component/index/'
    //     });
    // }
}

export  function login() {
    const token = wx.getStorageSync('token');
    if (token) {
        return token;
    }
    wx.login({
        success: function(res) {
            console.log(res);
            if (res.code) {
                getRequest('/api/user/wx/login', {code: res.code})
                    .then(data => {
                        console.log(data);
                        wx.setStorageSync('token', 'Bearer ' + data.token)
                    })
            }else{
                wx.showToast({
                    title: '网络异常，请检查网络状态',
                    icon: 'none',
                    duration: 3000
                });
            }
        },
        fail: function(error) {
            wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 3000
            });
        }
    })
}

/**
 *  带token的请求业务接口
 * @param {Object} [data={}] - 对应wx.request里data参数，也就是query部分
 * @param {Object} [opts={}] - 对应wx.request里其他参数
 * @returns {Promise}
 */
export function fetchWithToken(data = {}, opts = {}) {
    const token = wx.getStorageSync('token');
    if (token) {
        data.token = token;
        return fetch(data, opts)
    } else {
        return getToken().then((token) => {
            data.token = token;
            return fetch(data, opts);
        })
    }
}

