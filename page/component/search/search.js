import {getRequest} from "../../../config/request";
import {products, shopId} from "../../../config/api";

Page({
data: {
    history: [],
    hot: [],
    products: [],
    showKeywords: false,
    keywords: [],
    value: '',
    showResult: false,
},

onLoad: function() {
    const history = wx.getStorageSync('history');
    if (history) {
        this.setData({
            history: JSON.parse(history)
        });
        console.log(this.data.history);
    }
},

historyClear: function() {
    wx.removeStorageSync('history');
    this.setData({history: []})
},

// 取消搜索
cancelSearch: function() {
    this.setData({
        showResult: false,
        showKeywords: false,
        value: ''
    })
},

// 搜索关键字
searchInput: function(e) {
    const that = this;
    if(!e.detail.value){
        that.setData({
            showKeywords: false,
            showResult: false
        })
    }else{
        getRequest(products, {keyWord: e.detail.value, shopId: shopId, 'pageSize':15, 'page':1})
            .then(data => {
                that.setData({ products: data.records, showResult: true })
                if (data.records.length > 0){
                    this.historyHandle(e.detail.value);
                }
            })
    }
},

// 点击历史搜索记录
keywordHandle: function(e) {
    const that = this;
    const text = e.target.dataset.text;
    getRequest(products, {keyWord: text, shopId: shopId, 'pageSize':15, 'page':1})
        .then(data => {
            that.setData({ products: data.records, showResult: true, value: text})
        })
},

historyHandle: function(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
        // 搜索记录只保留8个
        if (history.length > 7) {
            history.pop();
        }
    } else {
        history.splice(idx, 1);
    }
    history.unshift(value);
    wx.setStorageSync('history', JSON.stringify(history));
    this.setData({ history: history});
}
});
