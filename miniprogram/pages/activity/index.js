// pages/activity/index.js
// import { checkSession } from '../../utils/wxCheckSession.js'
import { userAPI, activityAPI, teamAPI, wxRequest } from '../../utils/wxRequest'
import { wxSocketJoinActi, connectServerJoinActi } from '../../utils/socketio'
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 30 * 60 * 60 * 1000,
    actiJoinNum: 10,
    activityList: [],
    activityList_1: [],
    activityList_2: [],
    time: new Date().getTime(),
    option1: [
      { text: '按最近时间', value: 0 },
    ],
    option2: [
      { text: '所有', value: 0 },
      { text: '报名中', value: 1 },
      { text: '已结束', value: 2 },
    ],
    value1: 0,
    value2: 0,
    acti_0: true,
    acti_1: false,
    acti_2: false,
  },

  selectItem (e) {
    // console.log(e.detail);
    if (e.detail === 0) {
      this.setData({
        acti_0: true,
        acti_1: false,
        acti_2: false,
      })
    }
    if (e.detail === 1) {
      this.setData({
        acti_0: false,
        acti_1: true,
        acti_2: false,
      })
    }
    if (e.detail === 2) {
      this.setData({
        acti_0: false,
        acti_1: false,
        acti_2: true,
      })
    }
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
  toJoinActi (e) {
    console.log(e.currentTarget.dataset.detail);
    if (!wx.getStorageSync('userinfo').id) {
      Dialog.alert({
        title: '您还未登陆',
        message: '可点击右下角“我的”进行微信登陆',
        theme: 'round-button',
      })
      return
    }
    // console.log(wx.getStorageSync('myJoinActi'));
    if (wx.getStorageSync('myJoinActi')) {
      Dialog.alert({
        message: '您已报名申请参加这次活动',
        theme: 'round-button',
      })
      return
    }

    const joinActivityData = {
      actiID: e.currentTarget.dataset.detail.id,
      actiName: e.currentTarget.dataset.detail.acti_name,
      CaptainID: e.currentTarget.dataset.detail.captainID,
    }

    wxRequest(activityAPI.joinActivity, 'post', joinActivityData).then(result => {
      console.log(result);
      if (result.status === 200) {
        connectServerJoinActi()
        wxSocketJoinActi.emit('userJoinActi', joinActivityData)
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
    this.getTabBar().init();
    // 获取活动列表
    wxRequest(activityAPI.getActivity, 'get').then(res => {
      console.log(res);
      if (res.status === 200) {
        this.setData({
          activityList: res.ActiData.sort(this.compareItem),
          activityList_1: res.ActiData.filter(item => item.acti_utc - new Date().getTime() > 0),
          activityList_2: res.ActiData.filter(item => item.acti_utc - new Date().getTime() <= 0),
          time: new Date().getTime()
        })
      }
    })

    // wxRequest(activityAPI.getJoinActi)

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