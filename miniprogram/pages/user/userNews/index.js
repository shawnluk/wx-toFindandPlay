// pages/user/userNews/index.js
import { connectServer, wxSocket } from '../../../utils/socketio'
import { teamAPI, wxRequest } from '../../../utils/wxRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
  },

  agreeTeamJoin (e) {
    console.log(e.target.dataset);
    /* {msgid: "6378c4151602691679c6defc", fromuser: "shawn", fromuserid: "18"} */
    const userObj = {
      username: e.target.dataset.fromuser,
      userID: e.target.dataset.fromuserid
    }
    wxRequest(teamAPI.captainAgreeJoin, 'post', userObj).then(result => {
      if (result.status === 200) {
        connectServer()
        wxSocket.emit('agreeJoin', { fromUser: e.target.dataset.fromuser, msgID: e.target.dataset.msgid })
      }
      console.log(result)
    })
  },
  refuseTeamJoin () {

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
    connectServer()
    wxSocket.on('getJoinMsg', (data) => {
      if (data) {
        this.setData({
          joinNewsData: data.msg
        })
        // console.log(data);
      }
    })

    this.setData({
      JoinActiData: wx.getStorageSync('actiJoinUser') ? wx.getStorageSync('actiJoinUser') : []
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