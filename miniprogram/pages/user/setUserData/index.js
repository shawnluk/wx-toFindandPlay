// pages/user/center/index.js
import { wxUploadFile, wxRequest, userAPI, teamAPI } from '../../../utils/wxRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    avatarUrl: '',
    uploadPic: false,
    theme: wx.getSystemInfoSync().theme,
  },
  onChooseAvatar (e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  getUserInfo (url) {
    wxRequest(url).then(result => {
      wx.showModal({
        title: result.status.toString(),
        content: result.message,
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: function () {
          if (result.status === 200) {
            wx.setStorage({
              key: 'userinfo',
              data: result.userData
            })
          }
          wx.switchTab({
            url: '/pages/user/index'
          })
        }
      })
    })
  },


  uploadPic () {
    if (this.data.avatarUrl) {
      wxUploadFile(userAPI.setPic, this.data.avatarUrl, 'avatar').then(results => {
        console.log(results);
        if (results.status === 200) {
          this.getUserInfo(userAPI.getUserInfo)
        }
      })
    }
  },
  formSubmit (e) {
    // console.log(e.detail.value)
    if (!e.detail.value.username || !e.detail.value.email) {
      wx.showModal({
        content: '昵称或邮箱不能为空',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      })
      return
    }


    const data = e.detail.value
    wxRequest(userAPI.setUserInfo, 'post', data).then(res => {
      console.log(res)
      if (res.status === 200) {

        // 用户要上传新头像图片
        if (this.data.avatarUrl !== '') {
          wxUploadFile(userAPI.setPic, this.data.avatarUrl, 'avatar').then(results => {
            console.log(results)
            if (results.status === 200) {
              this.getUserInfo(userAPI.getUserInfo)
            }
          })
        }

        // 用户没有提交新头像图片
        if (this.data.avatarUrl === '') {
          // wxRequest(userAPI.getUserInfo).then(result => {
          //   console.log(result);
          //   if (result.status === 200) {
          //     wx.setStorage({
          //       key: 'userinfo',
          //       data: result.userData,
          //     })
          //     wx.switchTab({
          //       url: '/pages/user/index',
          //     })
          //   }
          // })
          this.getUserInfo(userAPI.getUserInfo)
        }
      }
    })


  },

  onLoad () {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({
      userinfo: wx.getStorageSync('userinfo'),
      // avatarUrl: wx.getStorageSync('userinfo').userPic
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})