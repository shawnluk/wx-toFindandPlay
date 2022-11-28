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
    value: '',
    noticeText: '',
    time: new Date().getTime(),
    loading: false
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
  arrSlice (arr, N) {
    let arrResult = []
    for (let i = 0; i < arr.length; i += N) {
      arrResult.push(arr.slice(i, i + N))
    }
    return arrResult
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
  replay () {
    if (this.data.activityList.length > 1) {
      setTimeout(this.getNoticeText(this.data.activityList), 1000)
    }
  },
  getNoticeText (arr) {
    const textArr = arr.map((item) => {
      return {
        acti_name: item.acti_name,
        acti_date: item.acti_date
      }
    })
    const { acti_name, acti_date } = textArr[Math.floor(Math.random() * textArr.length)]
    const noticeText = acti_name + '\xa0:\xa0' + acti_date
    return noticeText
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
        if (res.ActiData.length === 0) {
          this.setData({
            noticeText: '暂无最新活动'
          })
        }
        if (res.ActiData.length > 0) {
          const actiPage = this.arrSlice(res.ActiData.filter(item => item.acti_utc - new Date().getTime() > 0).sort(this.compareItem), 3)
          this.setData({
            // activityList: res.ActiData.sort(this.compareItem),
            actiPage,
            acti_page: actiPage[0],
            pageNum: 1,
            pageTotal: actiPage.length,
            noticeText: this.getNoticeText(res.ActiData.filter(item => item.acti_utc - new Date().getTime() > 0))
          })
        }
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
    // console.log('触底');
    if (this.data.pageNum >= this.data.pageTotal) {
      wx.showToast({
        title: '没有下一页了'
      })
      return
    }
    const that = this
    this.setData({
      loading: true
    })
    setTimeout(() => {
      that.setData({
        loading: false,
        acti_page: [...this.data.acti_page, ...this.data.actiPage[this.data.pageNum]]
      })
      that.data.pageNum += 1
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})