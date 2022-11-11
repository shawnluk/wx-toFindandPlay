// pages/home/index.js
import { checkSession } from '../../utils/wxCheckSession.js'
import { userAPI, activityAPI, teamAPI, wxRequest } from '../../utils/wxRequest'
import Toast from '@vant/weapp/toast/toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    userinfo: {},
    teaminfo: {},
    activityList: [],
    value: ''
  },

  /* 点击前往创建球队活动页面 */
  createTeam () {
    if (this.data.teaminfo.id) {
      Toast.fail('你已加入球队或球队加入申请中')
      return
    }
    wx.navigateTo({
      url: '../team/createTeam/index'
    })
  },

  /* 点击前往球队管理页面 */
  toTeamCenter () {
    if (!this.data.teaminfo.id) {
      Toast.fail('你还没加入任何球队')
      return
    }
    wx.navigateTo({
      url: '../team/center/index'
    })
  },

  /* 获取Home页面轮播图 */
  getSwiperList () {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getSwiperList()
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
    checkSession().then(res => {
      if (res === 1) {
        this.setData({
          userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {},
          teaminfo: wx.getStorageSync('teaminfo') ? wx.getStorageSync('teaminfo') : {}
        })
        return
      }
      console.log('登陆过期');
    })
    // 获取活动列表
    wxRequest(activityAPI.getActivity, 'get').then(res => {
      console.log(res);
      if (res.status === 200) {
        this.setData({
          activityList: res.ActiData
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