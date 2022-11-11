// pages/teamOption/create/index.js
import { teamAPI, wxRequest, wxUploadFile } from '../../../utils/wxRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const teamData = e.detail.value
    console.log(teamData);
    wxRequest(teamAPI.createTeam, 'post', teamData).then(res => {
      console.log(res)
      if (res.status === 200) {
        wxRequest(teamAPI.getTeamInfo).then(result => {
          console.log(result)
          if (result.status === 200) {
            wx.setStorage({
              key: 'teaminfo',
              data: result.teamInfo[0],
              success: () => {
                wx.navigateTo({
                  url: '../../team/center/index',
                })
              }
            })
          }
        })
      }
    })
  },
  formReset: function () {
    this.setData({
      fileList: []
    })
  },
  DelPic () {
    this.setData({
      fileList: []
    })
  },
  afterRead (event) {
    const { file } = event.detail;
    console.log(event.detail);
    /* {size: 23235, type: "image", url: "http://tmp/ESOnmJtE7hBC35f3a0cfa7f76687910d6c0a5099b8f0.png", thumb: "http://tmp/ESOnmJtE7hBC35f3a0cfa7f76687910d6c0a509 */
    // const url = event.detail.file.url
    const arr = []
    arr.push(event.detail.file)
    this.setData({
      fileList: arr
    })
    // wxUploadFile(teamAPI.setPic, event.detail.file.url, 'avatar', { teamID: 'noID' }).then(res => {
    //   console.log(res);
    // })

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