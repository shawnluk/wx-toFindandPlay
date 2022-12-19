// pages/team/index.js
import { userAPI, teamAPI, wxRequest } from '../../utils/wxRequest'
import Dialog from '@vant/weapp/dialog/dialog';
import { wxSocket, connectServer } from '../../utils/socketio'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    teamList: [],
    fetchTeam: [],
    fetchTrue: false,
    fetchValue: "",
    fetchSelect: [],
  },
  joinTeam (e) {
    console.log(e.currentTarget.dataset.detail);
    if (!wx.getStorageSync('userinfo').id) {
      Dialog.alert({
        title: '您还未登陆',
        message: '可点击右下角“我的”进行微信登陆',
        theme: 'round-button',
      })
      return
    }
    if (wx.getStorageSync('teaminfo').id) {
      Dialog.alert({
        message: '您已在球队或者申请加入中',
        theme: 'round-button',
      })
      return
    }
    const teamData = {
      teamID: e.currentTarget.dataset.detail.id,
      teamName: e.currentTarget.dataset.detail.teamName,
      CaptainID: e.currentTarget.dataset.detail.CaptainID,
      newCaptain: e.currentTarget.dataset.detail.newCaptain
    }
    wxRequest(teamAPI.teamJoin, 'post', teamData).then(result => {
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
            ///* 发起socket io 通知队长 */
            connectServer()
            const captainObj = {
              CaptainID: e.currentTarget.dataset.detail.CaptainID,
              newCaptain: e.currentTarget.dataset.detail.newCaptain
            }
            wxSocket.emit('JoinTeam', captainObj)
            wxRequest(teamAPI.getTeamJoinStatus, 'post').then(results => {
              if (results.status === 200) {
                wx.setStorage({
                  key: 'teaminfo',
                  data: results.joinData,
                })
              }
              Dialog.alert({
                message: '获取申请加入球队信息成功',
              }).then(() => {
                wx.switchTab({
                  url: '/pages/user/index',
                })
              })
            })
          }
        }
      })
    })
  },

  getFetchTeam (e) {
    // console.log(e.currentTarget.dataset.text);
    this.setData({
      fetchValue: e.currentTarget.dataset.text,
      fetchTeam: [],
      fetchSelect: this.data.teamList.filter(item => item.teamName === e.currentTarget.dataset.text)
    })
  },

  onChange (event) {
    // console.log(event.detail);
    this.setData({
      fetchSelect: [],
      fetchTeam: [],
      fetchTrue: false
    })
    if (event.detail !== '') {
      const teamnameArr = this.data.teamList.map((item => { return item.teamName }))
      const fetchArr = []
      teamnameArr.forEach((item, index) => {
        if (item.indexOf(event.detail) !== -1) {
          fetchArr.push(item)
          this.setData({
            fetchTeam: fetchArr,
            fetchTrue: true
          })
        }
      })
    }
  },

  toCheckTeamInfo (e) {
    // console.log(e.target.dataset);
    const teamID = e.target.dataset.teamid
    wx.navigateTo({
      url: `/pages/team/checkTeamInfo/index?id=${teamID}`
    });

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
    wxRequest(teamAPI.getTeamList, 'get').then(res => {
      console.log(res);
      this.setData({
        teamList: res.teamList
      })
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