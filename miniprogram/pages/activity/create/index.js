// pages/activity/create/index.js
import { wxRequest, activityAPI } from '../../../utils/wxRequest'

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  dateTime (time) {
    let date = new Date(time)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s
  },
  onSubmit (e) {
    // console.log(e.detail);
    // console.log(this.data);
    if (!this.data.acti_name || !this.data.acti_region || !this.data.date2 || !this.data.acti_type || !this.data.acti_resource) {
      return console.log('请输入必填项');
    }

    const data = {
      teamID: wx.getStorageSync('teaminfo').id,
      teamName: wx.getStorageSync('teaminfo').teamName,
      name: this.data.acti_name,
      type: this.data.acti_type,
      region: this.data.acti_region,
      desc: this.data.acti_desc,
      resource: this.data.acti_resource,
      date2: this.data.date2,
      mark: 'wx'
    }
    console.log(data);
    wxRequest(activityAPI.createAct, 'post', data).then(res => {
      // console.log(res);
      if (res.status === 200) {
        wx.switchTab({
          url: '/pages/activity/index',
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
  onChange1 (event) {
    // event.detail 为当前输入的值
    this.setData({
      acti_name: event.detail,
    })
  },
  onChange2 (event) {
    // event.detail 为当前输入的值
    this.setData({
      acti_region: event.detail,
    })
  },
  onChange3 (event) {
    // console.log(e);
    this.setData({
      acti_desc: event.detail
    })
  },
  timeConfirm (event) {
    // console.log(e);
    // const date2 = new Date(e.detail)
    // console.log(date2);
    this.setData({
      // date1: e.detail,
      date2: event.detail,
      dateTime: this.dateTime(event.detail),
      show: false
    });
  },
  timeCancel () {
    this.setData({
      show: false
    });
  },
  onInput (event) {
    // console.log(event);
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