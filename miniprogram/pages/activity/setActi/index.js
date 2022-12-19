// pages/activity/setActi/index.js
import { getCurrentPage } from '../../../utils/getCurrentPage'
import { activityAPI, wxRequest } from '../../../utils/wxRequest'
import { dateTimeSet } from '../../../utils/dateTime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedActi: [],
    acti_name: '',
    acti_region: '',
    acti_type: '',
    acti_resource: '',
    acti_desc: '',
    date1: '',
    date2: '',
    radioList1: [
      { name: '1', value: '友谊赛' },
      { name: '2', value: '联赛杯赛' },
      { name: '3', value: '自定义比赛' },
    ],
    radioList2: [
      { name: 'a', value: '线上电竞' },
      { name: 'b', value: '线下租场' },
    ],
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    radio1: '',
    radio2: '',
    dateTime: ''
  },
  onSubmit (e) {
    // console.log(e.detail);
    // console.log(this.data);
    if (!this.data.acti_name && !this.data.acti_region && !this.data.date2 && !this.data.acti_type && !this.data.acti_resource) {
      wx.showToast({
        title: '未作任何修改',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: false,
      })
      return
    }

    const data = {
      acti_id: this.data.selectedActi.id,
      teamID: this.data.selectedActi.teamID,
      teamName: this.data.selectedActi.teamName,
      name: !this.data.acti_name ? this.data.selectedActi.acti_name : this.data.acti_name,
      num: !this.data.acti_num ? this.data.selectedActi.acti_num : this.data.acti_num,
      type: !this.data.acti_type ? this.data.selectedActi.acti_type : this.data.acti_type,
      region: !this.data.acti_region ? this.data.selectedActi.acti_region : this.data.acti_region,
      desc: !this.data.acti_desc ? this.data.selectedActi.acti_desc : this.data.acti_desc,
      resource: !this.data.acti_resource ? this.data.selectedActi.acti_resource : this.data.acti_resource,
      date2: !this.data.date2 ? Number(this.data.selectedActi.acti_utc) : this.data.date2,
      mark: 'wx'
    }
    console.log(data);
    wxRequest(activityAPI.setActivity, 'post', data).then(res => {
      console.log(res);
      if (res.status === 200) {
        wx.showToast({
          title: '修改活动成功',
          icon: 'success',
          duration: 1500,
          mask: false,
          success: (result) => {
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/activity/myActi/index',
              })
            }, 1500)
          },
          fail: () => { },
          complete: () => { }
        });

      }
    })
  },
  onRadioChange1 (event) {
    // console.log(event.detail);
    this.setData({
      radio1: event.detail,
      acti_type: this.data.radioList1.filter(item => { return item.name === event.detail })[0].value
    });
  },
  onRadioChange2 (event) {
    this.setData({
      radio2: event.detail,
      acti_resource: this.data.radioList2.filter(item => { return item.name === event.detail })[0].value
    })
  },
  // onChange1 (event) {
  //   // event.detail 为当前输入的值
  //   this.setData({
  //     acti_name: event.detail,
  //   })
  // },
  // onChange2 (event) {
  //   // event.detail 为当前输入的值
  //   this.setData({
  //     acti_region: event.detail,
  //   })
  // },
  // onChange3 (event) {
  //   // console.log(e);
  //   this.setData({
  //     acti_desc: event.detail
  //   })
  // },
  timeConfirm (event) {
    // console.log(e);
    // const date2 = new Date(e.detail)
    this.setData({
      // date1: e.detail,
      date2: event.detail,
      dateTime: dateTimeSet(event.detail),
      show: false
    });
  },
  timeCancel () {
    this.setData({
      show: false
    });
  },
  onInput (event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  showPopup () {
    this.setData({ show: true });
  },
  onClose () {
    this.setData({ show: false });
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
    const urlOptions = getCurrentPage()
    const myActi = wx.getStorageSync('myActi')
    const selectActi = myActi.filter(item => item.id === Number(urlOptions.id))
    if (selectActi.length === 1) {
      // console.log(selectActi[0].acti_utc);
      this.setData({
        selectedActi: selectActi[0],
        oldDateTime: dateTimeSet(Number(selectActi[0].acti_utc))
      })
    } else {
      wx.showToast({
        title: '发生错误，返回',
        icon: 'error',
        duration: 2000,
        mask: false,
        success: (result) => {
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/activity/myActi/index',
            })
          }, 2000)
        }
      })
    }

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