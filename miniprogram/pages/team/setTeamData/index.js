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

    if (e.detail.value.teamSlogan === '' && e.detail.value.teamDesc == '' && this.data.fileList.length === 0) {
      return console.log('资料无任何改动')
    }

    const teamData = {
      teamID: e.detail.value.teamID,
      teamName: e.detail.value.teamName,
      teamSlogan: e.detail.value.teamSlogan === '' ? this.data.teaminfo.teamSlogan : e.detail.value.teamSlogan,
      teamDesc: e.detail.value.teamDesc === '' ? this.data.teaminfo.teamDesc : e.detail.value.teamDesc
    }


    /* 更新球队口号和球队描述 */
    if (e.detail.value.teamSlogan !== '' || e.detail.value.teamDesc !== '') {
      wxRequest(teamAPI.setTeamInfo, 'post', teamData).then(result => {
        if (result.status === 200) {
          console.log(result)
        }
      })
    }

    /* 更新球队图片 */
    if (this.data.fileList.length > 0) {
      wxUploadFile(teamAPI.setPic, this.data.fileList[0].url, 'avatar', { teamID: teamData.teamID }).then(res => {
        if (res.status === 200) {
          console.log(res);
        }
      })
    }

    /* 更新完毕获取新的球队信息  */
    wxRequest(teamAPI.getTeamInfo).then(results => {
      console.log(results)
      if (results.status === 200) {
        wx.setStorage({
          key: 'teaminfo',
          data: results.teamInfo[0],
          success: () => {
            wx.navigateTo({
              url: '../../team/center/index',
            })
          },
        })
      }
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
    this.setData({
      teaminfo: wx.getStorageSync('teaminfo') ? wx.getStorageSync('teaminfo') : ''
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