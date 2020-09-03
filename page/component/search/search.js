import {getRequest} from "../../../config/request";
import {products, shopId} from "../../../config/api";

Page({
    data: {
        history: [],
        hot: [],
        products: [],
        showKeywords: false,
        keywords: ['山东肚脐橙', '湖南冰糖橙', '麻涌香蕉', '冰糖心苹果'],
        value: '',
        showResult: false,
    },

    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },

    // 搜索关键字
    searchInput(e) {
        const that = this;
        if(!e.detail.value){
            that.setData({
                showKeywords: false,
                showResult: false
            })
        }else{
            getRequest(products, {keyWord: e.detail.value, shopId: shopId, 'pageSize':15, 'page':1})
                .then(data => {
                    if (data.records.length < 1){
                        that.setData({ products: data.records, showResult: true })
                    }else{
                        let history = this.data.history;
                        that.setData({ products: data.records, showResult: true })
                    }
                })
        }
    },

    keywordHandle(e) {
        const text = e.target.dataset.text;
        this.setData({
            value: text,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },
    historyHandle(value) {
        console.log('---historyHandle----')
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
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
    }
})
