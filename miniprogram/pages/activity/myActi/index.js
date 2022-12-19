// pages/activity/setActi/index.js
import { activityAPI, wxRequest } from '../../../utils/wxRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    time: new Date().getTime(),
    option1: [
      { text: '按最近时间', value: 0 },
    ],
    option2: [
      { text: '所有', value: 0 },
    ],
    value1: 0,
    value2: 0,
  },


  compareItem (item1, item2) {
    if (item1.acti_utc > item2.acti_utc) {
      return -1
    } else if (item1.acti_utc < item2.acti_utc) {
      return 1
    } else {
      return 0
    }
  },


  toSetActi (e) {
    const ActiID = e.target.dataset.acti_id
    // console.log(ActiID);
    if (ActiID !== undefined && ActiID !== null) {
      wx.navigateTo({
        url: `/pages/activity/setActi/index?id=${ActiID}`,
      });

    }

  },

  toDelActi (e) {
    const acti_id = e.target.dataset.acti_id
    wxRequest(activityAPI.deleteActivity, 'post', { acti_id }).then(res => {
      console.log(res)
      if (res.status === 200) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000,
          mask: false,
          success: () => {
            setTimeout(() => {
              this.onShow()
            }, 1000)
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

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
    // console.log('发送');
    const userinfo = wx.getStorageSync('userinfo');
    // console.log(userinfo.id);
    wxRequest(activityAPI.getMyActivity, 'post', userinfo).then(res => {
      console.log(res);
      if (res.status === 200) {
        wx.setStorage({
          key: 'myActi',
          data: res.ActiData.sort(this.compareItem),
          success: (result) => {
            this.setData({
              activityList: res.ActiData.sort(this.compareItem)
            })
          }
        })
      }
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