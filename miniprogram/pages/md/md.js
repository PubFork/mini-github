const http = require('../../api/http.js')

let url = null
let path = null
let baseUrl = null

Page({
  data: {
    md: {}
  },

  onLoad: function (options) {
    url = decodeURIComponent(options.url)
    path = url.replace(/.*?([^/]+\.md)$/i, '$1')
    wx.setNavigationBarTitle({
      title: path
    })
    path = encodeURIComponent(path)
    baseUrl = url.replace(/([^/]+\.[mM][dD])$/, '')
    wx.startPullDownRefresh({})
  },

  onPullDownRefresh: function () {
    if (!url) {
      return wx.stopPullDownRefresh()
    }

    http.get(`${baseUrl}/${path}`).then(({ data, status }) => {
      wx.stopPullDownRefresh()
      if (status !== 200) {
        wx.showToast({
          title: String(status),
          icon: 'none'
        })
        return
      }
      this.setData({
        md: {
          content: data,
          baseUrl: baseUrl
        }
      })
    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})