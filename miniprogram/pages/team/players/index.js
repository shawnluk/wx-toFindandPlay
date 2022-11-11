// pages/team/players/index.js
import { wxRequest, teamAPI } from '../../../utils/wxRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamMemberList: [],
    joinTeam_memberList: []
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
    this.setData({
      teaminfo: wx.getStorageSync('teaminfo') ? wx.getStorageSync('teaminfo') : {},
      userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {}
    })
    wxRequest(teamAPI.getTeamMember, 'post', { teamID: this.data.teaminfo.id }).then(res => {
      console.log(res)
      if (res.status === 200) {
        const teamMemberList = res.memberList[0].filter(item => {
          return item.userID !== this.data.teaminfo.CaptainID
        })
        const joinTeam_memberList = res.memberList[1]
        this.setData({
          teamMemberList,
          joinTeam_memberList
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